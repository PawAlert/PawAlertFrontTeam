export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login`, credentials);

        // 응답 객체 전체를 로그로 출력
        console.log('응답 객체:', response);

        // 서버 응답 헤더에서 JWT 토큰 추출
        const authorizationHeader = response.headers['authorization'];
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];  // 'Bearer <token>' 형식에서 <token> 추출
            if (token) {
                localStorage.setItem('token', token);
                console.log('토큰이 로컬스토리지에 저장되었습니다:', token);
                return { token };
            } else {
                throw new Error('토큰을 추출하지 못했습니다');
            }
        } else {
            throw new Error('Authorization 헤더가 없습니다');
        }
    } catch (e) {
        console.error('Error detail:', e);  // 에러 상세 로그 출력

        // e.response가 없는 경우를 대비해 기본값을 사용하여 에러 메시지 출력
        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : 'Unknown error';
        throw new Error(`Error ${status}: ${message}`);
    }
};
