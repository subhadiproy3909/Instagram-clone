import React, { useState } from 'react'
import { Modal } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import love from "../../Icons/Notifications2.png"
import comment from "../../Icons/Comment.png"
import Likeicon from "../../Icons/Notifications.png"
import unlike from "../../Icons/Unlike.png"

import PostDetails from '../Post/PostDetails'
import "./explorepost.css";


export default function Explorepost({post}) {
  // console.log(item)
  const [open, setOpen] = useState(false);
  const [Like, SetLike] = useState(Likeicon);
  const handleShowmodal = () => {
    setOpen(prev => !prev);
  }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const handleLike = () => {
    if (Like == Likeicon) {
      SetLike(unlike);
    } else {
      SetLike(Likeicon);
    }
  }
  // console.log(item);
  return (
    <div className="container">
      <div className="imagefor" onClick={handleShowmodal}>
        <img src={post?.content} className='imageforimage' alt="" />
        <div className="text">
          <div style={{ display: "flex", alignItems: 'center', marginLeft: "10px" }}>
            <img src={love} className='logoforexplorepost' alt="" />
            <p style={{ marginLeft: 5 }}>{post?.like?.length}</p>
          </div>
          <div style={{ display: "flex", alignItems: 'center', marginLeft: "10px" }}>
            <img src={comment} className='logoforexplorepost' alt="" />
            <p style={{ marginLeft: 5 }}>{post?.comment?.length}</p>
          </div>
        </div>
      </div>

      <Modal
        open={open}
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
            <PostDetails item={post._id} />
          </div>
        </>
      </Modal>


    </div>
  )
}
