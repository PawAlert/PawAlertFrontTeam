// src/store/modules/missing.js
import {defineStore} from 'pinia';
import {
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
        currentPage: 0,       // 현재 페이지 번호
        pageSize: 10,         // 페이지 크기 기본값
        status: 'idle',       // 상태
        commentStatus: 'idle', // comment Status
        error: null,          // 오류 메시지
        detail: null,
        currentSortDirection: 'DESC', // 현재 정렬 방향
        currentStatusFilter: 'MISSING', // 현재 상태 필터
    }),
    actions: {
        // 서버에서 데이터 가져오기
        // 서버에서 게시글 목록 가져오기
        async fetchPosts(searchRequest = {}) {
            this.status = 'loading'; // 로딩 중 상태 설정

            // 새로운 요청이 들어오면, 정렬 및 상태 필터 업데이트
            const sortDirection = searchRequest.sortDirection || this.currentSortDirection;
            const statusFilter = searchRequest.statusFilter || this.currentStatusFilter;

            // 상태 저장
            this.currentSortDirection = sortDirection;
            this.currentStatusFilter = statusFilter;

            try {
                // 서버에서 데이터 가져오기
                const response = await fetchMissingListViewRequest({
                    page: this.currentPage,      // 현재 페이지 번호
                    sortDirection: this.currentSortDirection, // 정렬 조건
                    statusFilter: this.currentStatusFilter,   // 상태 필터
                });

                // 응답 데이터 설정
                this.content = response.content;
                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.status = 'missingPostDetailSuccess'; // 성공 상태

            } catch (error) {
                this.status = 'error'; // 에러 발생 시 상태 업데이트
                this.error = error.message;
                console.error('게시글 가져오기 오류:', error);
            }
        },

        // 다음 페이지로 이동
        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
                // 현재 페이지를 증가시키고 다시 요청
                this.fetchPosts({
                    sortDirection: this.currentSortDirection,  // 현재 정렬 유지
                    statusFilter: this.currentStatusFilter,    // 현재 상태 필터 유지
                });
            }
        },

        // 이전 페이지로 이동
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
                // 현재 페이지를 감소시키고 다시 요청
                this.fetchPosts({
                    sortDirection: this.currentSortDirection,  // 현재 정렬 유지
                    statusFilter: this.currentStatusFilter,    // 현재 상태 필터 유지
                });
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