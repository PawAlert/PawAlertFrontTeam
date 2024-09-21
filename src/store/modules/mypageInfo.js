import {defineStore} from "pinia";
import {myPageInfoUpdate} from "@/api/mypage/api_myinfo";

export const useMyPageStore = defineStore('mypage', {
    state: () => ({
        status: 'idle',
        error: null,
    }),
    actions: {
        async fetchMyPageInfoUpdate(data) {
            this.status = 'loading';
            try{
                await myPageInfoUpdate(data);
                this.status = 'success';
            }catch (error) {
                this.error = error.message;
                this.status = 'error';
            }
        }

    }
});