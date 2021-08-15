import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { userApi } from "../../Api";

export const login = createAsyncThunk('auth/login', async (body, { rejectWithValue }) => {
    try {
        const res = await userApi.login(body);
        // console.log(res.data);
        return res.data.userInfo[0];
    } catch (err) {
        toast.error("Đăng nhập thất bại");
        return rejectWithValue(err.response.data);
    }
});

export const register = createAsyncThunk('auth/register', async (body, { rejectWithValue }) => {
    try {
        const res = await userApi.register(body);
        // console.log(res);
        return res.data.userInfo[0];
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("Email đã được đăng ký");
        }
        return rejectWithValue(err.response.data);
    }
});

const initialState = {
    userInfo: null,
    isLoading: false
};

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isLoading = false;
            toast.success("Đăng nhập thành công");
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isLoading = false;
            toast.success("Đăng ký thành công");
        });
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
    }
});

export const authSelector = state => state.auth;

export const {
    logout
} = auth.actions;

export default auth.reducer;