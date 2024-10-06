<script setup>
import {onMounted} from "vue";
import {useChatStore} from "@/store/modules/chat/chat";
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/store/modules/auth";

const chatStore = useChatStore();
const userStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  chatStore.myChatList();
})

const chatStart = (userUid1, userUid2, chatRoomIdDetail) => {
  console.log("userUid1 = ", userUid1, "userUid2 = ", userUid2);

  // 현재 로그인한 사용자의 UID를 확인
  const currentUserUid = userStore.user.uid;

  // senderUid는 항상 현재 로그인한 사용자의 UID
  const senderUid = currentUserUid;
  const chatRoom = chatRoomIdDetail;
  console.log(chatRoom, "chatRoom 은 ")
  // receiverUid는 상대방의 UID (userUid1이 현재 사용자가 아니라면 userUid1, 그렇지 않으면 userUid2)
  const receiverUid = userUid1 !== currentUserUid ? userUid1 : userUid2;

  // query 파라미터로 값을 넘기기
  router.push({
    name: 'ChatRoom',
    query: {
      senderUid: senderUid,
      receiverUid: receiverUid,
      chatRoom: chatRoom,
    }
  });
}
</script>

<template>
  <p>채팅 리스트 페이지</p>

  <div v-for="chat in chatStore.myChatListData" :key="chat.chatRoomId">
    <v-btn @click="chatStart(chat.userUid1, chat.userUid2, chat.chatRoomId)">
      <p>채팅방 {{ chat.chatRoomId }}</p>
      <p>사용자1 {{ chat.userUid1 }}</p>
      <p>사용자2 {{ chat.userUid2 }}</p>
      <p>챗룸 ID {{ chat.chatRoomId }}</p>
    </v-btn>
  </div>
</template>