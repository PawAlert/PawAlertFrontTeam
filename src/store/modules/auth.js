// src/store/modules/auth.js
import {defineStore} from 'pinia';
import {login, profile} from '@/api/api_auth';
import {register} from "@/api/hospital/api_certification"; // 프로필 정보 가져오는 API 추가

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,  // 사용자 정보를 저장할 상태 추가
        status: 'idle',  // 초기 상태는 idle
        error: null,
    }),
    actions: {
        async login(credentials) {
            this.status = 'loading';  // 로그인 요청 시작 시 상태를 loading으로 설정
            try {
                const {token} = await login(credentials);  // API 호출

                this.token = token;
                this.status = 'success';  // 로그인 성공 시 상태를 success로 설정

                localStorage.setItem('token', token);
                await this.fetchUserProfile();  // 로그인 성공 후 사용자 정보 가져오기

            } catch (error) {
                this.error = error.message;
                this.status = 'error';  // 로그인 실패 시 상태를 error로 설정
            }
        },
        logout() {
            this.token = null;
            this.user = null;  // 사용자 정보도 초기화
            this.status = 'idle';  // 로그아웃 후 상태를 idle로 설정

            localStorage.removeItem('token');
        },
        async checkAuth() {
            const token = localStorage.getItem('token');

            if (token) {
                this.token = token;
                this.status = 'success';  // 유효한 토큰이 있으면 success 상태로 설정
                await this.fetchUserProfile();  // 토큰이 유효하면 사용자 정보 가져오기
            } else {
                this.logout();  // 토큰이 없으면 로그아웃 처리
            }
        },
        // 유저 정보
        async fetchUserProfile() {
            try {
                const response = await profile();  // 사용자 프로필 정보 API 호출
                this.user = response.data;  // 사용자 정보 저장
            } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
                this.logout();  // 실패 시 로그아웃 처리
            }
        },
        // 회원가입
        async fetchUserSignup(data) {
            try {
                const response = await register(data);
                console.log('fetchUserSignup response:', response);
                return response;
            } catch (error) {
                console.error('회원가입 실패:', error);
                throw error;
            }
        }
    },
});
