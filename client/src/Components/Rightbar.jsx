
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./css/rightbar.css"
import Post from './Post/Post'
import { selectFollowingUserPosts, fetchFollowingUserPostsAsync } from './Post/postSlice';
import { selectLoggedInUser } from "./Auth/authSlice";
import { fetchProfileAsync } from "./Profile/profileSlice";
import { useEffect } from "react";
import Suggestion from "./Suggestion";


export default function Rightbar() {
  const dispatch = useDispatch();

  const posts = useSelector(selectFollowingUserPosts);
  const profile = useSelector(selectFollowingUserPosts);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(fetchFollowingUserPostsAsync(user.id));
    dispatch(fetchProfileAsync(user.id));
  }, [user.id, dispatch]);

  
  return (
    <div className='MainRigntBar'>
      <div className='submainrightbar'>

        <div style={{}}>
          {posts.map((post) => (
            <Post key={post._id} post={post._id} />
          ))}
        </div>

        <div>
          <div style={{ marginRight: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 0, }}>
              <Link to={`/${user.username}`} state={user.id}>
                <img src={user?.image} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} alt="" />
              </Link>
              <div style={{ marginLeft: 10, }}>
                <Link to={`/${user.username}`} state={user.id}
                  style={{ textDecoration: "none", textAlign: 'start', color: "white", }}
                >
                  <p> {user?.username} </p>
                </Link>
                <p style={{ marginTop: -15, textAlign: 'start', color: "#A8A8A8" }}> {user?.fullname} </p>
              </div>
              <div style={{ marginLeft: "100px", cursor: "pointer" }}>
                <p style={{ color: "#0095f6", fontSize: 12, fontWeight: "500" }}>Switch</p>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div>
                <p style={{ color: "#A8A8A8", textAlign: 'start' }}>Sugggested for you</p>

                <Suggestion />
              </div>
            </div>
            <p style={{ textAlign: 'start', marginLeft: 30, fontSize: 13, color: "#A8A8A8" }}>© 2023 INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  )
}
