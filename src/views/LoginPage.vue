<template>
  <v-container class="login-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-h5">로그인</v-card-title>
          <v-card-subtitle class="text-subtitle-1">이메일과 비밀번호를 입력하세요</v-card-subtitle>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
                v-model="email"
                label="이메일"
                type="email"
                required
                :rules="emailRules"
                class="mt-4"
                density="comfortable"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="비밀번호"
                type="password"
                required
                :rules="passwordRules"
                class="mt-4"
                density="comfortable"
            ></v-text-field>

            <v-alert v-if="authStore.status === 'error'" type="error" class="mt-4">
              {{ authStore.error }}
            </v-alert>

            <v-btn
                type="submit"
                color="primary"
                class="mt-4"
                :disabled="authStore.status === 'loading'"
                block
            >
              <v-progress-circular
                  v-if="authStore.status === 'loading'"
                  indeterminate
                  color="white"
                  size="20"
              ></v-progress-circular>
              <span v-else>로그인</span>
            </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <v-card-actions>
            <div class="d-flex justify-space-between flex-wrap">
              <v-btn @click="redirectToKakao" color="yellow darken-3" class="flex-grow-1 mx-2 my-2">
                Kakao 로그인
              </v-btn>

              <v-btn @click="redirectToNaver" color="green darken-2" class="flex-grow-1 mx-2 my-2">
                Naver 로그인
              </v-btn>

              <v-btn @click="redirectToGoogle" color="grey darken-1" class="flex-grow-1 mx-2 my-2 google-btn">
                Google 로그인
              </v-btn>

              <v-btn @click="router.push('/SignupStart')" class="flex-grow-1 mx-2 my-2">
                회원가입
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useAuthStore} from '@/store/modules/auth';
import {AUTH_URLS} from '@/config/url';
import {useRouter} from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const emailRules = [
  v => !!v || '이메일을 입력하세요',
  v => /.+@.+/.test(v) || '유효한 이메일을 입력하세요',
];

const passwordRules = [
  v => !!v || '비밀번호를 입력하세요',
  v => v.length >= 6 || '비밀번호는 최소 6자 이상이어야 합니다',
];

const handleLogin = async () => {
  try {
    await authStore.login({email: email.value, password: password.value});
    if (authStore.status === 'success') {
      // 로그인 성공 시 홈 페이지로 리디렉션
      await router.push({name: 'Main'});
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
  }
};

// 페이지가 로드될 때 JWT 토큰을 URL에서 추출하고 저장
const getTokenFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token'); // 'token'은 URL에 포함된 JWT 토큰의 쿼리 파라미터 이름
};

onMounted(() => {
  const jwtToken = getTokenFromUrl();
  if (jwtToken) {
    localStorage.setItem('jwt', jwtToken); // JWT 토큰을 로컬 스토리지에 저장
    console.log('JWT 토큰이 저장되었습니다:', jwtToken);

    // 로그인 후 홈 페이지로 리디렉션
    router.push({name: 'Main'});
  }
});

const redirectToGoogle = () => {
  // 사용자를 구글 소셜 로그인 페이지로 리다이렉트
  window.location.href = AUTH_URLS.GOOGLE;
};

const redirectToNaver = () => {
  // 사용자를 네이버 소셜 로그인 페이지로 리다이렉트
  window.location.href = AUTH_URLS.NAVER;
};

const redirectToKakao = () => {
  // 사용자를 카카오 소셜 로그인 페이지로 리다이렉트
  window.location.href = AUTH_URLS.KAKAO;
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
}

.google-btn {
  background-color: rgba(255, 252, 243, 0.16); /* Google 버튼 색상 */
  color: white;
}
</style>
