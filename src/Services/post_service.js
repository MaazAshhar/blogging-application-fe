import { getCurrentUserDetails } from "../auth";
import { privateAxios } from "./helper";


export const createPost = async (categoryId, body) => {
    const user = await getCurrentUserDetails();
    const res = await privateAxios.post(`user/${user.id}/category/${categoryId}/posts`, body);
    return res;
}

export const getAllPost = async (pageNumber=0,pageSize=2) => {
    const res = await privateAxios.get(`posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=false`);
    return res;
}

export const addComment = async (postId, body) => {
    const user = await getCurrentUserDetails();
    const res = await privateAxios.post(`post/${postId}/user/${user.id}/comments`, body);
    return res;
}

export const getPostByUser = async (pageNumber=0,pageSize=2) => {
    const user = await getCurrentUserDetails();
    const res = await privateAxios.get(`user/${user.id}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=false`);
    return res;
}

export const deletePost = async (postId) => {
    const res = await privateAxios.delete(`posts/${postId}`);
    return res;
}