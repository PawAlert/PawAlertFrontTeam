import {defineStore} from "pinia";
import {commentListView, commentMissingReportRequest} from "@/api/api_missing";


export const useCommentStore = defineStore('comment', {
    state: () => ({
        commentStatus: 'idle',
        error: null,
        totalElements: 0,     // 전체 데이터 개수
        totalPages: 0,        // 전체 페이지 수
        currentPage: 0,       // 현재 페이지 번호
        pageSize: 5,         // 페이지 크기 기본값
        commentList: [],
        postId: 0,
    }),

    actions: {
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
        async commentListResponse(id, page = 0) {
            this.commentStatus = 'loading';
            try {
                const response = await commentListView(id, page);
                this.commentList = response.content
                this.commentStatus = 'success';

                console.log("댓글 가져옴", response)

                this.totalElements = response.totalElements;
                this.totalPages = response.totalPages;
                this.postId = id;
            } catch (error) {
                this.commentStatus = 'error';
                this.error = error.message;
                console.error('댓글 목록 가져오기 오류:', error);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
                this.commentListResponse(this.postId, this.currentPage);
            }
        },

        // 이전 페이지로 이동
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.commentListResponse(this.postId, this.currentPage);
            }
        },
    }

})