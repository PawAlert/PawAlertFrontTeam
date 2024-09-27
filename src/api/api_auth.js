import axios from "axios";
import {API_MYPAGE, API_URL} from "@/config/url";

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, credentials);
        console.log('응답 객체:', response);

        const token = response.data.data.token;

        if (token) {
            localStorage.setItem('token', token);
            console.log('토큰이 로컬스토리지에 저장되었습니다:', token);
            return {token};
        } else {
            throw new Error('토큰을 추출하지 못했습니다');
        }
    } catch (e) {
        console.error('오류 세부 사항:', e);

        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : '알 수 없는 오류';
        throw new Error(`오류 ${status}: ${message}`);
    }
};

// 프로필 가져오기
export const profile = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (e) {
        console.error('오류 세부 사항:', e);

        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : '알 수 없는 오류';
        throw new Error(`오류 ${status}: ${message}`);
    }
};

export const updateProfileImage = async (image) => {
    const formData = new FormData();
    formData.append('userImage', image);
    const response = await axios.patch(
        API_MYPAGE.MYPAGE_PROFILE_UPDATE,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    return response.data;
}

