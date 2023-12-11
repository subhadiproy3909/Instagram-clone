import React, { useState } from 'react'
import "./css/login.css"
import saveone from "../Images/saveone.png";
import Facebookicon from "../Icons/pngegg.png"
import Instagramlogo from "../Icons/Instagram-Logo-2010-2013.png"
import { Link, Navigate } from 'react-router-dom';

import { loginUserAsync, selectLoggedInUser } from './Auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';


export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const [login, setLogin] = useState({
    email_username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = () => {
    dispatch(loginUserAsync(login));
  }

  return (
    <>
      {user && <Navigate to={'/'} replace={true}></Navigate>}
      <div className='mainLoginPage'>
        <div className='left'>
          <img style={{ position: "relative", top: "25px", left: "156px" }} src={saveone} alt="" />
        </div>
        <div style={{ marginTop: "4%" }}>
          <div className='right'>
            <img src={Instagramlogo} className='logo' alt="" />
            <div style={{ marginLeft: 20 }}>
              <input name='email_username' type="text" placeholder='email, username' className='inputforinstagramloginpage' onChange={handleChange} />
              <input name='password' type="password" placeholder='Password' className='inputforinstagramloginpage' onChange={handleChange} />
            </div>
            <button type='submit' className='instagramloginBtn' onClick={handleSubmit}>Login</button>
            <div style={{ display: "flex" }}>
              <hr style={{ height: 0.01, width: 120, marginTop: 26 }} />
              <p style={{ color: "#7c7580" }}>OR</p>
              <hr style={{ height: 0.01, width: 120, marginTop: 26 }} />
            </div>
            <div style={{ display: 'flex', alignItems: "center", marginLeft: 100, cursor: "pointer" }}>
              <img src={Facebookicon} className='logoface' alt="" />
              <p style={{ fontWeight: 600, color: "#385185" }}>Log in with Facebook</p>
            </div>
            <div>
              <p style={{ color: "#00376B", fontSize: 12, cursor: "pointer", marginLeft: 125, marginTop: -10 }}>Forgot Password?</p>
            </div>
          </div>

          <div className='bottomRight'>
            <div className='right2thpart'>
              <p style={{ color: "black", }}>Have an account?</p>
              <Link style={{ textDecoration: "none" }} to={'/signup'}>
                <p style={{ color: "#00376B", fontWeight: 600, marginLeft: 0 }}>Sign up</p>
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
        {/* </div> */}

      </div>

    </div >
    </>
  )
}
