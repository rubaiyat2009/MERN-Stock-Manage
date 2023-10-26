import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCurrentUser, getLoginData, getRegisterData, verifyUser } from "./authAPI"


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    isError: false,
    error: "",
    currentUser: null,
    redirect: {
        status: false,
        path: ""
    }
}


export const loadCurrentUser = createAsyncThunk("auth", async () => {
    const data = await getCurrentUser();
    return data;
});

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
    try {
        const data = await getLoginData(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
    try {
        const data = await getRegisterData(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});
export const verify = createAsyncThunk("auth/verify", async (payload, { rejectWithValue }) => {
    try {
        const data = await verifyUser(payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
            state.currentUser = null;
        },
        disableLoading: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }
            state.token = payload.token ? payload.token : state.token;
            state.currentUser = payload.user;
            state.isAuthenticated = true;

        }).addCase(login.rejected, (state, { error }) => {
            state.isLoading = false;
            state.token = null;
            state.currentUser = null;
            state.isAuthenticated = false;
        })
        builder.addCase(register.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.redirect.status = true;
            state.redirect.path = "/login"

        }).addCase(register.rejected, (state, { error }) => {
            state.isLoading = false;
        })

        builder.addCase(verify.pending, (state) => {
            state.isLoading = true;
        }).addCase(verify.fulfilled, (state) => {
            state.isLoading = false;
            state.redirect.status = true;
            state.redirect.path = "/login"
        }).addCase(verify.rejected, (state) => {
            state.isLoading = false;
        })

        // load current user
        builder.addCase(loadCurrentUser.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        }).addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload.token) {
                localStorage.setItem('token', payload.token);
            }
            state.token = payload.token ? payload.token : state.token;
            state.currentUser = payload.user;
            state.isAuthenticated = true;

        }).addCase(loadCurrentUser.rejected, (state) => {
            state.isLoading = false;
            state.token = null;
            state.currentUser = null;
            state.isAuthenticated = false;

        })

    }
})
export const { logout, disableLoading } = authReducer.actions;

export default authReducer.reducer;