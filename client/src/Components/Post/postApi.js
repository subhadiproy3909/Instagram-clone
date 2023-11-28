export function createPost(postInfo) {
    return new Promise(async (resolve) => {
        const response = await fetch(`api/post/create`, {
            method: "POST",
            body: JSON.stringify(postInfo),
            headers: {
                "content-type": "application/json",
            }
        });

        const data = await response.json();
        resolve(data);
    });
}


export function fetchPosts(username){
    return new Promise( async (resolve) => {
        const response = await fetch(`api/post/fetch/${username}`);

        const data = await response.json();
        resolve(data);
    })
}

export function fetchPostDetails(postId){
    return new Promise (async (resolve) => {
        const response = await fetch(`api/post/fetch/selected/post?${postId}`);

        const data = await response.json();
        resolve(data);
    });
}

export function addComment(comment){
    return new Promise (async (resolve) => {
        const response = await fetch(`api/comment/add`, {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
                "content-type": "application/json",
            },
        })

        const data = await response.json();

        resolve(data);
    });
}

export function handleLike(postId){
    return new Promise (async (resolve) => {
        const response = await fetch(`api/like`, {
            method: "PATCH",
            body:JSON.stringify(postId),
            headers: {
                "content-type": "application/json",
            },
        })

        const data = await response.json();

        resolve(data);
    });
}