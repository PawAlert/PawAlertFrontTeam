<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import { useChatStore } from '@/store/modules/chat/chat';

const route = useRoute();
const userStore = useAuthStore();
const chatStore = useChatStore();

// 메시지 입력 필드
const newMessage = ref('');

// 채팅 상대 정보를 route에서 가져옴
const senderId = ref('');
const receiverId = ref('');

// 현재 사용자가 메시지를 보낸 사람인지 확인
const isMyMessage = (messageSenderId) => {
  return messageSenderId === userStore.user.uid;
};

// Pinia에서 채팅 메시지 목록 가져오기
const chatMessages = computed(() => chatStore.messages);

onMounted(() => {
  userStore.checkAuth();

  senderId.value = userStore.user.uid;
  receiverId.value = route.query.receiverId;

  console.log("Sender ID (current user):", senderId.value);
  console.log("Receiver ID (other user):", receiverId.value);

  chatStore.setSenderId(senderId.value);
  chatStore.setReceiverId(receiverId.value);

  // 상대방 이메일 가져오기
  chatStore.otherUserEmail(receiverId.value);

  chatStore.connect();
});

// 메시지 전송 함수
const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    chatStore.setMessage(newMessage.value);
    chatStore.sendMessage();
    newMessage.value = '';
  }
};
</script>

<template>
  <div>
    <p>현재 유저 ID: {{ userStore.user.uid }}</p>
    <p>현재 유저 email : {{ userStore.user.email }}</p>
    <p>상대 유저 email: {{ chatStore.otherEmail }}</p>

    <!-- 채팅 메시지 목록 -->
    <div class="chat-container">
      <div
          v-for="(message, index) in chatMessages"
          :key="index"
          :class="{'my-message': isMyMessage(message.senderId), 'other-message': !isMyMessage(message.senderId)}"
      >
        <div class="message-content">
          <p>{{ isMyMessage(message.senderId) ? userStore.user.email : chatStore.otherEmail }}</p>
          <p>{{ message.message }}</p>
        </div>
      </div>
    </div>

    <!-- 메시지 입력 필드 및 전송 버튼 -->
    <div class="chat-input">
      <input v-model="newMessage" placeholder="메시지를 입력하세요"/>
      <button @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<style scoped>
/* 스타일 정의 */
.chat-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.my-message {
  align-self: flex-end;
  background-color: #e6f7ff;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
}

.other-message {
  align-self: flex-start;
  background-color: #f0f0f0;
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
}

.chat-input {
  display: flex;
  margin-top: 20px;
}

input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
