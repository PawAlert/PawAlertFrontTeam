import axios from 'axios';
import { API_MISSING } from '@/config/url'; // URL 설정 가져오기

// 게시글 목록을 가져오는 API 호출 함수
export const fetchMissingListViewRequest = async (searchRequest) => {
    try {
        const response = await axios.get(API_MISSING.M_LIST, {
            params: {
                address: searchRequest.address || '',
                addressDetail1: searchRequest.addressDetail1 || '',
                status: searchRequest.status || '',
                page: searchRequest.page || 0,  // 페이지 번호
                size: searchRequest.size || 10,  // 페이지 크기
            },
        });
        return response.data; // 서버 응답 데이터 반환
    } catch (e) {
        console.error('오류 세부 사항:', e);
        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : '알 수 없는 오류';
        throw new Error(`오류 ${status}: ${message}`);
    }
};

export const createMissingReportRequest = async (data, images) => {
    try{
        const formData = new FormData();
        formData.append('MissingPost', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        // 이미지 파일들 FormData에 추가
        images.forEach((image, index) => {
            formData.append('MissingImage', image, `image-${index + 1}.jpg`);
        });

        const response = await axios.post(API_MISSING.M_CREATE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // 로컬 저장소에서 토큰 가져오기
            },
        });

        console.log(response);
        return response.data;


    }catch (e) {
        console.error('오류 세부 사항:', e);
        const status = e.response ? e.response.status : 500;
        const message = e.response && e.response.data ? e.response.data.message : '알 수 없는 오류';
        throw new Error(`오류 ${status}: ${message}`);
    }
}
