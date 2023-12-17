import axios from "axios";

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
            const config  ={
                "Content-type": "application/json",
            }
            const response = await axios.get(`api/user/auth/check`, config);
            if (response.status === 200) {
                resolve(response.data);
            }
            // else {
            //     console.log("failed to load");
            //     const error = await response.text();
            //     reject(error);
            // }
        }
        catch (error) {
            reject(error);
        }
    })
}

export function updateAccount(data){
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(`api/user/update`, data);
            if(response.status === 200){
                resolve(response.data);
            }
            else{
                const error = await response.statusText();
                reject(error);
            }
        } catch (error) {
            reject(error);
        }
    })
}

export function logOut() {
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

export function forgetPassword(data){
    return new Promise(async (resolve) => {
        const config = {
            "Content-type": "application/json",
        }
        const response = await axios.patch(`http://localhost:5001/user/forget/password`, data);
        console.log(response.data);

        if(response.data === "ok"){
            resolve ("message sent");
        }
        else{
            const error = await response.text();
            console.log(error);
        }
    })
}

export function resetPassword({email, password}) {
    return new Promise(async (resolve) => {
        const config = {
            "Content-type": "application/json",
        }

        const response = await axios.patch(`api/user/password/reset?email=${email}`, password);

        if(response.status === 200){
            return "message sent";
        }
        else{
            const error = await response.text();
            console.log(error);
        }
    })
}