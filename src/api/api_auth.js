import axios from 'axios';
import { API_URL } from '@/config/url';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, credentials);

        // 서버 응답 헤더에서 JWT 토큰 추출
        const token = response.headers['authorization'].split(' ')[1];  // 'Bearer <token>' 형식에서 <token> 추출

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('token', token);

        return { token };  // 추출한 토큰을 반환
    } catch (e) {
        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : 'Unknown error';
        throw new Error(`Error ${status}: ${message}`);
    }
};
