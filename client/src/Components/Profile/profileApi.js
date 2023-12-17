import axios from "axios";

export function fetchProfile(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            // const response = await fetch(`api/profile/${userId}`);

            // if (response.ok) {
            //     const data = await response.json();
            //     resolve(data);
            // }
            // else {
            //     const error = await response.text();
            //     reject(error);
            // }

            const response = await axios.get(`api/profile/${userId}`);

            if(response.status === 200){
                resolve(response.data);
            }
            else{
                reject(response.statusText);
            }
        }
        catch (error) {
            console.log("Profile error: ", error);
            reject(error);
        }
    })
}

// export function updateFollower(id){
//     return new Promise(async (resolve, reject) => {
//         try{
//             const response = await fetch("api/profile/follower", {
//                 method: "PATCH",
//                 body: JSON.stringify(id),
//                 headers: {
//                     "content-type": "application/json",
//                 },
//             });

//             const data = await response.json();
//             resolve(data);
//         }
//         catch(error){
//             console.log(`Follower error: ${error}`)
//         }
//     })
// }

export function updateFollowing(id) {
    return new Promise(async (resolve) => {
        const response = await axios.patch(`api/profile/following`, id);
        if(response.status === 200){
            resolve(response.data);
        }
    })
}

export function updateSavedPost(postId) {
    return new Promise (async (resolve) => {
        const {data} = await axios.patch(`api/profile/save/post`, postId);
        resolve(data);
    })
}

export function followSuggestion() {
    return new Promise (async (resolve) => {
        const config = {
            "Content-type": "application/json",
        }
        const {data} = await axios.get(`api/profile/follow/suggestion`, config);
        resolve(data);
    })
}