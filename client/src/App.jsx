import * as ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route, Routes,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import './App.css';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Explore from "./Pages/Explore/Explore";
import Profile from "./Pages/Profile/Profilepage";
import EditProfilePage from "./Pages/EditProfile/EditProfilePage";
import ForgetPasswordPage from "./Pages/ForgotPasswordPage";
import Protected from "./Components/Protected";
import { store } from "./assets/store";

import { selectLoggedInUser, selectUserChecked, checkAuthAsync } from "./Components/Auth/authSlice";
import { fetchFollowingUserPostsAsync } from "./Components/Post/postSlice";
import { fetchProfileAsync, followSuggestionAsync } from "./Components/Profile/profileSlice";

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log(user);
      dispatch(followSuggestionAsync());
    }
  }, [user, dispatch]);


  return (
    <>
      {userChecked && (
        <Routes>

          <Route path="/" element={<Protected><Home /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Explore" element={<Protected><Explore /></Protected>} />
          <Route path="/:id" element={<Protected><Profile /></Protected>} />
          <Route path="/edit" element={<Protected> <EditProfilePage /> </Protected>} />
          <Route path="/accounts/password/reset" element={ <ForgetPasswordPage /> } />

        </Routes>
      )}
    </>
  )
}

export default App;
