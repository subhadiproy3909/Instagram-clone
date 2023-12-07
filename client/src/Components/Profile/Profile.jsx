import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
// import WestRoundedIcon from '@mui/icons-material/WestRounded';


import "./profile.css";
// import Iconsfromcreatemodal from "../../Icons/Icon to represent media such as images or videos.png";
import ProfileHeader from './component/ProfileHeader';
import Explorepost from '../ExplorePost/Explorepost';
import { selectProfileDetails, selectProfileStatus, fetchProfileAsync } from "./profileSlice";
import { selectLoggedInUser } from "../Auth/authSlice";
import CreatePostModal from '../modalComponent/CreatePostModal';



export default function Profile({ userId }) {
    const dispatch = useDispatch();

    const [posts, setPosts] = useState(true);
    const [saved, setSaved] = useState(false);
    const [tagged, setTagged] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");

    if (userId !== id) {
        setId(userId);
    }
    useEffect(() => {
        if (id !== undefined) {
            // console.log(`user profile id useEffect : ${id}`);
            dispatch(fetchProfileAsync(id));
        }
    }, [id, dispatch]);

    const handleClose = () => {
        setOpen(false)
    }

    const handlePostModal = () => {
        setOpen(true)
    }

    const onClickPost = () => {
        setSaved(false);
        setPosts(true);
    }

    const onClickSaved = () => {
        setPosts(false);
        setSaved(true);
    }

    const profile = useSelector(selectProfileDetails);
    const profileStatus = useSelector(selectProfileStatus);
    const user = useSelector(selectLoggedInUser);

    return (
        <div>
            {
                // profileStatus !== 'loading' && profile &&
                <div className=''>

                    {profile?.profile.user.username === user?.username ?
                        <ProfileHeader own={true} profile={profile?.profile} posts={profile?.posts.length} />
                        :
                        <ProfileHeader own={false} profile={profile?.profile} posts={profile?.posts.length} />
                    }


                    <hr style={{ color: "#fff", width: "90%", marginTop: "2.4rem" }} />

                    {
                        profile?.profile.user.username === user?.username ?
                            <>
                                <div className='post-saved-tagged'>
                                    <a href="#" onClick={onClickPost}>
                                        <GridOnSharpIcon className='profile-icons' />
                                        <p>POSTS</p>
                                    </a>

                                    <a href="#" onClick={onClickSaved}>
                                        <BookmarkBorderOutlinedIcon className='profile-icons' />
                                        <p>SAVED</p>
                                    </a>

                                    <a href="#">
                                        <AssignmentIndOutlinedIcon className='profile-icons' />
                                        <p>TAGGED</p>
                                    </a>
                                </div>

                                {posts &&
                                    <>
                                        {profile.posts.length !== 0 ?
                                            // {map through all posts posted by logged in user}
                                            <>
                                                <div className='postContainerForProfile'>
                                                    {profile?.posts.map((item) => (
                                                        <Explorepost item={item} />
                                                    ))}
                                                </div>
                                            </>
                                            :
                                            // {if the logged in user has no posts}
                                            <>
                                                <div style={{ margin: "10px 2.9rem" }}>
                                                    <div className='no-post'>
                                                        <h3>Share photos</h3>
                                                        <p>
                                                            When you share photos, they will appear on your profile.
                                                        </p>
                                                        <button onClick={handlePostModal}>
                                                            Share your first photo
                                                        </button>

                                                        <Modal
                                                            open={open}
                                                            onClose={handleClose}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                            className='modal'
                                                        >
                                                            <>
                                                                <div onClick={handleClose} >
                                                                    <CloseRoundedIcon style={{ fontSize: "1.8rem" }} className="modal-close"></CloseRoundedIcon>
                                                                </div>

                                                                <CreatePostModal id={profile?.profile.user._id} username={profile.profile.user.username} />
                                                            </>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </>
                                }

                                {saved &&
                                    <div className='postContainerForProfile'>hello</div>
                                }
                            </>
                            :
                            // {if profile username and logged in username are not same}
                            <>
                                <div className='post-saved-tagged'>
                                    <a href="#">
                                        <GridOnSharpIcon className='profile-icons' />
                                        <p>POSTS</p>
                                    </a>

                                    <a href="#">
                                        <BookmarkBorderOutlinedIcon className='profile-icons' />
                                        <p>REELS</p>
                                    </a>

                                    <a href="#">
                                        <AssignmentIndOutlinedIcon className='profile-icons' />
                                        <p>TAGGED</p>
                                    </a>
                                </div>


                                {profile?.posts.length !== 0 ?
                                    // {map through all posts posted by logged in user}
                                    <>
                                        <div className='postContainerForProfile'>
                                            {profile?.posts.map((item) => (
                                                <Explorepost item={item} />
                                            ))}
                                        </div>
                                    </>
                                    :
                                    // {if the logged in user has no posts}
                                    <>
                                        <div style={{ margin: "10px 2.9rem" }}>
                                            <div className='no-post'>
                                                <h3>No posts yet</h3>
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                    }

                </div>
                // :
                // <>
                //     <div className='loading'>
                //         <p>LOADING...</p>
                //     </div>
                // </>
            }
        </div>
    )
}
