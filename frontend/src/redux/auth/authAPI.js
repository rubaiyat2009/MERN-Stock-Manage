import { axiosInstance, axiosTokenInstance } from "../../utils/axios"

export const getCurrentUser = async () => {
    const { data } = await axiosTokenInstance.get("auth");
    return data;
}

export const getLoginData = async (payload) => {
    const { data } = await axiosInstance.post("auth/login", payload);
    return data;
}
export const verifyUser = async (payload) => {
    const { data } = await axiosInstance.post("auth/verify", payload);
    return data;
}

export const getRegisterData = async (payload) => {
    const { data } = await axiosInstance.post("auth/register", payload);
    return data;
}