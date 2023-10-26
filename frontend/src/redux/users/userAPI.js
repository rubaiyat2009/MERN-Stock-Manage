import { axiosTokenInstance } from "../../utils/axios"

export const getUsers = async (params) => {
    const { data } = await axiosTokenInstance.get("users/list", {
        params: {
            ...params
        }
    });
    return data;
}
export const getAllUsers = async () => {
    const { data } = await axiosTokenInstance.get("users/list-all",);
    return data;
}
export const getUserInfo = async (id) => {
    const { data } = await axiosTokenInstance.get("users/details/" + id);
    return data;
}

export const addNewUser = async (payload) => {
    const { data } = await axiosTokenInstance.post("users/create", payload);
    return data;
}

export const editUser = async (payload) => {
    const { data } = await axiosTokenInstance.patch("users/edit/" + payload.id, payload.data);
    return data;
}

export const deleteUser = async (id) => {
    const { data } = await axiosTokenInstance.delete("users/delete/" + id);
    return data;
}