// src/router/router.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import Signup from "@/views/Signup.vue";
import Main from "@/views/Main.vue";
import MissingListView from "@/views/MissingListView.vue";
import MissingCreate from "@/views/MissingCreate.vue";

// 라우트 설정
const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: { showHeader: true, showFooter: true }

    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { showHeader: true, showFooter: true }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: { showHeader: false, showFooter: false }
    },
    {
        path: '/missing',
        name: 'Missing',
        component: () => import('@/views/MissingListView.vue'),
        meta: { showHeader: true, showFooter: true }
    },
    {
        path: '/missingCreate',
        name: 'MissingCreate',
        component: () => import('@/views/MissingCreate.vue'),
        meta: { showHeader: true, showFooter: true }
    },

];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(), // HTML5 History 모드를 사용
    routes,
});

export default router;
