<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>환영합니다, {{ authStore.user.name }}님!</h1>
    <v-btn @click="logout">로그아웃</v-btn>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/modules/user';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  window.location.href = '/login';
};
</script>
