// src/store/modules/missing.js
import {defineStore} from 'pinia';
import {
    commentMissingReportRequest,
    createMissingReportRequest,
    detailViewRequest,
    fetchMissingListViewRequest
} from '@/api/api_missing';

export const useMissingStore = defineStore('missing', {
    state: () => ({
        content: [],          // 현재 페이지에 보여줄 게시글 목록
        totalElements: 0,     // 전체 데이터 개수
        totalPages: 0,        // 전체 페이지 수
        currentPage: 0,       // 현재 페이지 번호
        pageSize: 10,         // 페이지 크기 기본값
        status: 'idle',       // 상태
        error: null,          // 오류 메시지
        detail: null,
    }),
    actions: {
        // 서버에서 데이터 가져오기
        async fetchPosts(searchRequest = {}) {
            this.status = 'loading'; // 로딩 상태로 설정
            try {
                // 서버로부터 데이터 가져오기
                const response = await fetchMissingListViewRequest({
                    ...searchRequest,
                    page: this.currentPage,  // 현재 페이지 번호 전달
                    size: this.pageSize,     // 페이지 크기 전달
                });

                // 응답에서 데이터 설정
                this.content = response.content;
                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.status = 'success'; // 성공 상태로 설정
            } catch (error) {
                this.status = 'error'; // 오류 상태로 설정
                this.error = error.message; // 오류 메시지 저장
                console.error('게시글 가져오기 오류:', error);
            }
        },
        // 다음 페이지로 이동
        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
                this.fetchPosts(); // 페이지 이동 후 데이터 다시 가져오기
            }
        },
        // 이전 페이지로 이동
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.fetchPosts(); // 페이지 이동 후 데이터 다시 가져오기
            }
        },
        async createMissingReport(data, images) {
            this.status = 'loading';
            try {
                const response = await createMissingReportRequest(data, images);
                console.log("data = " ,data)

                this.status = 'sucess;';
                console.log("성공적 생성", response)
            } catch (error) {
                this.status = 'error';
                this.error = error.message;
                console.error('게시글 생성 오류:', error);
            }
        },
        async detailView(id) {
            this.status = 'loading';
            console.log("detailView 함수 호출 ID:", id);
            try {
                const response = await detailViewRequest(id);
                this.detail = response;
                this.status = 'success';
                console.log("상세 정보:", response);
            } catch (error) {
                this.status = 'error';
                this.error = error.message;
                console.error('상세 정보 가져오기 오류:', error);
            }
        },

        async commentMissingReport(id, comment) {
            this.status = 'loading';

            try {
                const response = await commentMissingReportRequest(id, comment);
                console.log("댓글 작성 성공", response);
                this.status = 'success';
            } catch (error) {
                this.status = 'error';
                this.error = error.message;

                console.error('댓글 작성 중 오류 발생:', error);
            }
        }
    },
});