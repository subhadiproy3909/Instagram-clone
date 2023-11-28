import { configureStore, createReducer } from "@reduxjs/toolkit";

import userReducer from "../Components/Auth/authSlice";
import profileReducer from "../Components/Profile/profileSlice";
import postReducer from "../Components/Post/postSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        post: postReducer,
    },
});