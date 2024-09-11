<template>
  <v-app>
    <!-- 헤더에 'app' 속성을 추가하여 고정 위치로 설정 -->
    <Header v-if="$route.meta.showHeader" app />

    <!-- 페이지 콘텐츠 영역 -->
    <v-main class="main-content">
      <v-container class="content-container">
        <router-view />
        <Footer v-if="$route.meta.showFooter" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// 앱이 로드될 때 로그인 상태 확인
authStore.checkAuth();

// URL 쿼리 파라미터에서 JWT 토큰을 처리하는 함수
const handleToken = () => {
  const token = route.query.token;
  if (token) {
    console.log('Token found in URL:', token);
    authStore.setToken(token); // 스토어에 토큰 저장

    // 토큰을 처리한 후 query parameter 제거
    router.replace({ query: {} });
  }
};

// 컴포넌트가 마운트될 때 토큰 처리
onMounted(() => {
  handleToken();
});

// URL 변경을 감지하여 토큰 처리
watch(() => route.fullPath, handleToken);
</script>

<style scoped>
.content-container {
  max-width: 1280px; /* 고정된 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0; /* 내부 여백 제거 */
}
</style>
