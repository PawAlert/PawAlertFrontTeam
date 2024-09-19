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
    const jsonData = new Blob([JSON.stringify(data)], {type: 'application/json'});
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
    const url = API_MISSING.M_DetailView(id)
    const response = await axios.get(
        url,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};
export const commentMissingReportRequest = async (data) => {
    const url = API_MISSING.M_comment(data.postId);
    const getToken = localStorage.getItem('token');

    if (getToken) {
        const response = await axios.post(
            url,
            {content: data.comment},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken}`,
                },
            }
        );
        return response.data;
    } else {
        const response = await axios.post(
            url,
            {content: data.comment},
        );
        return response.data;
    }

};
export const commentListView = async (postId) => {
    // 토큰이 있을경우 와 없을 경우를 분리해야함
    const getToken = localStorage.getItem('token');
    const url = API_MISSING.M_comment(postId);
    if (getToken) {
        const response = await axios.get(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken}`,
                },
            }
        );
        return response.data;
    } else {
        const response = await axios.get(
            url,
        );
        return response.data;
    }
}
