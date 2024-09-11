import axios from 'axios';
import {API_MISSING} from '@/config/url'; // URL 설정 가져오기

// 게시글 목록을 가져오는 API 호출 함수
export const fetchMissingListViewRequest = async (searchRequest) => {
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
};

export const createMissingReportRequest = async (data, images) => {
    const formData = new FormData();

    // JSON 데이터를 Blob으로 변환하여 FormData에 추가
    const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('MissingPost', jsonData);

    // 이미지 파일들을 FormData에 추가
    images.forEach((image, index) => {
        formData.append('MissingImage', image, `image-${index + 1}.jpg`);
    });

    // FormData 확인 (디버깅)
    console.log("FormData 내용:");
    for (const pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
    }

    try {
        const response = await fetch(API_MISSING.M_CREATE, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // 로컬 저장소에서 토큰 가져오기
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('서버로 데이터 전송 중 오류 발생:', error.message);
        throw error;
    }
};



export const detailViewRequest = async (id) => {
    const response = await axios.get(API_MISSING.M_DetailView(id));
    return response.data;
};
export const commentMissingReportRequest = async (id, comment) => {
    const url = API_MISSING.M_comment(id);


        const response = await axios.post(
            url,
            { content: comment },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );
        console.log('Server response:', response); // 서버 응답 로그 추가
        return response.data;
};

