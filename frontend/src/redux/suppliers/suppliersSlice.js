import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createSuppliers, deleteSingleSupplier, getAllSuppliers, getSupplierList, supplierDetails, updateSingleSupplier } from "./suppliersAPI";


const initialState = {
    suppliers: [],
    allSuppliers: [],
    supplierDetails: {},
    isDetailsLoading: false,
    isLoading: false,
    isAllLoading: false,
    fetch: 0

}


export const addNewSupplier = createAsyncThunk("suppliers/create", async (payload, { rejectWithValue }) => {
    try {
        const data = await createSuppliers(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const getSuppliersList = createAsyncThunk("suppliers/list-all", async () => {
    const data = await getAllSuppliers();
    return data;
});

export const getSuppliers = createAsyncThunk("suppliers/list", async (params) => {
    const data = await getSupplierList(params);
    return data;
});
export const getSingleSupplier = createAsyncThunk("suppliers/details", async (params) => {
    const data = await supplierDetails(params);
    return data;
});
export const updateSupplier = createAsyncThunk("suppliers/edit", async (params, { rejectWithValue }) => {
    try {
        const data = await updateSingleSupplier(params);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const deleteSupplier = createAsyncThunk("suppliers/delete", async (id, { rejectWithValue }) => {
    try {
        const data = await deleteSingleSupplier(id);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

const suppliersReducer = createSlice({
    name: "suppliers",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(addNewSupplier.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNewSupplier.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.fetch += 1

        }).addCase(addNewSupplier.rejected, (state, { error }) => {
            state.isLoading = false;
        })

        builder.addCase(getSuppliersList.pending, (state) => {
            state.isAllLoading = true;
        }).addCase(getSuppliersList.fulfilled, (state, { payload }) => {
            state.isAllLoading = false;
            state.allSuppliers = payload.suppliers;

        }).addCase(getSuppliersList.rejected, (state, { error }) => {
            state.isAllLoading = false;
        })
        builder.addCase(getSuppliers.pending, (state) => {
            state.isLoading = true;
        }).addCase(getSuppliers.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.suppliers = payload.data.suppliers;
            state.total = payload.data.total

        }).addCase(getSuppliers.rejected, (state, { error }) => {
            state.isLoading = false;
        })
        builder.addCase(getSingleSupplier.pending, (state) => {
            state.isDetailsLoading = true;
        }).addCase(getSingleSupplier.fulfilled, (state, { payload }) => {
            state.isDetailsLoading = false;
            state.supplierDetails = payload.supplier;

        }).addCase(getSingleSupplier.rejected, (state, { error }) => {
            state.isDetailsLoading = false;
        })
        builder.addCase(updateSupplier.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateSupplier.fulfilled, (state) => {
            state.isLoading = false;
            state.fetch += 1
            state.supplierDetails = {}

        }).addCase(updateSupplier.rejected, (state, { error }) => {
            state.isLoading = false;
        })

        builder.addCase(deleteSupplier.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteSupplier.fulfilled, (state) => {
            state.isLoading = false;
            state.fetch += 1;

        }).addCase(deleteSupplier.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default suppliersReducer.reducer;