<template>
  <v-app-bar color="white" fixed app>
    <v-container class="d-flex align-center" style="max-width: 1280px;">
      <!-- 로고 및 메뉴 버튼들 -->
      <Logo @click="router.push({ name: 'Main' })"/>
      <!-- 큰 화면에서 보이는 메뉴 버튼들 -->
      <v-col class="hidden-sm-and-down colmain">
        <v-btn class="v_text1" text @click="router.push({ name: 'Missing' })">반려동물 찾아요</v-btn>
        <v-btn class="v_text1" text @click="router.push({ name: 'Missing' })">보호중이에요</v-btn>
        <v-btn class="v_text1" text to="/shelter">보호소</v-btn>
        <v-btn class="v_text1" text to="/동물병원">동물병원</v-btn>
        <v-btn class="v_text1" text to="/동물봉사">동물봉사</v-btn>
      </v-col>


      <!-- 큰 화면에서 보이는 사용자 메뉴 버튼들 -->
      <v-btn text to="/">Home</v-btn>
      <v-btn text v-if="authStore.user" to="/myPage" class="mypage">마이페이지</v-btn>
      <div class="hidden-sm-and-down">
        <v-btn text v-if="authStore.user" @click="handleLogout">Logout</v-btn>
        <v-btn text v-else to="/login">Login / Signup</v-btn>
      </div>
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

  const authStore = useAuthStore();
  const router = useRouter();


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
