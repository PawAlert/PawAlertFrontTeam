import axios from "axios";
import { API_URL } from "@/config/url";

export const login = async (credentials) => {
    try {
        // 로그인 자격 증명을 사용하여 POST 요청을 보냅니다.
        const response = await axios.post(`${API_URL}/api/user/login`, credentials);

        // 응답 객체 전체를 로그로 출력하여 디버깅합니다.
        console.log('응답 객체:', response);

        // 응답 본문에서 JWT 토큰을 추출합니다.
        const token = response.data.data.token;

        // 토큰이 존재하는지 확인합니다.
        if (token) {
            // 토큰을 로컬 스토리지에 저장합니다.
            localStorage.setItem('token', token);
            console.log('토큰이 로컬스토리지에 저장되었습니다:', token);
            return { token };
        } else {
            // 토큰을 찾을 수 없는 경우 오류를 던집니다.
            throw new Error('토큰을 추출하지 못했습니다');
        }
    } catch (e) {
        // 오류 세부 정보를 로그로 출력합니다.
        console.error('오류 세부 사항:', e);

        // 응답 오류가 있는 경우 상태와 메시지를 추출합니다.
        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : '알 수 없는 오류';
        throw new Error(`오류 ${status}: ${message}`);
    }
};
