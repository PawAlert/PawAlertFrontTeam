<template>
  <v-app-bar color="white" fixed app>
    <v-container class="d-flex align-center" style="max-width: 1280px;">
      <!-- 로고 및 메뉴 버튼들 -->
      <Logo @click="router.push({ name: 'Main' })"/>
      <!-- 큰 화면에서 보이는 메뉴 버튼들 -->
      <v-col class="hidden-sm-and-down colmain">
        <v-btn class="v_text1" text @click="router.push({ name: 'Missing' })">실종글</v-btn>
        <v-btn class="v_text1" text to="/보호소">보호소</v-btn>
        <v-btn class="v_text1" text to="/동물병원">동물병원</v-btn>
        <v-btn class="v_text1" text to="/동물봉사">동물봉사</v-btn>
      </v-col>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn icon class="mr-2">
        <v-badge :content="notificationCount" color="red" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon to="/chat" class="mr-2">
        <v-badge content="1" color="red" overlap>
          <v-icon>mdi-chat</v-icon>
        </v-badge>
      </v-btn>

      <!-- 큰 화면에서 보이는 사용자 메뉴 버튼들 -->
      <div class="hidden-sm-and-down">
        <v-btn text to="/">Home</v-btn>
        <v-btn text v-if="authStore.user" @click="handleLogout">Logout</v-btn>
      </div>
      <v-btn text v-if="authStore.user" to="/myPage" class="mypage">마이페이지</v-btn>
      <!--        <v-btn text v-if="authStore.user" to="/profile">{{ authStore.user.email }} 님!</v-btn>-->
      <v-btn text v-else to="/login">Login / Signup</v-btn>
      <!-- 작은 화면에서만 보이는 메뉴 버튼 -->
      <v-menu offset-y class="hidden-md-and-up">
        <template #activator="{ props }">
          <!-- 토글 버튼에 hidden-md-and-up 클래스 추가 -->
          <v-btn icon v-bind="props" class="hidden-md-and-up">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>실종 게시글</v-list-item-title>
          </v-list-item>
          <v-list-item to="/보호소">
            <v-list-item-title>보호소</v-list-item-title>
          </v-list-item>
          <v-list-item to="/동물병원">
            <v-list-item-title>동물병원</v-list-item-title>
          </v-list-item>
          <v-list-item to="/동물봉사">
            <v-list-item-title>동물봉사</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="authStore.user" to="/myPage">
            <v-list-item-title>마이페이지</v-list-item-title>
          </v-list-item>
          <v-list-item v-else to="/login">
            <v-list-item-title>Login / Signup</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="authStore.user" @click="handleLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script setup>
  import {useAuthStore} from '@/store/modules/auth';
  import {useRouter} from 'vue-router';
  import Logo from "@/components/layout/Logo.vue";
  import SockJS from 'sockjs-client';
  import {Client} from '@stomp/stompjs';
  import {ref, onMounted, onBeforeUnmount} from 'vue';
  import {profile} from "@/api/api_auth";

  const authStore = useAuthStore();
  const router = useRouter();

  // 사용자의 ID를 서버에서 가져온다고 가정합니다.
  const userId = ref(''); // 사용자 ID를 저장할 ref
  const notificationCount = ref(0); // 알림 개수를 저장할 ref
  let stompClient = null; // WebSocket 클라이언트를 저장할 변수
  // WebSocket 연결 설정 함수
  const connectWebSocket = () => {
    const socket = new SockJS('https://port-0-pawalertbackendteamgroup-m06zwfj8628a2164.sel4.cloudtype.app/ws');
    stompClient = new Client({
      webSocketFactory: () => socket,
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        console.log('Connected to WebSocket');
        console.log('Subscribing to notifications for user:', userId.value); // 사용자 ID 디버깅
        // 사용자의 고유 ID로 알림 구독
        stompClient.subscribe(`/topic/notifications/${userId.value}`, (message) => {
          console.log('Received notification:', message.body);
          notificationCount.value++; // 새로운 알림이 도착할 때마다 카운트 증가
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();
  };


  // 컴포넌트가 마운트될 때 WebSocket 연결
  onMounted(async () => {
    try {
      const data = await profile(); // 프로필 정보를 가져옴
      if (data && data.id) {
        userId.value = data.id; // 서버에서 받아온 사용자 ID를 저장
        console.log('User ID fetched:', userId.value); // 사용자 ID 디버깅
        connectWebSocket(); // WebSocket 연결
      } else {
        console.error('User ID is missing in the response:', data);
      }
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
    }
  });

  // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
  onBeforeUnmount(() => {
    if (stompClient) {
      stompClient.deactivate();
    }
  });


  const handleLogout = () => {
    authStore.logout();
    router.push('/login');
  };
</script>

<style scoped>
  .v_text1 {
    font-weight: 800;
    color: #2D2D2D;
  }
</style>
