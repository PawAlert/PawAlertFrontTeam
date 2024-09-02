// src/config/url.js
export const API_URL = 'https://port-0-pawalertbackendteamgroup-m06zwfj8628a2164.sel4.cloudtype.app';

// 소셜로그인
export const AUTH_URLS = {
    GOOGLE: `${API_URL}/oauth2/authorization/google`,
    NAVER: `${API_URL}/oauth2/authorization/naver`,
    KAKAO: `${API_URL}/oauth2/authorization/kakao`,
};

export const API_MISSING = {
    M_CREATE : `${API_URL}/api/missing/create`,
    M_PATCH : `${API_URL}/api/missing/update`,
    M_DELETE: (id) => `${API_URL}/api/missing/delete/${id}`,
    M_DetailView: (id) => `${API_URL}/api/missing/getdetail/${id}`,
    M_LIST: `${API_URL}/api/missing/search`,
    M_comment: (id) => `${API_URL}/api/posts/${id}/comments`,
}