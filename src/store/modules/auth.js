// src/store/modules/auth.js
import { defineStore } from 'pinia';
import { login, profile } from '@/api/api_auth';
import { register } from "@/api/hospital/api_certification";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
        status: 'idle',
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'loading';
            try {
                const { token } = await login(credentials);
                this.setToken(token);
                await this.fetchUserProfile();
            } catch (error) {
                this.error = error.message;
                this.status = 'error';
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            this.status = 'idle';
            localStorage.removeItem('token');
        },
        async checkAuth() {
            const token = localStorage.getItem('token');
            if (token) {
                this.setToken(token);
                await this.fetchUserProfile();
            } else {
                this.logout();
            }
        },
        async fetchUserProfile() {
            try {
                const response = await profile();
                this.user = response.data;
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
                this.logout();
            }
        },
        async fetchUserSignup(data) {
            try {
                const response = await register(data);
                console.log('fetchUserSignup response:', response);
                return response;
            } catch (error) {
                console.error('회원가입 실패:', error);
                throw error;
            }
        },
        setToken(token) {
            this.token = token;
            this.status = 'success';
            localStorage.setItem('token', token);
        }
    },
});