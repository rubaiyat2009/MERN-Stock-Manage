import { axiosTokenInstance } from "../../utils/axios"



export const getStats = async (params) => {
    const { data } = await axiosTokenInstance.get("dashboard/stats", {
        params: {
            ...params,
        }
    });
    return data;
}
export const getSalesStats = async (params) => {
    const { data } = await axiosTokenInstance.get("dashboard/sales-stats", {
        params: {
            ...params,
        }
    });
    return data;
}
export const getPurchaseStats = async (params) => {
    const { data } = await axiosTokenInstance.get("dashboard/purchase-stats", {
        params: {
            ...params,
        }
    });
    return data;
}
export const getConsumptionStats = async (params) => {
    const { data } = await axiosTokenInstance.get("dashboard/consumption-stats", {
        params: {
            ...params,
        }
    });
    return data;
}
export const getConsumptionChart = async (params) => {
    const { data } = await axiosTokenInstance.get("dashboard/consumption-chart", {
        params: {
            ...params,
        }
    });
    return data;
}

export const getCurrentOutlets = async () => {
    const { data } = await axiosTokenInstance.get("dashboard/outlets");
    return data;
}
