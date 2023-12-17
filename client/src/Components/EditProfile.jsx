import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "@mui/material";

import "./css/editProfile.css";
import { updateAccountAsync } from "../Components/Auth/authSlice";



const EditProfile = () => {
    const dispatch = useDispatch();

    const inputRef = useRef(null);
    const { state } = useLocation();

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(state.bio.length);
    const [pic, setPic] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prevCount, setPrevCount] = useState(0);
    const [editProfile, setEditprofile] = useState({
        bio: state.bio,
        gender: state.gender,
        showAccount: state.showAccount,
    });
    const [submit, setSubmit] = useState(null);

    const handleClose = () => {
        setOpen(false);
    }

    const handlePic = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setPic(e.target.files[0]);
        setActive(true);
    }

    const handleOpenModal = () => {
        setOpen(true);
    }
    // console.log(state);

    const handleEditProfile = (e) => {
        setActive(true)
        if (e.target.name == "bio" && e.target.value.length <= 150) {
            setEditprofile((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
            setCount(e.target.value.length);
        }
        else if (e.target.name === "gender") {
            setEditprofile((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }))
        }
        else if (e.target.name == "showAccount") {
            setEditprofile((prev) => ({
                ...prev,
                [e.target.name]: !editProfile.showAccount,
            }))
        }
        else {
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
        const fd = new FormData();
        const file = pic;
        fd.append("file", file);
        fd.append("body", JSON.stringify(editProfile));
        console.log(fd.get("file"));
        setSubmit(fd);
    }

    useEffect(() => {
        if (submit !== null) {
            dispatch(updateAccountAsync(submit));
        }
    }, [submit, dispatch]);

    console.log(state);

    return (
        <div className="edit-profile">
            <p>Edit Profile</p>

            <div className="profile_section">

                <div style={{ gap: "2rem" }} className="profile-photo">
                    <div className="profile_section-leftside">
                        <img src={preview ? preview : state.image} alt="#" width={50} height={50} />
                    </div>
                    <div className="profile_section-rightside">
                        <span> {state.username} </span>
                        <input ref={inputRef} type="file" name="pic" accept="image/*" onChange={handlePic} hidden />
                        <span style={{ color: "blue", cursor: "pointer" }} onClick={handleProfilePhoto}>Change profile photo</span>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside className="profile_section-leftside">Website</aside>
                    <div style={{ display: "flex", flexDirection: "column", }} className="profile_section-rightside">
                        <input style={{ padding: "8px", cursor: "no-drop" }} type="text" placeholder="Website" disabled />
                        <small style={{ fontSize: "12px", color: "gray" }}>
                            Editing your link i sonly avaliable on mobile.
                            Visit the Instagram app and edit your profile
                            to change the websites in your bio
                        </small>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside className="profile_section-leftside">Bio</aside>
                    <div className="profile_section-rightside">
                        <textarea style={{ backgroundColor: "transparent", color: "white" }}
                            name="bio" id="bio" cols="20" rows="4" value={editProfile.bio} onChange={handleEditProfile}></textarea>
                        <small><span> {count} </span>/150</small>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside className="profile_section-leftside">Gender</aside>
                    <div className="profile_section-rightside">
                        <select
                            name="gender" id="gender" value={editProfile.gender} defaultValue={""}
                            onChange={handleEditProfile}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="">Prefer not to say</option>
                        </select>
                    </div>
                </div>

                <div style={{ gap: "2rem" }}>
                    <aside style={{ textAlign: "end" }} className="profile_section-leftside">Show account suggestions on profiles</aside>
                    <div style={{ flexDirection: "row" }} className="profile_section-rightside">
                        <input
                            type="checkbox"
                            name="showAccount"
                            value={editProfile.showAccount}
                            checked={editProfile.showAccount === true ? "checked" : ""}
                            style={{ color: "transparent", cursor: "pointer" }}
                            onChange={handleEditProfile}
                        />
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
                        <input className="update-profile-button"
                            type="submit" value={"Submit"}
                            onClick={handleSubmit} disabled={active === true ? "" : "disabled"} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditProfile;