import axios from 'axios';
import { API_URL } from '@/config/url';

// 로그인 API 호출
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, credentials);
        // 상태 코드가 2xx 범위에 있는지 확인
        return response.data;
    } catch (e) {
        // 오류가 발생하면 상태 코드에 따라 처리
        const status = e.response ? e.response.status : 500; // 기본값은 500으로 설정
        const message = e.response && e.response.data ? e.response.data.message : 'Unknown error';
        throw new Error(`Error ${status}: ${message}`);
    }
}
