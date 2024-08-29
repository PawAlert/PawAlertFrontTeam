<!-- src/components/layout/Header.vue -->
<template>
  <v-app-bar app>
    <v-toolbar-title @click="navigateToHome">PawAlert</v-toolbar-title>
    <v-btn @click="router.push({ name: 'Missing' })">실종글</v-btn>
    <v-btn text to="/보호소">보호소</v-btn>
    <v-btn text to="/동물병원">동물병원</v-btn>
    <v-btn text to="/동물봉사">동물봉사</v-btn>

    <v-spacer></v-spacer>

    <!-- 알림 버튼 -->
    <v-btn icon>
      <v-badge
          content="3"
          color="red"
          overlap
      >
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>

    <!-- 채팅 버튼 -->
    <v-btn icon to="/chat">
      <v-badge
          content="1"
          color="red"
          overlap
      >
        <v-icon>mdi-chat</v-icon>
      </v-badge>
    </v-btn>

    <!-- 홈 버튼 -->
    <v-btn text to="/">Home</v-btn>

    <!-- 로그인 상태에 따라 사용자 이메일 또는 Login 버튼 표시 -->
    <v-btn text v-if="authStore.user" to="/profile">{{ authStore.user.email }} 님!</v-btn>
    <v-btn text v-else to="/login">Login / Signup</v-btn>
    <v-btn text v-if="authStore.user" @click="handleLogout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
  import { useAuthStore } from '@/store/modules/auth';  // Pinia 스토어 가져오기
  import { useRouter } from 'vue-router';
  import MissingListView from "@/views/MissingListView.vue";  // Composition API 방식으로 라우터 사용

  const authStore = useAuthStore(); // 스토어 인스턴스 생성
  const router = useRouter();  // 라우터 인스턴스 생성

  const navigateToHome = () => {
    router.push('/');  // 홈으로 이동
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    authStore.logout();  // Pinia 스토어의 로그아웃 액션 호출
    router.push('/login');  // 로그아웃 후 로그인 페이지로 리다이렉트
  };
</script>

<style scoped>
  /* 추가적인 스타일을 여기에 작성 */
</style>
