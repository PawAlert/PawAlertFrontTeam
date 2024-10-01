import {defineStore} from "pinia";
import {fetchMyPosts, myPageInfoUpdate} from "@/api/mypage/api_myinfo";

export const useMyPageStore = defineStore('mypage', {
    state: () => ({
        status: 'idle',
        error: null,
    }),
    actions: {
        async fetchMyPageInfoUpdate(data) {
            this.status = 'myImageLoading';
            try {
                await myPageInfoUpdate(data);
                this.status = 'myImageSuccess';
            } catch (error) {
                this.error = error.message;
                this.status = 'myImagError';
            }
        },
        async fetchMyPosts() {
            this.status = 'myPostsLoading';
            try {
                const response = await fetchMyPosts();
                this.posts = response.data;

                this.status = 'myPostsSuccess';
            } catch (error) {
                this.error = error.message;
                this.status = 'myPostsError';
            }

        }
    },
});