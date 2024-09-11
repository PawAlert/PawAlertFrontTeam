<template>
  <v-app-bar color="white" fixed app>
    <v-container class="d-flex align-center" style="max-width: 1280px;">
      <!-- 로고 및 메뉴 버튼들 -->
      <Logo @click="router.push({ name: 'Main' })"/>
      <v-col class="hidden-sm-and-down colmain">
        <v-btn class="v_text1" text @click="router.push({ name: 'Missing' })">반려동물 찾아요</v-btn>
        <v-btn class="v_text1" text @click="router.push({ name: 'Protect' })">보호중이에요</v-btn>
        <v-btn class="v_text1" text to="/shelter">보호소</v-btn>
        <v-btn class="v_text1" text to="/동물병원">동물병원</v-btn>
        <v-btn class="v_text1" text to="/동물봉사">동물봉사</v-btn>
        <v-btn class="v_text1" text to="/">커뮤니티</v-btn>
        <!-- User Authentication Buttons for Larger Screens -->
        <v-btn v-if="isAuthenticated" class="mypage" text to="/myPage">마이페이지</v-btn>
        <v-btn v-if="isAuthenticated" text @click="handleLogout">Logout</v-btn>
        <v-btn v-else text to="/login">Login / Signup</v-btn>
      </v-col>
<v-spacer class="hidden-md-and-up"></v-spacer>
      <!-- 작은 화면에서만 보이는 메뉴 버튼 -->
      <v-menu offset-y class="hidden-md-and-up">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="hidden-md-and-up">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="router.push({ name: 'Missing' })">
            <v-list-item-title>반려동물 찾아요</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push({ name: 'Protect' })">
            <v-list-item-title>보호중이에요</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/shelter')">
            <v-list-item-title>보호소</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/동물병원')">
            <v-list-item-title>동물병원</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/동물봉사')">
            <v-list-item-title>동물봉사</v-list-item-title>
          </v-list-item>
          <v-list-item @click="router.push('/')">
            <v-list-item-title>커뮤니티</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated" @click="router.push('/myPage')" class="mypage">
            <v-list-item-title>마이페이지</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isAuthenticated" @click="handleLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="router.push('/login')">
            <v-list-item-title>Login / Signup</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script setup>
  import { useAuthStore } from '@/store/modules/auth';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import Logo from "@/components/layout/Logo.vue";

  const authStore = useAuthStore();
  const router = useRouter();

  // user 상태의 변경을 정확히 반영하도록 computed 설정
  const isAuthenticated = computed(() => !!authStore.user);

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
