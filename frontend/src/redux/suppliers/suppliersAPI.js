import { axiosTokenInstance } from "../../utils/axios"

export const createSuppliers = async (payload) => {
    const { data } = await axiosTokenInstance.post("suppliers/create", payload);
    return data;
}

export const getAllSuppliers = async () => {
    const { data } = await axiosTokenInstance.get("suppliers/list-all");
    return data;
}

export const getSupplierList = async (params) => {
    const { data } = await axiosTokenInstance.get("suppliers/list", {
        params: {
            ...params
        }
    });
    return data;
}
export const updateSingleSupplier = async (payload) => {
    const { data } = await axiosTokenInstance.patch("suppliers/edit/" + payload.id, payload.data);
    return data;
}
export const deleteSingleSupplier = async (id) => {
    const { data } = await axiosTokenInstance.delete("suppliers/delete/" + id);
    return data;
}

export const supplierDetails = async (id) => {
    const { data } = await axiosTokenInstance.get("suppliers/details/" + id);
    return data;
}