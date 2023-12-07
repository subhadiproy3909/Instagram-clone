import { configureStore, createReducer } from "@reduxjs/toolkit";

import userReducer from "../Components/Auth/authSlice";
import profileReducer from "../Components/Profile/profileSlice";
import postReducer from "../Components/Post/postSlice";
import sidebarReducer from "../Components/Sidebar/sidebarSlice";


export const store = configureStore({
    reducer: {
        common: sidebarReducer,
        user: userReducer,
        profile: profileReducer,
        post: postReducer,
    },
});