import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


import Moreoptions from '../../Icons/Moreoptions.png'
import Emoji from "../../Icons/Emoji.png"

import "./postdetails.css";
import { fetchPostDetailsAsync, addCommentAsync, handleLikeAsync, selectPostDetails } from "./postSlice";
import { updateSavedPostAsync, selectProfileDetails } from '../Profile/profileSlice';
import Follow from '../subComponent/Follow';
import LikeShareCommentSaved from '../subComponent/LikeShareComment';
import SavedPost from '../subComponent/SavedPost';

const PostDetails = ({ own, item }) => {
    const dispatch = useDispatch();

    const [postId, setPostId] = useState("");
    const [message, setMessage] = useState(null);


    if (item !== postId) {
        setPostId(item);
    }


    useEffect(() => {               //  for fetching a post data.
        if (postId !== "") {
            dispatch(fetchPostDetailsAsync(postId));
        }
    }, [postId, dispatch]);

    const handleMessage = (e) => {
        const value = e.target.value;

        setMessage(value);
    }

    const handleSubmitMessage = () => {
        dispatch(addCommentAsync({ postId, message }));
    }

    const postDetails = useSelector(selectPostDetails);
    const profileDetails = useSelector(selectProfileDetails);

    return (
        <>

            <div className='explore-modal'>
                <div className='explore-post-leftside'>
                    <img src={postDetails?.content} alt="" />
                </div>

                <div className='explore-post-rightside'>
                    <div className='explore-post-rightside_container'>
                        <div className='explore-rightside-header'>
                            <div className='explore-account'>
                                <img src={postDetails?.owner?.image} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <text> {postDetails?.owner?.username} </text>
                                    <div >
                                        
                                        {!own &&
                                            <>
                                                {
                                                    <Follow fromPost={true} profile={profileDetails.profile} />

                                                }

                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img src={Moreoptions} alt="" />
                            </div>
                        </div>
                        <hr />

                        <div className='comment-section'>
                            {postDetails?.comment?.map(user => (
                                <div className='comment-desc'>
                                    <div>
                                        <img src={user.user.image} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} alt="" />
                                    </div>
                                    <div className='comments' style={{ marginLeft: "10px" }}>
                                        <text>{user.user.username}</text>
                                        <span> : </span>
                                        <text>{user.message}</text>
                                        <p>1d</p>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <hr />

                        <div className='explore-rightside-footer'>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', margin: "15px 0" }}>
                                    <LikeShareCommentSaved postDetails={postDetails} userId={profileDetails.profile.user._id} />

                                    <SavedPost profileDetails={profileDetails} item={item} />

                                </div>
                                <p style={{ fontSize: "13px", color: "white" }}> {postDetails?.like.length} likes</p>
                                <p style={{ textAlign: "start", fontSize: "11px", color: "#A8A8A8" }}>{postDetails.createdAt}</p>
                            </div>

                            <hr />
                            <div className='messge-section'>
                                <div className='emoji'>
                                    <img src={Emoji} alt="" width={"27"} height={"27"} />
                                </div>

                                <input style={{ width: "100%" }} type="text" placeholder='Add a comment' onChange={handleMessage} />
                                <input className='message-input-post' type="submit" value={"Post"} onClick={handleSubmitMessage} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PostDetails;