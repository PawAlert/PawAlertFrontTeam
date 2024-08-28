<!-- src/App.vue -->
<template>
  <router-view></router-view>
</template>

<script setup>
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();
authStore.checkAuth();  // 앱이 로드될 때 로그인 상태 확인
</script>
