import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchProfile, updateFollower, updateFollowing, updateSavedPost} from "./profileApi";

const initialState = {
    profileDetails: null,
    status: "idle",
    error: null,
}

export const fetchProfileAsync = createAsyncThunk(
    "profile/fetch",
    async () => {
        const response = await fetchProfile();
        return response;
    }
);

export const updateFollowerAsync = createAsyncThunk(
    "profile/update/follower",
    async (userId) => {
        const response = await updateFollower(userId);
        return response;
    }
);

export const updateFollowingAsync = createAsyncThunk(
    "profile/update/following",
    async (userId) => {
        const response = await updateFollowing(userId);
        return response;
    }
);

export const updateSavedPostAsync = createAsyncThunk(
    "profile/update/saved/post",
    async (postId) => {
        const response = await updateSavedPost(postId);
        return response;
    }
);

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileAsync.pending, (state) => {        // fetch profile.
                state.status = "loading";
            })
            .addCase(fetchProfileAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.profileDetails = action.payload;
            })
            .addCase(updateFollowerAsync.pending, (state) => {   // update follower.
                state.status = "loading";
            })
            .addCase(updateFollowerAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.profileDetails.follower = action.payload;
            })
            .addCase(updateFollowingAsync.pending, (state) => {         // update following.
                state.status = "loading";
            })
            .addCase(updateFollowingAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.profileDetails.following = action.payload;
            })
            .addCase(updateSavedPostAsync.pending, (state) => {         // update saved post
                state.status = "loading";
            })
            .addCase(updateSavedPostAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.profileDetails.savedPost = action.payload;
            })
    },
});


export const selectProfileDetails = (state) => state.profile.profileDetails;
export const selectProfileStatus = (state) => state.profile.status;

export default profileSlice.reducer;