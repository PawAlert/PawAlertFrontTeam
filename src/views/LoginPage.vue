<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-subtitle>Enter your credentials</v-card-subtitle>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                :rules="[emailRules]"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                :rules="[passwordRules]"
            ></v-text-field>

            <v-btn type="submit" color="primary" :loading="authStore.status === 'loading'">
              Login
            </v-btn>

            <v-alert v-if="authStore.status === 'error'" type="error">
              Login failed. Please try again.
            </v-alert>
          </v-form>

          <v-card-actions>
            <v-btn @click="redirectToGoogle" color="google">Login with Google</v-btn>
            <v-btn @click="redirectToNaver" color="navy">Login with Naver</v-btn>
            <v-btn @click="redirectToKakao" color="yellow">Login with Kakao</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { AUTH_URLS } from '@/config/url';

const authStore = useAuthStore();

// 로그인 폼 데이터
const email = ref('');
const password = ref('');

// 유효성 검사 규칙
const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+/.test(v) || 'Email must be valid',
];

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters long',
];

// 일반 로그인 핸들러
const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
  } catch (error) {
    console.error(error);
  }
};

// 소셜 로그인 리다이렉션
const redirectToGoogle = () => {
  window.location.href = AUTH_URLS.GOOGLE;
};
const redirectToNaver = () => {
  window.location.href = AUTH_URLS.NAVER;
};
const redirectToKakao = () => {
  window.location.href = AUTH_URLS.KAKAO;
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}
</style>
