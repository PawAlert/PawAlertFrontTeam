<!-- src/App.vue -->
<template>
  <v-app>
    <!-- 조건부로 헤더를 렌더링 -->
    <Header v-if="$route.meta.showHeader" />

    <!-- 페이지 콘텐츠 영역 -->
    <v-main>
      <v-container class="fill-height">
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup>
import Header from '@/components/layout/Header.vue';
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();
authStore.checkAuth();  // 앱이 로드될 때 로그인 상태 확인
</script>

<style>
/* 전역 스타일링 */
.v-application {
  min-height: 100vh;
}
</style>
