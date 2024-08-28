// src/store/modules/auth.js
import { defineStore } from 'pinia';
import { login } from '@/api/auth'; // API 호출 함수 import

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        status: 'idle',
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'loading';
            try {
                const data = await login(credentials);
                this.user = data.user;
                this.status = 'success';
            } catch (error) {
                this.error = error.message;
                this.status = 'error';
            }
        },
        async logout() {
            this.user = null;
            // 로그아웃 로직 추가
        },
    },
});
