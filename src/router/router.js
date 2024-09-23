// src/router/router.js

import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import Signup from "@/views/Signup.vue";
import Main from "@/views/Main.vue";
import DetailViewMissing from "@/views/PetMissingPost/DetailViewMissing.vue";
import AnimalHome from "@/views/AnimalHome.vue";
import OfficialGroup from "@/views/OfficialGroup.vue";
import GroupChoice from "@/views/GroupChoice.vue";
import SignupHospital from "@/views/hospital/signup/SignupHospital.vue";
import SignupShelter from "@/views/shelter/SignupShelter.vue";
import SignupShelterInfo from "@/views/SignupShelterInfo.vue";
import SignupStart from "@/views/SignupStart.vue";
import HospitalInfo from "@/views/hospital/signup/HospitalInfo.vue";

// 라우트 설정
const routes = [

    {
        path: '/myPage',
        component: () => import('@/components/layout/MyLayout.vue'),
        children: [
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/mypage/MyPage.vue'),
                meta: {showSidebar: true, showHeader: true, showFooter: false},
            },
            {
                path:'myPost',
                name: 'MyPost',
                component: () => import('@/views/mypage/MyPost.vue'),
                meta: {showSidebar: true, showHeader: true, showFooter: false},
            },
            {
                path:'myFavorites',
                name: 'MyFavorites',
                component: () => import('@/views/mypage/Contact.vue'),
                meta: {showSidebar: true, showHeader: true, showFooter: false},
            },
            {
                path:'myPageContact',
                name: 'MyPageContact',
                component: () => import('@/views/mypage/MyFavorites.vue'),
                meta: {showSidebar: true, showHeader: true, showFooter: false},
            },

        ]
    },

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
        component: () => import('@/views/PetMissingPost/MissingListView.vue'),
        meta: {showHeader: true, showFooter: true}
    },
    {
        path: '/missingPostCreate',
        name: 'MissingPostCreate',
        component: () => import('@/views/PetMissingPost/MissingPostCreate.vue'),
        meta: {showHeader: true, showFooter: true}
    },
    {
        path: '/detail/:id',  // URL 파라미터로 id 받기
        name: 'DetailView',
        component: DetailViewMissing,
        meta: {showHeader: true, showFooter: false},
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
        path: '/official',
        name: 'Official',
        component: OfficialGroup,
    },
    {
        path: '/groupChoice',
        name: 'GroupChoice',
        component: GroupChoice,
    },
    {
        path: '/signupHospital',
        name: 'SignupHospital',
        component: SignupHospital,
    },
    {
        path: '/signupShelter',
        name: 'SignupShelter',
        component: SignupShelter,
    },
    {
        path: '/signupStart',
        name: 'SignupStart',
        component: SignupStart,
    },
    {
        path: '/signupShelterInfo',
        name: 'SignupShelterInfo',
        component: SignupShelterInfo,
    },
    {
        path: '/hospitalInfo',
        name: 'HospitalInfo',
        component: HospitalInfo,
    },
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
