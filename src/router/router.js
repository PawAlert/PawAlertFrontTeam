// src/router/router.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import LoginPage from '@/views/LoginPage.vue';

// 라우트 설정
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }, // 인증이 필요한 페이지
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },

];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(), // HTML5 History 모드를 사용
    routes,
});

// 전역 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {
        next('/login'); // 인증이 필요하지만 토큰이 없는 경우 로그인 페이지로 리다이렉트
    } else {
        next(); // 그렇지 않으면 다음 페이지로 이동
    }
});

export default router;
