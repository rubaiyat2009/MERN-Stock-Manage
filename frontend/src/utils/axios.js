import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
});

export const axiosTokenInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE
});

axiosTokenInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});