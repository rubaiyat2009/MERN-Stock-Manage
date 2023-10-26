import { axiosTokenInstance } from "../../utils/axios"

export const createUnit = async (payload) => {
    const { data } = await axiosTokenInstance.post("products/unit/create", payload);
    return data;
}


export const getAllUnitList = async () => {
    const { data } = await axiosTokenInstance.get("products/unit/list");
    return data;
}