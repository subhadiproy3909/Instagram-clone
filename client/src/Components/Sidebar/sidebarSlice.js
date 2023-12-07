import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {searchUser} from "./sidebarApi";


const initialState = {
    searchResult: [],
    status: "idle",
}

export const searchUserAsync = createAsyncThunk(
    "common/search",
    async (searchReq) => {
        const response = await searchUser(searchReq);
        return response;
    }
);


export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.searchResult = action.payload;
            })
    }
});

export const selectSearchUser = (state) => state.common.searchResult;

export default commonSlice.reducer;