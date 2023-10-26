import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createProducts, bulkUpdate, deleteSingleProduct, editProduct, getAllProductList, getAllProducts } from "./productsAPI";


const initialState = {
    products: [],
    isLoading: false,
    total: 0,
    allProducts: [],
    isAllLoading: false,
    fetch: 0
}

export const addNewProduct = createAsyncThunk("products/create", async (payload, { rejectWithValue }) => {
    try {
        const data = await createProducts(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const getProductsList = createAsyncThunk("products/list", async (params) => {
    const data = await getAllProducts(params);
    return data;
});
export const getAllProduct = createAsyncThunk("products/list-all", async () => {
    const data = await getAllProductList();
    return data;
});
export const updateProduct = createAsyncThunk("products/edit", async (payload, { rejectWithValue }) => {
    try {
        const data = await editProduct(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const deleteProduct = createAsyncThunk("products/delete", async (id, { rejectWithValue }) => {
    try {
        const data = await deleteSingleProduct(id);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const bulkUpdateProduct = createAsyncThunk("products/bulk-update", async (payload) => {
    const data = await bulkUpdate(payload);
    return data;
});



const productsReducer = createSlice({
    name: "products",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(addNewProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNewProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.fetch += 1

        }).addCase(addNewProduct.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(getProductsList.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProductsList.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.products = payload.data.products;
            state.total = payload.data.total

        }).addCase(getProductsList.rejected, (state, { error }) => {
            state.isLoading = false;
        })
        builder.addCase(getAllProduct.pending, (state) => {
            state.isAllLoading = true;
        }).addCase(getAllProduct.fulfilled, (state, { payload }) => {
            state.isAllLoading = false;
            state.allProducts = payload.products;
        }).addCase(getAllProduct.rejected, (state, { error }) => {
            state.isAllLoading = false;
        })

        builder.addCase(updateProduct.fulfilled, (state) => {
            state.fetch += 1;
        })

        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.fetch += 1;
        }).addCase(deleteProduct.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(bulkUpdateProduct.pending, (state) => {
            state.isBulkUpdating = true;
        }).addCase(bulkUpdateProduct.fulfilled, (state, { payload }) => {
            state.isBulkUpdating = false;
            state.fetch += 1;

        }).addCase(bulkUpdateProduct.rejected, (state, { error }) => {
            state.isBulkUpdating = false;
        })

    }
})

export default productsReducer.reducer;