<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline">1:1 채팅</v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item v-for="(message, index) in userChat.messages" :key="index">
                <v-list-item-content>
                  {{ message.senderId === currentUser ? 'Me' : message.senderId }}: {{ message.message }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions>
            <v-text-field
                v-model="newMessage"
                label="메시지를 입력하세요"
                @keyup.enter="sendMessage"
            ></v-text-field>
            <v-btn color="primary" @click="sendMessage">전송</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

const stompClient = ref(null);
const messages = ref([]);
const newMessage = ref('');
const connected = ref(false);
const currentUser = ref('');
const otherUser = ref('');

const connect = () => {
  return new Promise((resolve, reject) => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.value = Stomp.over(socket);

    stompClient.value.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      connected.value = true;

      const chatRoomId = generateChatRoomId(currentUser.value, otherUser.value);
      console.log('Chat Room ID:', chatRoomId);

      stompClient.value.subscribe(`/topic/chat/${chatRoomId}`, (messageOutput) => {
        const receivedMessage = JSON.parse(messageOutput.body);
        messages.value.push(receivedMessage);
        console.log("Received message: ", receivedMessage);
      });

      resolve();
    }, (error) => {
      console.error('Connection error:', error);
      connected.value = false;
      reject(error);
    });
  });
};

const sendMessage = async () => {
  if (newMessage.value.trim() === '') return;

  if (!connected.value) {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
      return;
    }
  }

  const messageData = {
    senderId: currentUser.value,
    receiverId: otherUser.value,
    message: newMessage.value
  };
  console.log("Sending message: ", messageData);
  stompClient.value.send(`/app/chat/${otherUser.value}`, {}, JSON.stringify(messageData));
  newMessage.value = '';
};

const generateChatRoomId = (user1Id, user2Id) => {
  return user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
};

// 컴포넌트 사용 시 props로 currentUser와 otherUser를 받도록 설정
const props = defineProps({
  initialCurrentUser: String,
  initialOtherUser: String,
});

onMounted(() => {
  currentUser.value = props.initialCurrentUser;
  otherUser.value = props.initialOtherUser;
});
</script>

<style scoped>
.chat-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>