import React, { useState } from 'react'
import love from "../../Icons/Notifications2.png"
import comment from "../../Icons/Comment.png"
import Likeicon from "../../Icons/Notifications.png"
import unlike from "../../Icons/Unlike.png"
import "../../Pages/Explore/explore.css";
import "./explorepost.css";
import PostDetails from '../postDetails/PostDetails'
import Modal from 'react-modal';
export default function Explorepost(item) {
  console.log(item)
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [Like, SetLike] = useState(Likeicon);
  const handleShowmodal = () => {
    setmodalIsOpen(true);
  }

  const handleLike = () => {
    if (Like == Likeicon) {
      SetLike(unlike);
    } else {
      SetLike(Likeicon);
    }
  }
  return (
    <div className="container" onClick={handleShowmodal}>
      <div className="imagefor">
        <img src={item?.item?.postimage} className='imageforimage' alt="" />
        <div className="text">
          <div style={{ display: "flex", alignItems: 'center', marginLeft: "10px" }}>
            <img src={love} className='logoforexplorepost' alt="" />
            <p style={{ marginLeft: 5 }}>{item?.item?.likes}</p>
          </div>
          <div style={{ display: "flex", alignItems: 'center', marginLeft: "10px" }}>
            <img src={comment} className='logoforexplorepost' alt="" />
            <p style={{ marginLeft: 5 }}>{item?.item?.comments}</p>
          </div>
        </div>
      </div>

      <Modal
        style={{ overlay: { backgroundColor: "#2e2b2bc7" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
        className={"modalclassNameforAPost"}
      >
        <PostDetails item={item}/>

        {/* <div className='explore-modal'>
          <div style={{ minWidth: "45%" }}>
            <img style={{ width: "100%", height: "94vh", objectFit: "cover" }} src={item?.item?.postimage} alt="" />
          </div>

          <div className='explore-post-rightside'>
            <div>
              <div className='explore-rightside-header'>
                <div className='explore-account'>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                  <div style={{}}>
                    <text>Suman</text>
                    <text>.</text>
                    <text style={{ color: "#0095f6" }}>Follow</text>
                  </div>
                </div>
                <div>
                  <img src={Moreoptions} alt="" />
                </div>
              </div>
              <hr />

              <div style={{ display: "flex", marginLeft: "10px", color: "#fff", height: "51dvh", }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", }} alt="" />
                  </div>
                  <div className='comments' style={{ marginLeft: "10px" }}>
                    <text>Suman</text>
                    <span> : </span>
                    <text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore hic blanditiis asperiores sint, delectus quam reiciendis labore.</text>
                    <p style={{}}>1d</p>
                  </div>
                </div>

              </div>

              <hr />

              <div className='explore-rightside-footer'>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', margin: "15px 0"}}>
                    <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                      <div onClick={handleLike}>
                        <img src={Like} className='logoforpost' alt="" />
                      </div>
                      <div onClick={handleShowmodal} style={{ cursor: "pointer" }}>
                        <img src={comment} className='logoforpost' alt="" />
                      </div>
                      <img src={Shareicon} className='logoforpost' alt="" />
                    </div>
                    <div>
                      <img src={Saveicon} alt="" />
                    </div>

                  </div>
                  <p style={{ fontSize: "13px"}}>147,284 likes</p>
                  <p style={{ textAlign: "start", fontSize: "11px", color: "#A8A8A8" }}>3 DAYS AGO</p>
                </div>

                <hr />
                <div className='messge-section'>
                  <div className='emoji'>
                    <img src={Emoji} alt="" width={"27"} height={"27"} />
                  </div>

                    <input style={{width: "100%"}} type="text" placeholder='Add a comment'/>
                    <input disabled="true" style={{backgroundColor: "transparent", border: "none", color: "blue", cursor: "pointer"}} type="submit" value={"Post"} />
                </div>
              </div>

            </div>
          </div>
        </div> */}

      </Modal>


    </div>
  )
}
