import axios from "axios";

export function fetchProfile(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`api/profile/${userId}`);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                resolve(data);
            }
            else {
                const error = await response.text();
                reject(error);
            }
        }
        catch (error) {
            console.log("Profile error: ", error);
            reject(error);
        }
    })
}

export function updateFollower(id){
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch("api/profile/follower", {
                method: "PATCH",
                body: JSON.stringify(id),
                headers: {
                    "content-type": "application/json",
                },
            });

            const data = await response.json();
            resolve(data);
        }
        catch(error){
            console.log(`Follower error: ${error}`)
        }
    })
}

export function updateFollowing(id) {
    return new Promise(async (resolve) => {
        const response = await fetch("api/profile/following", {
            method: "PATCH",
            body: JSON.stringify(id),
            headers: {
                "content-type": "application/json",
            },
        });

        const data = await response.json();
        resolve(data);
    })
}

export function updateSavedPost(postId) {
    return new Promise (async (resolve) => {
        // const response = await fetch("api/profile/save/post", {
        //     method: "PATCH",
        //     body: JSON.stringify(posId),
        //     headers: {
        //         "content-type": "application/json",
        //     },
        // });

        // const data = await response.json();
        // resolve(data);

        const {data} = await axios.patch(`api/profile/save/post`, postId);
        resolve(data);
    })
}