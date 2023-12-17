import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';


import "./profile.css";
import ProfileHeader from './component/ProfileHeader';
import Explorepost from '../ExplorePost/Explorepost';
import { selectProfileDetails, selectProfileStatus, fetchProfileAsync } from "./profileSlice";
import { fetchPostsAsync, selectPosts } from "../Post/postSlice";
import { selectLoggedInUser } from "../Auth/authSlice";
import CreatePostModal from '../modalComponent/CreatePostModal';



export default function Profile({ userId }) {
    const dispatch = useDispatch();

    const [posts, setPosts] = useState(true);
    const [saved, setSaved] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    if (userId !== id) {
        setId(userId);
    }
    useEffect(() => {
        if (id !== null) {
            dispatch(fetchProfileAsync(id));
            dispatch(fetchPostsAsync(id));
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
    const userPosts = useSelector(selectPosts);
    const user = useSelector(selectLoggedInUser);

    return (
        <div>
            {
                <div className=''>

                    {profile?.profile.user.username === user?.username ?
                        <ProfileHeader own={true} profile={profile?.profile} posts={userPosts?.length} />
                        :
                        <ProfileHeader own={false} profile={profile?.profile} posts={userPosts?.length} />
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
                                    // <div>posts</div>
                                    <>
                                        {userPosts?.length !== 0 ?
                                            // {map through all posts posted by logged in user}
                                            <>
                                                <div className='postContainerForProfile'>
                                                    {userPosts?.map((post) => (
                                                        <Explorepost own={true} post={post} />
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
                                    <>
                                        {
                                            profile?.profile?.savedPost.length !== 0 ?
                                                <>
                                                    <div className='postContainerForProfile'>
                                                        {profile?.profile?.savedPost?.map((post) => (
                                                            <Explorepost post={post} />
                                                        ))}
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div style={{ margin: "10px 2.9rem" }}>
                                                        <div className='no-post'>
                                                            <h3>No Saved Post</h3>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </>
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


                                {userPosts?.length !== 0 ?
                                    // {map through all posts posted by logged in user}
                                    <>
                                        <div className='postContainerForProfile'>
                                            {userPosts.map((item) => (
                                                <Explorepost own={false} post={item} />
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
            }
        </div>
    )
}
