import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { createUser, loginUser, checkAuth, updateAccount, logOut, fetchUserData, forgetPassword, resetPassword } from "./authApi";


const initialState = {
    loggedInUserToken: null,
    status: "idle",
    error: null,
    userChecked: false,
    forgetPasswordMessage: "",
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

export const updateAccountAsync = createAsyncThunk(
    "user/update",
    async (data) => {
        try{
            const response = await updateAccount(data);
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
)



export const logOutAsync = createAsyncThunk(
    "user/logOut",
    async () => {
        try {
            const response = await logOut();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
);

export const forgetPasswordAsync = createAsyncThunk(
    "user/forget/password",
    async(email) => {
        try {
            const response = await forgetPassword(email);
            console.log(response);
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

            .addCase(updateAccountAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAccountAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
            })

            .addCase(logOutAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logOutAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = null;
            })

            .addCase(forgetPasswordAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.forgetPasswordMessage = action.payload;
            })
    }
});

export const selectLoggedInUser = (state) => state.user.loggedInUserToken;
export const selectUserChecked = (state) => state.user.userChecked;
export const selectMessage = (state) => {
    console.log(state.user.forgetPasswordMessage)
    return state.user.forgetPasswordMessage;
}

export default userSlice.reducer;