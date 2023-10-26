import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addNewUser, deleteUser, editUser, getAllUsers, getUserInfo, getUsers } from "./userAPI";


const initialState = {
    users: [],
    allUsers: [],
    total: 0,
    userDetails: {},
    isLoading: false,
    isUserDetailsLoading: false,
    isEditLoading: false,
    isError: false,
    fetch: 0
}


export const getUserList = createAsyncThunk("users/list", async (params) => {
    const data = await getUsers(params);
    return data;
});
export const getAllUserList = createAsyncThunk("users/list-all", async () => {
    const data = await getAllUsers();
    return data;
});

export const getUserDetails = createAsyncThunk("users/details", async (id) => {
    const data = await getUserInfo(id);
    return data;
});

// export const addUser = createAsyncThunk("users/create", async (payload) => {
//     const data = await addNewUser(payload);
//     return data;
// });
export const addUser = createAsyncThunk('users/create', async (payload, { rejectWithValue }) => {
    try {
        const data = await addNewUser(payload);
        return data
    } catch (err) {
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
        return rejectWithValue(err.response.data)
    }
}
)



export const editUserInfo = createAsyncThunk("users/edit", async (payload) => {
    const data = await editUser(payload);
    return data;
});

export const deleteSingleUser = createAsyncThunk("users/delete", async (id, { rejectWithValue }) => {
    try {
        const data = await deleteUser(id);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

const userReducer = createSlice({
    name: "users",
    initialState,

    extraReducers: (builder) => {
        builder.addCase(getUserList.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(getUserList.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.users = payload.data?.users;
            state.total = payload.data?.total;

        }).addCase(getUserList.rejected, (state, { error }) => {
            state.isLoading = false;
        })
        builder.addCase(getAllUserList.fulfilled, (state, { payload }) => {
            state.allUsers = payload.allUsers
        })

        builder.addCase(addUser.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(addUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.fetch += 1;

        }).addCase(addUser.rejected, (state, { error }) => {
            state.isLoading = false;
        })

        builder.addCase(getUserDetails.pending, (state) => {
            state.isError = false;
            state.isUserDetailsLoading = true;
        }).addCase(getUserDetails.fulfilled, (state, { payload }) => {
            state.isUserDetailsLoading = false;
            state.userDetails = payload.userDetails

        }).addCase(getUserDetails.rejected, (state, { error }) => {
            state.isUserDetailsLoading = false;
        })

        builder.addCase(editUserInfo.pending, (state) => {
            state.isEditLoading = true;
        }).addCase(editUserInfo.fulfilled, (state, { payload }) => {
            state.isEditLoading = false;
            state.fetch += 1;

        }).addCase(editUserInfo.rejected, (state, { error }) => {
            state.isEditLoading = false;
        })

        builder.addCase(deleteSingleUser.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(deleteSingleUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.fetch += 1;

        }).addCase(deleteSingleUser.rejected, (state, { error }) => {
            state.isLoading = false;
        })

    }
})

export default userReducer.reducer;