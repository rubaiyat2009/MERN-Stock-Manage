import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createCategory, getAllCategoryList } from "./productCategoryAPI";


const initialState = {
    categories: [],
    isLoading: false,
    fetch: 0
}

export const addNewCategory = createAsyncThunk("productcategory/create", async (payload, { rejectWithValue }) => {
    try {
        const data = await createCategory(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getAllCategory = createAsyncThunk("productcategory/list", async () => {
    const data = await getAllCategoryList();
    return data;
});



const productsCategoryReducer = createSlice({
    name: "categories",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(addNewCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNewCategory.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.fetch += 1
        }).addCase(addNewCategory.rejected, (state, { error }) => {
            state.isLoading = false;
        })

        builder.addCase(getAllCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllCategory.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.categories = payload.categories;

        }).addCase(getAllCategory.rejected, (state, { error }) => {
            state.isLoading = false;
        })
    }
})

export default productsCategoryReducer.reducer;