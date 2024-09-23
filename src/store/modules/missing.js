// src/store/modules/missing.js
import {defineStore} from 'pinia';
import {
    commentListView,
    commentMissingReportRequest,
    createMissingReportRequest,
    detailViewRequest, fetchMissingDelete,
    fetchMissingListViewRequest,
    fetchMissingUpdate
} from '@/api/api_missing';

export const useMissingStore = defineStore('missing', {
    state: () => ({
        content: [],          // 현재 페이지에 보여줄 게시글 목록
        totalElements: 0,     // 전체 데이터 개수
        totalPages: 0,        // 전체 페이지 수
        currentPage: 1,       // 현재 페이지 번호
        pageSize: 10,         // 페이지 크기 기본값
        status: 'idle',       // 상태
        commentStatus: 'idle', // comment Status
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

                console.log(response)
                // 응답에서 데이터 설정
                this.content = response.content;
                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.status = 'success' // 성공 상태로 설정
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
                console.log("data = ", data)

                this.status = 'success';
                console.log("성공적 생성", response)
            } catch (error) {
                this.status = 'error';
                this.error = error.message;
                console.error('게시글 생성 오류:', error);
            }
        },
        // 게시글 상세조회 하기
        async detailView(id) {
            this.status = 'loading';
            console.log("detailView 함수 호출 ID:", id);
            try {
                const response = await detailViewRequest(id);
                this.detailViewData = response.data;
                this.status = 'success';
            } catch (error) {
                this.status = 'error';
                this.error = error.message;
                console.error('상세 정보 가져오기 오류:', error);
            }
        },
        // 게시글 댓글 작성
        async commentMissingReport(data) {
            this.commentStatus = 'loading';

            try {
                const response = await commentMissingReportRequest(data);
                console.log("댓글 작성 성공", response);
                this.commentStatus = 'success';
            } catch (error) {
                this.commentStatus = 'error';
                this.error = error.message;

                console.error('댓글 작성 중 오류 발생:', error);
            }
        },
        // 게시글 댓글 가져오기
        async commentListResponse(id) {
            this.commentStatus = 'loading';
            try {
                const response = await commentListView(id);
                this.commentList = response.data;
                this.commentStatus = 'success';
            } catch (error) {
                this.commentStatus = 'error';
                this.error = error.message;
                console.error('댓글 목록 가져오기 오류:', error);
            }
        },
        // 게시글 정보 수정하기
        async updateMissingPost(data) {
            this.status = 'loading';
            try {
                const response = await fetchMissingUpdate(data);
                this.updatePosts = response.data;
                this.status = 'success';
            } catch (error) {
                this.status = 'error';
                this.error = error.message;
                console.error('게시글 수정 오류:', error);
            }
        },
        // 게시글 삭제하기
        async deleteMissingPost(id) {
            this.status = 'loading';
            try {
                await fetchMissingDelete(id);
                this.status = "success";
            } catch (error) {
                this.status = 'error';
                this.error = error.message;
                console.error('게시글 삭제 오류:', error);
            }
        }
    },
});