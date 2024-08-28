import { defineStore } from 'pinia';
import { login } from '@/api/api_auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        status: 'idle',  // 초기 상태는 idle
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'loading';  // 로그인 요청 시작 시 상태를 loading으로 설정
            try {
                const { token, user } = await login(credentials);
                this.user = user;
                this.token = token;
                this.status = 'success';  // 로그인 성공 시 상태를 success로 설정

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
            } catch (error) {
                this.error = error.message;
                this.status = 'error';  // 로그인 실패 시 상태를 error로 설정
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            this.status = 'idle';  // 로그아웃 후 상태를 idle로 설정

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        checkAuth() {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (token && user) {
                this.token = token;
                this.user = JSON.parse(user);
                this.status = 'success';  // 유효한 토큰이 있으면 success 상태로 설정
            } else {
                this.logout();  // 토큰이 없으면 로그아웃 처리
            }
        }
    },
});
