const url = "http://localhost:5001";

export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch(`api/user/signup`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" },
        });

        const data = await response.json();
        resolve(data);
    });
}


export function loginUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch(`api/user/login`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { "content-type": "application/json" },
        });

        const data = await response.json();
        if(!data.message){
            resolve(data);
        }
    });
}

export function checkAuth() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`api/user/auth/check`);
            if (response.ok) {
                const data = await response.json();
                resolve(data);
            }
            else {
                console.log("failed to load");
                const error = await response.text();
                reject(error);
            }
        }
        catch (error) {
            reject(error);
        }
    })
}

export function logOut(userId) {
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch(`api/user/logout`);
            if(response.ok){
                resolve({data: "success"});
            }
            else{
                const error = await response.text();
                reject(error);
            }
        }
        catch(error){
            reject(error);
        }
    })
}


export function fetchUserData(){
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`api/user/fetch/user`);

        if(response.ok){
            const data = response.json();
            resolve(data);
        }
        else{
            const error = await response.text();
            reject(error);
        }
    })
}