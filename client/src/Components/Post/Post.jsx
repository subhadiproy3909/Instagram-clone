import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Modal } from "@mui/material";

import "./post.css"
import Moreoptions from "../../Icons/Moreoptions.png"
import PostDetails from './PostDetails'
import LikeShareCommentSaved from '../subComponent/LikeShareComment';
import SavedPost from '../subComponent/SavedPost';

import { fetchPostDetailsAsync, selectPostDetails } from './postSlice';
import { selectProfileDetails } from '../Profile/profileSlice';



export default function Post({ post }) {
    const dispatch = useDispatch();

    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [postId, setPostId] = useState(null);

    const handleShowmodal = () => {
        setmodalIsOpen(!modalIsOpen)
    }

    if (postId !== post) {
        setPostId(post);
    }

    useEffect(() => {
        if (postId !== null) {
            dispatch(fetchPostDetailsAsync(postId));
        }
    }, [postId, dispatch]);


    const postDetails = useSelector(selectPostDetails);
    const profileDetails = useSelector(selectProfileDetails);

    return (
        <div className='posts'>
            <div className='post-header'>
                <div >
                    <Link style={{ display: 'flex', alignItems: 'center', textDecoration: "none", color: "white" }} to={`/${postDetails?.owner?.username}`} state={postDetails?.owner?._id}>
                        <img src={postDetails?.owner?.image} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                        <p style={{ marginLeft: 10 }}> {postDetails?.owner?.username} </p>
                    </Link>
                </div>
                <div>
                    <img src={Moreoptions} alt="" />
                </div>
            </div>



            <Modal
                open={modalIsOpen}
                onClose={handleShowmodal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={"modalclassNameforAPost"}
            >
                <>
                    <div onClick={handleShowmodal} >
                        <CloseRoundedIcon style={{ fontSize: "1.8rem" }} className="modal-close"></CloseRoundedIcon>
                    </div>
                    <div className='post-content'>
                        <PostDetails own={true} item={postDetails?._id} />
                    </div>
                </>
            </Modal>

            <img src={postDetails?.content} style={{ height: "auto", width: "450px", objectFit: "contain" }} alt="" />

            <div className='explore-rightside-footer'>
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', margin: "15px 0" }}>
                        <LikeShareCommentSaved postDetails={postDetails} userId={profileDetails?.profile.user._id} />

                        <SavedPost profileDetails={profileDetails} item={postDetails._id} />
                    </div>
                </div>
            </div>

            <div>
                {postDetails?.like?.length > 1 ?
                    <p style={{ display: "flex", marginTop: "0px" }}>{postDetails?.like?.length} likes</p>
                    :
                    <p style={{ display: "flex", marginTop: "0px" }}> {postDetails?.like?.length} like</p>
                }

                <div onClick={handleShowmodal} style={{ cursor: "pointer" }}>
                    <p style={{ textAlign: "start", color: "#A8A8A8" }}>View all {postDetails?.comment?.length} comments</p>
                </div>
                <p style={{ textAlign: "start", fontSize: "11px", color: "#A8A8A8" }}> {postDetails?.createdAt} </p>
            </div>
        </div>
    )
}


