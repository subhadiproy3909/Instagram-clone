import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from "react";
import UserLoading from "../UserLoading";




const Followers = ({ profile, state, handleModal }) => {
    const [openModal, setOpenModal] = useState(true);

    const handleClose = () => {
        // return setOpenModal(false);
        return handleModal(false);
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modal'
        >
            <div className="modal-follow-container">
                <div className="modal-follow-container-header">
                    <span></span>
                    <p> {state} </p>
                    <div onClick={handleClose}>
                        <CloseRoundedIcon style={{ fontSize: "28px", cursor: "pointer" }} />
                    </div>
                </div>

                    <div className="search-bar-follow">
                        <input type="search" className="search-input" placeholder="Search" />
                    </div>
                <div className="modal-follow-container-body">

                    <div className="list-of-user">
                        {
                            profile.length > 0 ?
                                <>
                                    {
                                        profile.map(user => (
                                            <div
                                                style={{
                                                    width: "100%", display: "flex",
                                                    justifyContent: "space-between", alignItems: "center", margin: ".3rem .9rem"
                                                }}
                                            >
                                                <div className='follow-user'>
                                                    <Link to={`/${user.username}`} state={user._id} onClick={handleClose}>
                                                        <img src={user.image} style={{ width: "50px", objectFit: "cover", height: "45px", borderRadius: "50%", marginTop: "" }} alt='' />
                                                    </Link>
                                                    <div style={{ marginLeft: 10 }}>
                                                        <Link to={`/${user._id}`} state={user._id} onClick={handleClose}>
                                                            <p style={{ fontSize: 14, color: "#A8A8A8" }}> {user.username} </p>
                                                        </Link>
                                                        <p style={{ color: "#A8A8A8" }}>{user.fullname}</p>
                                                    </div>

                                                </div>
                                                <div >
                                                    <button className="Remove-btn">Remove</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>

                                :
                                // <div>sjidf</div>
                                <div style={{width: "100%",  margin: ".3rem .9rem", }}>
                                    <UserLoading />
                                </div>
                        }

                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default Followers;