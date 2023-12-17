import axios from "axios";

export function createPost(postInfo) {
    return new Promise(async (resolve) => {
        const response = await axios.post(`api/post/create`, postInfo);
        resolve(response.data);
    });
}


export function fetchPosts(userId){
    return new Promise( async (resolve) => {
        const {data} = await axios.get(`api/post/fetch/${userId}`);
        resolve(data);
    })
}

export function fetchPostDetails(postId){
    return new Promise (async (resolve) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.get(`api/post/fetch/selected/post/${postId}`, config);
        resolve(response.data);
    });
}

export function addComment(comment){
    return new Promise (async (resolve) => {
        // console.log(comment);

        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        const response = await axios.patch(`api/post/comment/add`, comment, config);

        resolve(response.data);
    });
}

export function fetchComment(postId){
    return new Promise (async (resolve) => {
        const response = await fetch(`api/post/comment/fetch/${postId}`);

        const data = await response.json();
        resolve(data);
    });
}

export function handleLike(postId){
    return new Promise (async (resolve) => {

        const {data} = await axios.patch(`api/post/like`, postId);
        console.log("like data", data);
        resolve(data);
    });
}

export function fetchFollowingUserPosts(userId) {
    return new Promise (async (resolve, reject) => {
        try{
            const {data} = await axios.get(`api/post/following/user/posts/${userId}`);
    
            resolve(data);
        }
        catch(error){
            reject(error);
        }
    })
}