import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createPost, fetchPosts, fetchPostDetails, addComment, fetchComment, handleLike } from "./postApi";

const initialState = {
    posts: [],
    postDetails: {},
    status: "idle",
}


export const createPostAsync = createAsyncThunk(
    "post/create",
    async (postInfo) => {
        // console.log(postInfo);
        const resopnse = await createPost(postInfo);
        return resopnse;
    }
)

export const fetchPostsAsync = createAsyncThunk(
    "post/fetch/posts",
    async (username) => {
        const response = await fetchPosts(username);

        return response;
    }
);

export const fetchPostDetailsAsync = createAsyncThunk(
    "post/fetch/details",
    async (postId) => {
        const response = await fetchPostDetails(postId);

        // console.log("fetchPostdetails: ",response);
        return response;
    }
);

export const addCommentAsync = createAsyncThunk(
    "post/comment/add",
    async (comment) => {
        const response = await addComment(comment);
        console.log(response)
        return response;
    }
);

export const fetchCommentAsync = createAsyncThunk(
    "post/comment/fetch",
    async (postId) => {
        const response = await fetchComment(postId);
        return response;
    }
)

export const handleLikeAsync = createAsyncThunk(
    "post/like",
    async (postId) => {
        const response = await handleLike(postId);
        return response;
    }
);


export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPostAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.posts.push(action.payload);
            })

            .addCase(fetchPostsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.posts = action.payload;
            })

            .addCase(fetchPostDetailsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostDetailsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.postDetails = action.payload;
            })

            .addCase(addCommentAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addCommentAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.postDetails.comment = action.payload;
            })

            .addCase(fetchCommentAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCommentAsync.fulfilled, (state, action) => {
                state.status = "idle";
                // state.postDetails.comment = action.payload;
                state.postDetails.comment.push(action.payload);
            })

            .addCase(handleLikeAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(handleLikeAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.postDetails.like = action.payload;
            })
    },
});

export const selectPosts = (state) => state.post.posts;
export const selectPostDetails = (state) => state.post.postDetails;
export const selectPostStatus = (state) => state.post.status;
// console.log(selectPostDetails);

export default postSlice.reducer;