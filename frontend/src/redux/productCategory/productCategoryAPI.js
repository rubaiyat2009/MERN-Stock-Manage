import { axiosTokenInstance } from "../../utils/axios"

export const createCategory = async (payload) => {
    const { data } = await axiosTokenInstance.post("products/category/create", payload);
    return data;
}


export const getAllCategoryList = async () => {
    const { data } = await axiosTokenInstance.get("products/category/list");
    return data;
}