import { defineStore } from 'pinia';
import { login, profile } from '@/api/api_auth';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        status: 'false',
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'loading';
            try {
                const { token } = await login(credentials);
                this.setToken(token);
                await this.fetchUserProfile(); // 프로필 정보를 가져온 후 user 상태 업데이트
                this.status = 'success'; // 상태 업데이트

                // 상태가 성공으로 업데이트된 후 라우팅
                const router = useRouter();
                await router.push({name: 'Main'});
            } catch (error) {
                this.error = error.message;
                this.status = 'error';
            }
        },
        async logout() {
            this.user = null;
            this.status = 'idle';
            localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
        },
        async fetchUserProfile() {
            try {
                const response = await profile(); // 서버로부터 프로필 정보 가져옴
                this.user = response.data; // 사용자 상태 업데이트
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
                this.logout(); // 오류 발생 시 로그아웃
            }
        },
        setToken(token) {
            localStorage.setItem('token', token); // 토큰을 로컬스토리지에 저장
        }
    },
});
