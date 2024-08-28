import axios from 'axios';
import { API_URL } from '@/config/url';

// 로그인 API 호출
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, credentials);

        // 서버 응답 헤더에서 JWT 토큰 추출
        const token = response.headers['Authorization'].split(' ')[1];  // 'Bearer <token>' 형식에서 <token> 추출
        const user = response.data.user;  // 응답 데이터에서 사용자 정보 추출

        return { token, user };  // 추출한 토큰과 사용자 정보를 반환
    } catch (e) {
        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : 'Unknown error';
        throw new Error(`Error ${status}: ${message}`);
    }

};
