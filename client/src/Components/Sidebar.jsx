import React, { useState, useRef, useEffect } from 'react'
import "./css/sidebar.css"
import Homeicon from "../Icons/home.png";
import SearchIcon from "../Icons/Search.png"
import Exploreicon from "../Icons/Explore.png"
import Reels from "../Icons/Reels.png"
import Messages from "../Icons/Messenger.png"
import Notifications from "../Icons/Notifications.png"
import createicon from "../Icons/New post.png"
import Instragramicon from "../Icons/Instagram.png"
import More from "../Icons/Settings.png"
import InstagramIcon from "../Icons/Instagramlogo.png"
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch, useSelector } from "react-redux";
import { searchUserAsync, selectSearchUser } from "./Sidebar/sidebarSlice"
import { selectLoggedInUser } from "./Auth/authSlice";

import CreatePostModal from './modalComponent/CreatePostModal';

export default function Sidebar() {
    const dispatch = useDispatch();

    const searchResult = useSelector(selectSearchUser);
    const loggedUser = useSelector(selectLoggedInUser);

    const inputRef = useRef(null);
    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const [ShowSearch, setShowSearch] = useState(true);
    const [search, setSearch] = useState("");


    const handleShowmodal = () => {
        setmodalIsOpen(true)
    }

    const handleSelectFile = () => {
        inputRef.current.click();
    }

    const handleClose = () => {
        setmodalIsOpen(false)
    }


    const toggleSeachText = () => {
        setShowSearch(!ShowSearch);
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value;

        setSearch(searchValue);
    }

    useEffect(() => {
        dispatch(searchUserAsync(search));
    }, [search, dispatch]);


    return (
        <>
            <div className='mainsidebar'>

                <Modal
                    open={modalIsOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='modal'
                >
                    <>
                        <div onClick={handleClose} >
                            <CloseRoundedIcon style={{ fontSize: "1.8rem" }} className="modal-close"></CloseRoundedIcon>
                        </div>
                        <CreatePostModal />
                        {/* <div className='modal-container'>
                            <p className='modal_container-heading' id="modal-modal-title" style={{ textAlign: "center" }}>
                                Create new post
                            </p>

                            <div className='modal_container-body'>

                                <div>
                                    <img src={Iconsfromcreatemodal} alt="Iconsfromcreatemodal" />
                                </div>

                                <p id="modal-modal-description" sx={{ mt: 2 }}>
                                    Drag photos and videos here
                                </p>

                                <input ref={inputRef} type="file" hidden />
                                <button onClick={handleSelectFile} id="selectFile">
                                    Select From Computer
                                </button>
                            </div>
                        </div> */}
                    </>
                </Modal>


                <div>

                    <div className='sidebar-brand-icon'>
                        {ShowSearch == false ? <img src={InstagramIcon} alt='' className='logos' /> : <img src={Instragramicon} alt='' className='logos' />}
                    </div>
                    <Link className='routerdom-link' to={"/"} style={{ textDecoration: "none", color: "white" }}>
                        <div className='sidebar-icons'>
                            <img src={Homeicon} alt='' className='logos' />
                            {ShowSearch && <div style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    Home
                                </li>
                            </div>}
                        </div>
                    </Link>

                    <div className='sidebar-icons' onClick={toggleSeachText}>
                        <img src={SearchIcon} alt='' className='logos' />
                        {ShowSearch && <div style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Search
                            </li>
                        </div>}
                    </div>

                    <Link className='routerdom-link' to={"/Explore"} style={{ textDecoration: "none" }}>
                        <div className='sidebar-icons'>
                            <img src={Exploreicon} alt='' className='logos' />
                            {ShowSearch && <div style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    Explore
                                </li>
                            </div>}
                        </div>
                    </Link>
                    <div className='sidebar-icons'>
                        <img src={Reels} alt='' className='logos' />
                        {ShowSearch && <div style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Reels
                            </li>
                        </div>}
                    </div>

                    <div className='sidebar-icons'>
                        <img src={Messages} alt='' className='logos' />
                        {ShowSearch && <div style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Messages
                            </li>
                        </div>}
                    </div>
                    <div className='sidebar-icons'>
                        <img src={Notifications} alt='' className='logos' />
                        {ShowSearch && <div style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Notifications
                            </li>
                        </div>}
                    </div>
                    <div className='sidebar-icons' onClick={handleShowmodal}>
                        <img src={createicon} alt='' className='logos' />
                        {ShowSearch && <div style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Create
                            </li>
                        </div>}
                    </div>
                    
                    <Link className='routerdom-link' to={`/${loggedUser.id}`}>
                        <div className='sidebar-icons'>
                            <img src={loggedUser.image} alt='' className='profileicon' />
                            {ShowSearch && <div style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    Profile
                                </li>
                            </div>}
                        </div>
                    </Link>

                    <div className='moreicon'>
                        <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                            <img src={More} alt='' className='profileicon' />
                            {ShowSearch && <div style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    More
                                </li>
                            </div>}
                        </div>
                    </div>
                </div>

            </div>

            {!ShowSearch &&
                <div className='searchBox' style={{}}>
                    <p style={{ color: "white", fontWeight: 600, fontSize: 27, marginLeft: 10, marginTop: 35 }}>Search</p>
                    <div style={{ display: 'flex', alignContent: "center", backgroundColor: "rgb(38, 38, 38)", padding: "1rem", borderRadius: "10px", margin: "1rem 1rem", }}>
                        <img src={SearchIcon} style={{ width: 15, height: 15, marginTop: 0 }} alt='' />
                        <input className='showsearchinput' placeholder='Search' name='text' onChange={handleSearch} autoComplete='off' />
                    </div>
                    <hr />
                    <div className='search-result-list'>

                        {searchResult.length !== 0 ? searchResult.map((item) => (
                            <Link className='routerdom-link' key={item._id} to={`/${item._id}`}>
                                <div className='searched_user-list'>
                                    <img src={item.image} style={{ width: "50px", objectFit: "cover", height: "45px", borderRadius: "50%", marginTop: "" }} alt='' />
                                    <div style={{ marginLeft: 10 }}>
                                        <text style={{ fontSize: 14, padding: 0, color: "#A8A8A8" }}>{item.username}</text>
                                        <article style={{ color: "#A8A8A8" }}>{item.fullname}</article>
                                    </div>
                                </div>
                            </Link>
                        )) : <></>}
                    </div>
                </div>
            }
        </>
    )
}
