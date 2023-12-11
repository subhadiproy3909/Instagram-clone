import { useState } from "react";
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { selectLoggedInUser } from "./Auth/authSlice";



function Protected ({children}) {
    const user = useSelector(selectLoggedInUser);

    if(!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return children;
}

export default Protected;