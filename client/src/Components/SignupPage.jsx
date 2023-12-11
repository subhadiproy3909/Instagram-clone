import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./css/signup.css"
import signupicon from '../Icons/icons8-facebook-67.png'
import Instagramlogo from "../Icons/Instagram-Logo-2010-2013.png"
import { Link, Navigate } from 'react-router-dom';


import { selectLoggedInUser, createUserAsync } from './Auth/authSlice';

export default function SignupPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const [signup, setSignup] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setSignup((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    dispatch(createUserAsync(signup));
  }

  return (
    <>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div className='mainSignupPage'>
        <div style={{ marginTop: "10px", }}>
          <div className='signupright'>
            <img src={Instagramlogo} className='logo' alt="" />
            <p style={{ margin: "5px 2.5rem" }}>Sign up to see photos and videos from your friends.</p>
            <button style={{ display: "flex", justifyContent: "center", cursor: "pointer", alignItems: "center", backgroundColor: "#4cb5f9", textAlign: "center", margin: 'auto 2.5rem', border: 'none', color: "white", borderRadius: 10, }}>
              <img src={signupicon} style={{ width: 20, height: 20, padding: 7 }} alt="" />
              Log in with  Facebook
            </button>

            <div style={{ display: "flex" }}>
              <hr style={{ height: "1.7px", width: 120, marginTop: 26, backgroundColor: "#7c7580" }} />
              <p style={{ color: "#7c7580" }}>OR</p>
              <hr style={{ height: "1.7px", width: 120, marginTop: 26, backgroundColor: "#737373" }} />
            </div>

            <div style={{ margin: "auto 2.5rem", }}>
              <input name='email' type="text" placeholder='Email' className='inputforinstagramloginpage' onChange={handleChange} />
              <input name='fullname' type="text" placeholder='Full Name' className='inputforinstagramloginpage' onChange={handleChange} />
              <input name='username' type="text" placeholder='Username' className='inputforinstagramloginpage' onChange={handleChange} />
              <input name='password' type="password" placeholder='Password' className='inputforinstagramloginpage' onChange={handleChange} />
              <input name='cpassword' type="password" placeholder='Confirm Password' className='inputforinstagramloginpage' onChange={handleChange} />
            </div>
            <p style={{ color: "#7c7580", fontSize: 12, fontWeight: 400, textAlign: 'center', margin: ".8rem 2.5rem", }}>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
            <p style={{ color: "#7c7580", fontSize: 12, fontWeight: 400, textAlign: 'center', margin: "auto 2.5rem" }}>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
            <button className='instagramloginBtn' onClick={handleSubmit}>Sign up</button>
          </div>

          <div className='bottomRight'>
            <div className='right2thpart'>
                <p style={{ color: "black", }}>Have an account?</p>
                <Link style={{ textDecoration: "none" }} to={'/login'}>
                  <p style={{ color: "#00376B", fontWeight: 600, marginLeft: 0 }}>Log in</p>
                </Link>

            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
              <p style={{ color: "black", }}>Get the app.</p>
              <div style={{ display: "flex", alignContent: "center", marginLeft: "" }}>
                <img style={{ width: 140, }} src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" />
                <img style={{ width: 120, paddingLeft: 10 }} src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}
