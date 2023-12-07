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
import Protected from "./Components/Auth/component/Protected"
import { store } from "./assets/store";

import { selectLoggedInUser, selectUserChecked, checkAuthAsync } from "./Components/Auth/authSlice";
import { fetchProfileAsync } from "./Components/Profile/profileSlice";

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
    path: `/username`,
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

  // useEffect(() => {
  //   if(user){
  //     // console.log(user);
  //     dispatch(fetchProfileAsync(user.id));
  //   }
  // }, [user, dispatch]);

  return (
    <>
      {userChecked && (
        // <RouterProvider router={router} />
        <Routes>

          <Route path="/" element={<Protected><Home /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Explore" element={<Protected><Explore /></Protected>} />
          <Route path="/:id" element={<Protected><Profile /></Protected>} />
          <Route path="/edit/profile" element={ <Protected> <EditProfilePage /> </Protected> } />
          
        </Routes>
      )}
    </>
  )
}

export default App;
