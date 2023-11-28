import * as ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import './App.css';
import Home from './Pages/Home/Home';
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Explore from "./Pages/Explore/Explore";
import Profile from "./Pages/Profile/Profile";
import Protected from "./Components/Auth/component/Protected"
import { store } from "./assets/store";

import { selectLoggedInUser, selectUserChecked, checkAuthAsync } from "./Components/Auth/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Protected>
      <Home />
    </Protected>,

  },
  {
    path: "/login",
    element: <Login />,

  },
  {
    path: "/signup",
    element: <Signup />,

  },
  {
    path: "/Explore",
    element: 
    <Protected>
      <Explore />
    </Protected>,

  },
  {
    path: "/username",
    element: 
    <Protected>
      <Profile />
    </Protected>,
  },
]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:
//       <Home />,

//   },
//   {
//     path: "/login",
//     element: <Login />,

//   },
//   {
//     path: "/signup",
//     element: <Signup />,

//   },
//   {
//     path: "/Explore",
//     element:
//       <Explore />,

//   },
//   {
//     path: "/username",
//     element:
//       <Profile />,
//   },
// ]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if(user){
      // todo: fetch user profile;
      // dispatch();
    }
  }, [user, dispatch]);

  return (
    <>
      {userChecked && (
        <RouterProvider router={router} />
      )}
    </>
  )
}

export default App;
