// src/api/auth.js
import axios from 'axios';
import { API_URL } from '@/config/url';

// 로그인 API 호출
export const login = async (credentials) => {
    try {

        const response = await axios.post(`${API_URL}/api/user/login`, credentials);

        return response.data;
    } catch (e) {

        return e.response ? e.response.data : { error: e.message };
    }
}
