import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { createUser, loginUser, checkAuth, logOut, fetchUserData } from "./authApi";


const initialState = {
    loggedInUserToken: null,
    status: "idle",
    error: null,
    userChecked: false,
};

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response;
    }
);

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (userData) => {
        const response = await loginUser(userData);
        return response;
    }
);

export const checkAuthAsync = createAsyncThunk(
    "user/checkAuth",
    async () => {
        try {
            const response = await checkAuth();
            return response;
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
);

export const logOutAsync = createAsyncThunk(
    "user/logOut",
    async (id) => {
        try {
            const response = await logOut(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchUserDataAsync = createAsyncThunk(
    "user/account",
    async () => {
        try {
            const response = await fetchUserData();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
)



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
            })
            .addCase(checkAuthAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
                state.userChecked = true;
            })
            .addCase(logOutAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logOutAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = null;
            })
    }
});

export const selectLoggedInUser = (state) => state.user.loggedInUserToken;
export const selectUserChecked = (state) => state.user.userChecked;

export default userSlice.reducer;