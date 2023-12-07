import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import comment from "../../Icons/Comment.png"
import Likeicon from "../../Icons/Notifications.png"
import Unlike from "../../Icons/Unlike.png";
import Moreoptions from '../../Icons/Moreoptions.png'
import Shareicon from "../../Icons/SharePost.png"
import Saveicon from "../../Icons/Save.png"
import Emoji from "../../Icons/Emoji.png"
import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import "./postdetails.css";
import { fetchPostDetailsAsync, addCommentAsync, handleLikeAsync, selectPostDetails } from "./postSlice";
import { updateSavedPostAsync, selectProfileDetails } from '../Profile/profileSlice';

const PostDetails = ({ item }) => {
    const dispatch = useDispatch();

    const [Like, setLike] = useState({
        status: false,
        id: null,
    });
    const [saved, setSaved] = useState({
        status: false,
        id: null,
    });
    const [postId, setPostId] = useState("");
    const [message, setMessage] = useState(null);

    const handleLike = () => {
        setLike((prev) => ({
            ...prev,
            status: !Like.status,
            id: item,
        }));
    }

    const handleSaved = () => {
        setSaved((prev) => ({
            ...prev,
            status: !saved.status,
            id: item,
        }));
    }

    if (item !== postId) {
        setPostId(item);
    }


    useEffect(() => {               //  for fetching a post data.
        if (postId !== "") {
            dispatch(fetchPostDetailsAsync(postId));
        }
    }, [postId, dispatch]);

    useEffect(() => {
        console.log(Like.id);
        if (Like.id !== null) {
            dispatch(handleLikeAsync({ id: Like.id }));
        }
    }, [Like, dispatch]);

    useEffect(() => {
        if(saved.id !== null){
            dispatch(updateSavedPostAsync({id: saved.id}))
        }
    }, [saved, dispatch]);

    const handleMessage = (e) => {
        const value = e.target.value;

        setMessage(value);
    }

    const handleSubmitMessage = () => {
        dispatch(addCommentAsync({ postId, message }));
    }

    const postDetails = useSelector(selectPostDetails);
    const profileDetails = useSelector(selectProfileDetails);

    // console.log(postDetails);
    // console.log(postDetails?.like?.includes(profileDetails.profile.user._id));
    return (
        <>

            <div className='explore-modal'>
                <div style={{ minWidth: "45%" }}>
                    <img style={{ width: "100%", height: "94vh", objectFit: "cover" }} src={postDetails?.content} alt="" />
                </div>

                <div className='explore-post-rightside'>
                    <div className='explore-post-rightside_container'>
                        <div className='explore-rightside-header'>
                            <div className='explore-account'>
                                <img src={postDetails?.owner?.image} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                                <div style={{}}>
                                    <text> {postDetails?.owner?.username} </text>
                                    <text>.</text>
                                    <text style={{ color: "#0095f6" }}>Follow</text>
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
                                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                                        <div onClick={handleLike}>
                                            {(postDetails?.like?.length > 0 &&
                                                postDetails?.like?.includes(profileDetails.profile.user._id)
                                                || Like.id === true)
                                                ?
                                                <img src={Unlike} className='logoforpost' alt="" />
                                                :
                                                <img src={Likeicon} className='logoforpost' alt="" />
                                            }

                                        </div>
                                        <div style={{ cursor: "pointer" }}>
                                            <img src={comment} className='logoforpost' alt="" />
                                        </div>
                                        <img src={Shareicon} className='logoforpost' alt="" />
                                    </div>
                                    <div style={{ cursor: "pointer" }} onClick={handleSaved}>

                                        {(profileDetails.profile.savedPost.length > 0 &&
                                            profileDetails.profile.savedPost.includes(item) ||
                                            saved.status === true)
                                            ?
                                            <Bookmark />
                                            :
                                            <BookmarkBorder />
                                        }
                                    </div>

                                </div>
                                <p style={{ fontSize: "13px", color: "white" }}>147,284 likes</p>
                                <p style={{ textAlign: "start", fontSize: "11px", color: "#A8A8A8" }}>3 DAYS AGO</p>
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