import { getCurrentUserDetails } from "../auth";
import { privateAxios } from "./helper";


export const createPost = async (categoryId, body) => {
    const user = await getCurrentUserDetails();
    const res = await privateAxios.post(`user/${user.id}/category/${categoryId}/posts`, body);
    return res;
}

export const getAllPost = async () => {
    const res = await privateAxios.get('posts?sortBy=addedDate&sortDir=false');
    return res;
}

export const addComment = async (postId, body) => {
    const user = await getCurrentUserDetails();
    const res = await privateAxios.post(`post/${postId}/user/${user.id}/comments`, body);
    return res;
}

export const getPostByUser = async () => {
    const user = await getCurrentUserDetails();
    const res = await privateAxios.get(`user/${user.id}/posts?sortBy=addedDate&sortDir=false`);
    return res;
}