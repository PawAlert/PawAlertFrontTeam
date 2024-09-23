import axios from "axios";
import {API_MYPAGE} from "@/config/url";

export const myPageInfoUpdate = async (data) => {
    const response = await axios.patch(
        API_MYPAGE.MYPAGE_INFO_UPDATE,
        data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
    )
    return response.data;
}


export const fetchMyPosts = async () => {
    const response = await axios.get(
        API_MYPAGE.MYPAGE_POSTS,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
    )
    return response.data;
}
