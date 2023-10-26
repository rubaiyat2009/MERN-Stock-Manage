import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUnit, getAllUnitList } from "./productUnitAPI";


const initialState = {
    units: [],
    isLoading: false,
    fetch: 0
}

export const addNewUnit = createAsyncThunk("productunit/create", async (payload, { rejectWithValue }) => {
    try {
        const data = await createUnit(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getAllUnit = createAsyncThunk("productunit/list", async () => {
    const data = await getAllUnitList();
    return data;
});



const productsUnitReducer = createSlice({
    name: "units",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(addNewUnit.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNewUnit.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.fetch += 1
        }).addCase(addNewUnit.rejected, (state, { error }) => {
            state.isLoading = false;
        })

        builder.addCase(getAllUnit.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllUnit.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.units = payload.units;

        }).addCase(getAllUnit.rejected, (state, { error }) => {
            state.isLoading = false;
        })
    }
})

export default productsUnitReducer.reducer;