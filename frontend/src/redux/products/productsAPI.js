import { axiosTokenInstance } from "../../utils/axios"

export const createProducts = async (payload) => {
    const { data } = await axiosTokenInstance.post("products/create", payload);
    return data;
}

export const getAllProducts = async (params) => {
    const { data } = await axiosTokenInstance.get("products/list", {
        params: {
            ...params
        }
    });
    return data;
}

export const getAllProductList = async () => {
    const { data } = await axiosTokenInstance.get("products/list-all");
    return data;
}

export const editProduct = async (payload) => {
    const { data } = await axiosTokenInstance.patch("products/edit/" + payload.id, payload.data);
    return data;
}

export const deleteSingleProduct = async (id) => {
    const { data } = await axiosTokenInstance.delete("products/delete/" + id);
    return data;
}

export const bulkUpdate = async (payload) => {
    const { data } = await axiosTokenInstance.patch("products/bulk-update", payload);
    return data;
}