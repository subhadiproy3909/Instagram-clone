export function searchUser(searchReq){
    return new Promise( async (resolve) => {
        const response = await fetch(`api/common/search?searchReq=${searchReq}`);

        const data = await response.json();
        resolve(data) ;
    })
}