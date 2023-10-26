import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConsumptionChart, getConsumptionStats, getCurrentOutlets, getPurchaseStats, getSalesStats, getStats } from "./dashboardAPI";


const initialState = {
    stats: {},
    salesStats: [],
    purchaseStats: [],
    consumptionStats: [],
    consumptionChart: [],
    isLoading: false,
    isError: false,
    outlets: [],
    fetch: 0
}


export const getDashboardStats = createAsyncThunk("dashboard/stats", async (params) => {
    const data = await getStats(params);
    return data;
});
export const getDashboardSalesStats = createAsyncThunk("dashboard/sales-stats", async (params) => {
    const data = await getSalesStats(params);
    return data;
});
export const getDashboardPurchaseStats = createAsyncThunk("dashboard/purchase-stats", async (params) => {
    const data = await getPurchaseStats(params);
    return data;
});
export const getDashboardConsumptionStats = createAsyncThunk("dashboard/consumption-stats", async (params) => {
    const data = await getConsumptionStats(params);
    return data;
});
export const getDashboardConsumptionChart = createAsyncThunk("dashboard/consumption-chart", async (params) => {
    const data = await getConsumptionChart(params);
    return data;
});
export const getCurrentUserOutlets = createAsyncThunk("dashboard/outlets", async (params) => {
    const data = await getCurrentOutlets(params);
    return data;
});


const dashboardReducer = createSlice({
    name: "dashboard",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getDashboardStats.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getDashboardStats.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.stats = payload.stats;

        }).addCase(getDashboardStats.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getDashboardSalesStats.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getDashboardSalesStats.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.salesStats = payload.data;

        }).addCase(getDashboardSalesStats.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getDashboardPurchaseStats.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getDashboardPurchaseStats.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.purchaseStats = payload.data;

        }).addCase(getDashboardPurchaseStats.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getDashboardConsumptionStats.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getDashboardConsumptionStats.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.consumptionStats = payload.data;

        }).addCase(getDashboardConsumptionStats.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getDashboardConsumptionChart.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getDashboardConsumptionChart.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.consumptionChart = payload.data;

        }).addCase(getDashboardConsumptionChart.rejected, (state) => {
            state.isLoading = false;
        })
        builder.addCase(getCurrentUserOutlets.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getCurrentUserOutlets.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.outlets = payload.outlets;

        }).addCase(getCurrentUserOutlets.rejected, (state) => {
            state.isLoading = false;
        })


    }
})

export default dashboardReducer.reducer;