import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "@mui/material";

import "./css/editProfile.css";



const EditProfile = () => {
    const inputRef = useRef(null);
    const { state } = useLocation();
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [editProfile, setEditprofile] = useState({
        website: null,
        bio: "",
        gender: "",
        showAccount: false,
    })

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpenModal = () => {
        setOpen(true);
    }
    // console.log(state);

    const handleEditProfile = (e) => {
        if(e.target.name == "bio" && e.target.value <= 150){
            console.log(e.target.value);
            setEditprofile((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
            setCount((prev) => prev + 1);
        }
        else{
            setEditprofile((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
        }
    }

    const handleProfilePhoto = () => {
        inputRef.current.click();
    }

    const handleSubmit = () => {

    }

    return (
        <div className="edit-profile">
            <p>Edit Profile</p>

            <div className="profile_section">

                <div style={{ gap: "2rem" }} className="profile-photo">
                    <div className="profile_section-rightside">
                        <img src={state.image} alt="#" width={50} height={50} />
                    </div>
                    <div className="profile_section-leftside">
                        <span> {state.username} </span>
                        <input ref={inputRef} type="file" hidden />
                        <span style={{ color: "blue", cursor: "pointer" }} onClick={handleProfilePhoto}>Change profile photo</span>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside className="profile_section-rightside">Website</aside>
                    <div style={{ display: "flex", flexDirection: "column", }} className="profile_section-leftside">
                        <input style={{ padding: "8px", cursor: "no-drop" }} type="text" placeholder="Website" disabled />
                        <small style={{ fontSize: "12px", color: "gray" }}>
                            Editing your link i sonly avaliable on mobile.
                            Visit the Instagram app and edit your profile
                            to change the websites in your bio
                        </small>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside className="profile_section-rightside">Bio</aside>
                    <div className="profile_section-leftside">
                        <textarea style={{ backgroundColor: "transparent", color: "white" }} name="bio" id="bio" cols="20" rows="4" onChange={handleEditProfile}></textarea>
                        <small><span> {count} </span>/150</small>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside className="profile_section-rightside">Gender</aside>
                    <div className="profile_section-leftside">
                        <input disabled type="text" onClick={handleOpenModal} value={"Prefer not to say"} style={{ padding: "8px", borderRadius: "5px", backgroundColor: "transparent", border: "1px solid white", color: "white" }} />
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside style={{ textAlign: "end" }} className="profile_section-rightside">Show account suggestions on profiles</aside>
                    <div style={{ flexDirection: "row" }} className="profile_section-leftside">
                        <input type="checkbox" style={{ color: "transparent", cursor: "pointer" }} />
                        <span>
                            Choose whether people cna see similaraccount suggestions on your profile,
                            and whether your account can be suggested on other profiles.
                        </span>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside>
                        <input style={{ opacity: 0 }} type="text" className="profile_section-rightside" />
                    </aside>
                    <div>
                        <input 
                            style={{ cursor: "pointer", padding: "10px 15px", fontSize: "14px", fontWeight: "600", backgroundColor: "blue", 
                            color: "white", borderRadius: "10px", border: "none" }} type="submit" value={"Submit"}
                            onClick={handleSubmit}  />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditProfile;