<script>
import {register} from '@/api/api_auth';
import {routes} from "vue-router/auto-routes";  // 회원가입 API 호출 함수 임포트

export default {
  data() {
    return {
      userData: {
        email: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    async registerUser() {
      try {
        // 회원가입 API 호출
        const response = await register(this.userData);

        // 회원가입 성공 메시지 처리
        this.message = response.data.message;  // 서버로부터의 응답 메시지 설정

      } catch (error) {
        // 에러 발생 시 메시지 처리
        alert("회원가입에 실패했습니다.");
        this.message = error.message || "회원가입에 실패했습니다.";
        console.error('에러 발생:', error.response?.data || error.message);
      }
    }
  }
};
</script>

<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="email">Email:</label>
        <input v-model="userData.email" type="text" id="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="userData.password" type="password" id="password" required>
      </div>
      <button type="submit">회원가입</button>
    </form>
    <!-- 서버 응답 메시지 표시 -->
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
/* 스타일링 추가 가능 */
</style>
