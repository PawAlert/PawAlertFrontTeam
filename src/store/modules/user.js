import {defineStore} from 'pinia';
import {login} from '@/api/api_auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        status: 'false',
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'false';
            try {
                const response = await login(credentials);
                this.user = response.user;
                this.status = response.status;
            } catch (error) {
                this.error = error.message;
                this.status = 'false';
            }
        },
        async logout() {
            this.user = null;
            // 로그아웃 로직 추가
        },
    },
});
