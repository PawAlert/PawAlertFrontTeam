<template>
  <div>
    <h1 v-if="user">Welcome, {{ user.name }}</h1>
    <p v-else>Loading...</p>
    <!-- 기타 사용자 정보 표시 -->
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/config/url';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      user: null,  // 사용자 정보를 저장할 변수
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기

      if (token) {
        // 토큰을 사용해 사용자 정보 요청
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Authorization 헤더에 Bearer 토큰 포함
          },
        });

        this.user = response.data;  // 사용자 정보 저장
      } else {
        // 토큰이 없으면 로그인 페이지로 리다이렉트
        this.$router.push('/login');
      }
    } catch (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
      this.$router.push('/login');  // 에러 발생 시 로그인 페이지로 리다이렉트
    }
  },
};
</script>
