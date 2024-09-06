// src/router/router.js

import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import Signup from "@/views/Signup.vue";
import Main from "@/views/Main.vue";
import DetailViewMissing from "@/views/DetailViewMissing.vue";
import AnimalHome from "@/views/AnimalHome.vue";
import ShelterHome from "@/views/ShelterHome.vue";
import OfficialGroup from "@/views/OfficialGroup.vue";
import GroupChoice from "@/views/GroupChoice.vue";
import SignupHospital from "@/views/SignupHospital.vue";
import SignupShelter from "@/views/SignupShelter.vue";
import SignupShelterInfo from "@/views/SignupShelterInfo.vue";
import SignupHospitalInfo from "@/views/SignupStart.vue";
import SignupStart from "@/views/SignupStart.vue";

// 라우트 설정
const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
        meta: {showHeader: true, showFooter: true}

    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: {showHeader: true, showFooter: true}
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: {showHeader: false, showFooter: false}
    },
    {
        path: '/missing',
        name: 'Missing',
        component: () => import('@/views/MissingListView.vue'),
        meta: {showHeader: true, showFooter: true}
    },
    {
        path: '/missingCreate',
        name: 'MissingCreate',
        component: () => import('@/views/MissingCreate.vue'),
        meta: {showHeader: true, showFooter: true}
    },
    {
        path: '/myPage',
        name: 'MyPage',
        component: () => import('@/views/MyPage.vue'),
        meta: {showHeader: true, showFooter: false}
    },
    {
        path: '/detail/:id',  // URL 파라미터로 id 받기
        name: 'DetailView',
        component: DetailViewMissing,
        meta: {showHeader: true, showFooter: true},
        props: true,
    },
    {
        path: '/animal',  // URL 파라미터로 id 받기
        name: 'Animal',
        component: AnimalHome,
        meta: {showHeader: true, showFooter: false},
    },
    {
        path: '/shelter',  // URL 파라미터로 id 받기
        name: 'Shelter',
        component: () => import('@/views/ShelterHome.vue'),
        meta: {showHeader: true, showFooter: false},
    },
    {
        path: '/official',  // URL 파라미터로 id 받기
        name: 'Official',
        component: OfficialGroup,
    },
    {
        path: '/groupChoice',  // URL 파라미터로 id 받기
        name: 'GroupChoice',
        component: GroupChoice,
    },
    {
        path: '/signupHospital',  // URL 파라미터로 id 받기
        name: 'SignupHospital',
        component: SignupHospital,
    },
    {
        path: '/signupShelter',  // URL 파라미터로 id 받기
        name: 'SignupShelter',
        component: SignupShelter,
    },
    {
        path: '/signupStart',  // URL 파라미터로 id 받기
        name: 'SignupStart',
        component: SignupStart,
    },
    {
        path: '/signupShelterInfo',  // URL 파라미터로 id 받기
        name: 'SignupShelterInfo',
        component: SignupShelterInfo,
    },

];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(), // HTML5 History 모드를 사용
    routes,
});

export default router;
