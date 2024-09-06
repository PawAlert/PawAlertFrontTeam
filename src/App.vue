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
import Header from '@/components/layout/Header.vue';
import { useAuthStore } from '@/store/modules/auth';
import Footer from "@/components/layout/Footer.vue";

const authStore = useAuthStore();
authStore.checkAuth(); // 앱이 로드될 때 로그인 상태 확인
</script>

<style scoped>


.content-container {
  max-width: 1280px; /* 고정된 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 0; /* 내부 여백 제거 */
}
.main-content{
  padding: 0;
}

</style>
