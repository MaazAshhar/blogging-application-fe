import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://192.168.238.165:9090/api/";

export const myAxios = axios.create({
    baseURL: BASE_URL,
});


export const privateAxios = axios.create({
    baseURL: BASE_URL,
})

privateAxios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error)=>Promise.reject(error)
);