import axios from 'axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'loading';
            try {
                const response = await axios.post('https://api.yourservice.com/login', credentials);

                // 응답 헤더에서 JWT 토큰을 추출
                const token = response.headers['authorization'].split(' ')[1];  // 'Bearer <token>' 형식에서 <token> 추출
                const user = response.data.user;

                this.user = user;
                this.token = token;
                this.status = 'success';

                // JWT 토큰과 사용자 정보를 localStorage에 저장
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                this.error = error.message;
                this.status = 'error';
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            this.status = 'idle';

            // localStorage에서 JWT 토큰과 사용자 정보를 제거
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        checkAuth() {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');

            if (token && user) {
                this.token = token;
                this.user = JSON.parse(user);
                this.status = 'success';
            } else {
                this.logout();
            }
        }
    },
});
