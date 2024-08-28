import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue';
import Home from "@/views/Home.vue"; // 로그인 페이지 컴포넌트

// 라우터 정의
const routes = [
    {path: '/home', component: Home},
    { path: '/login', component: Login },

    // 추가적인 라우트 설정
];

// 라우터 인스턴스 생성
const router = createRouter({
    history: createWebHistory(),  // 브라우저의 히스토리 API를 사용
    routes,  // 라우트 정의
});

export default router;
