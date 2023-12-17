import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import instagramLogo from "../Icons/Instagram-Logo-2010-2013.png";
import lockIcon from "../Icons/lock-icon.png";
import "./css/forgetPassword.css";
import { forgetPasswordAsync, selectMessage } from "./Auth/authSlice";



const ForgetPassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [close, setClose] = useState(true);

    const handleEmail = (e) => {
        if (e.target.value) {
            setEmail(e.target.value);
        }
    }

    const handleClose = () => {
        setClose(true);
    }

    const sendLink = () => {
        dispatch(forgetPasswordAsync({ email: email }));
        setClose(false);
    }

    const message = useSelector(selectMessage);
    console.log(message);
    return (
        <>
            <nav className="forget-password-navbar">
                <div className="brand-icon">
                    <img src={instagramLogo} alt="instaLogo" width={"100px"} />
                </div>
            </nav>

            <main className="forget-password-container">

                <div>
                    <div className="forget-password-section">
                        <div style={{ marginTop: "1rem" }}>
                            <img src={lockIcon} alt="lock-icon" width={"110px"} />
                        </div>

                        <p style={{ fontWeight: "600" }}>Trouble with logging in</p>
                        <p style={{ fontSize: "14px", margin: 0, opacity: .7 }}>
                            Enter your email address and we'll send you a link to get back into your account.
                        </p>

                        <div className="forget-password-form">
                            <input type="email" placeholder="Enter email address" onChange={handleEmail} />
                            <input type="submit" value="Send Login Link" onClick={sendLink} />

                            <div className="or">
                                <span className="hr"></span> <p>OR</p> <span className="hr"></span>
                            </div>

                            <Link to={`/signup`} style={{ textDecoration: "none" }}>
                                <p style={{ marginTop: "0px", color: "black", fontWeight: "600", fontSize: "14px" }}>
                                    Create New Account
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div
                        style={{
                            borderTop: ".1px solid rgb(206, 206, 206)", width: "100%",
                            textAlign: "center", padding: ".5rem 0", marginTop: "4rem"
                        }}>

                        <Link to={`/login`} style={{ textDecoration: "none", color: "black", fontWeight: "600", fontSize: "14px" }}>
                            Back to Login
                        </Link>
                    </div>

                </div>
            </main>

            {message && close === false &&
                <div style={{ padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "fixed", left: 0, right: 0, bottom: 0, backgroundColor: "black", color: "white" }}>
                    <p>We sent a email to {email} with a link to get back into your account. </p>
                    <div style={{ cursor: "pointer" }} onClick={handleClose}>
                        <CloseRoundedIcon />
                    </div>

                </div>
            }

        </>
    )
}


export default ForgetPassword;