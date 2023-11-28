import React, { useState } from 'react'
import "./sidebar.css"
import Homeicon from "../../Icons/home.png";
import SearchIcon from "../../Icons/Search.png"
import Exploreicon from "../../Icons/Explore.png"
import Reels from "../../Icons/Reels.png"
import Messages from "../../Icons/Messenger.png"
import Notifications from "../../Icons/Notifications.png"
import createicon from "../../Icons/New post.png"
import Instragramicon from "../../Icons/Instagram.png"
import More from "../../Icons/Settings.png"
import Iconsfromcreatemodal from "../../Icons/Icon to represent media such as images or videos.png";
import InstagramIcon from "../../Icons/Instagramlogo.png"
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import { Profiledata } from '../data';
export default function Sidebar() {

    const [modalIsOpen, setmodalIsOpen] = useState(false);
    const handleShowmodal = () => {
        setmodalIsOpen(true)
    }

    const [file, setFile] = useState(null);
    const [imagepre, setImagePre] = useState(null);

    const [ShowSearch, setShowSearch] = useState(true);

    const toggleSeachText = () => {
        setShowSearch(!ShowSearch);
    }

    return (
        <>
            <div className='mainsidebar'>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setmodalIsOpen(false)}
                    style={{ overlay: { backgroundColor: "#2e2b2bc7" } }}
                    className={"modalclassNameforAPost"}>
                    <div style={{ flex: 1, height: "70vh" }}>
                        {imagepre == null ?

                            <div >
                                <p style={{ display: 'flex', alignItems: "center", margin: 'auto', justifyContent: 'center', fontWeight: 600, marginTop: -10 }}>Create new post</p>
                                <div style={{ display: 'flex', alignItems: "center", margin: 'auto', justifyContent: 'center', marginTop: -10 }}>
                                    <div style={{ marginTop: 240, marginLeft: 100 }}>
                                        <img src={Iconsfromcreatemodal} style={{ marginLeft: 30 }} alt='' />
                                        <p style={{ fontWeight: "600", marginLeft: "-40px", fontSize: 18 }}>Drag photos and videos here</p>
                                        <label htmlFor="file">
                                            <div style={{ backgroundColor: "#0095F6", paddingLeft: 25, marginLeft: -20, borderRadius: 4 }}>
                                                <p style={{ paddingTop: "6px", paddingBottom: "7px" }}>Select from computer</p>
                                            </div>
                                            <input type="file" name="file" id='file' accept='image/*' onChange={(e) => [setFile(e.target?.files[0]), setImagePre(URL.createObjectURL(e.target.files[0]))]} style={{ display: "none" }} />
                                        </label>

                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div style={{ display: "flex" }}>
                                    <img src={imagepre} style={{ width: "60%", height: "60vh", objectFit: "cover" }} alt='' />
                                    <div style={{ marginLeft: 20, width: "40%" }}>
                                        <div style={{ display: 'flex', alignItems: "center" }}>
                                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQATOWAXKfh8Bt6g6wp2nobJIWLTX5PQqcp3Q&usqp=CAU' style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} alt='' />
                                            <p style={{ marginLeft: 10, fontWeight: 600, fontSize: 16 }}>madan khadka</p>
                                        </div>
                                        <textarea type='text' name='text' id='text' placeholder='Write a status for post' className='textinputforpost' />
                                        <button className='createpost'>Post</button>
                                    </div>
                                </div>
                            </div>}



                    </div>
                </Modal>


                <div>

                    <div style={{ display: 'flex', marginTop: "45px", marginLeft: "20px" }}>
                        {ShowSearch == false ? <img src={InstagramIcon} alt='' className='logos' /> : <img src={Instragramicon} alt='' className='logos' />}
                    </div>
                    <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "40px", cursor: 'pointer', marginLeft: "20px" }}>
                            <img src={Homeicon} alt='' className='logos' />
                            {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    Home
                                </li>
                            </ui>}
                        </div>
                    </Link>

                    <div style={{ display: "flex", alignItems: "center", marginTop: "28px", cursor: 'pointer', marginLeft: "20px" }} onClick={toggleSeachText}>
                        <img src={SearchIcon} alt='' className='logos' />
                        {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Search
                            </li>
                        </ui>}
                    </div>

                    <Link to={"/Explore"} style={{textDecoration: "none"}}>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "28px", cursor: 'pointer', marginLeft: "20px" }}>
                            <img src={Exploreicon} alt='' className='logos' />
                            {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    Explore
                                </li>
                            </ui>}
                        </div>
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "28px", cursor: 'pointer', marginLeft: "20px" }}>
                        <img src={Reels} alt='' className='logos' />
                        {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Reels
                            </li>
                        </ui>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "28px", cursor: 'pointer', marginLeft: "20px" }}>
                        <img src={Messages} alt='' className='logos' />
                        {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Messages
                            </li>
                        </ui>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "28px", cursor: 'pointer', marginLeft: "20px" }}>
                        <img src={Notifications} alt='' className='logos' />
                        {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Notifications
                            </li>
                        </ui>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "28px", cursor: 'pointer', marginLeft: "20px" }} onClick={handleShowmodal}>
                        <img src={createicon} alt='' className='logos' />
                        {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                            <li className='listtext'>
                                Create
                            </li>
                        </ui>}
                    </div>
                    <Link to={"/username"}>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "28px", marginLeft: "20px", cursor: 'pointer', }}>
                            <img src={"https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"} alt='' className='profileicon' />
                            {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    Profile
                                </li>
                            </ui>}
                        </div>
                    </Link>

                    <div className='moreicon'>
                        <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
                            <img src={More} alt='' className='profileicon' />
                            {ShowSearch && <ui style={{ marginLeft: "20px" }}>
                                <li className='listtext'>
                                    More
                                </li>
                            </ui>}
                        </div>
                    </div>
                </div>

            </div>

            {!ShowSearch &&
                <div className='searchBox' style={{}}>
                    <p style={{ color: "white", fontWeight: 600, fontSize: 27, marginLeft: 10, marginTop: 35 }}>Search</p>
                    <div style={{ display: 'flex', alignContent: "center", backgroundColor: "rgb(38, 38, 38)", padding: "1rem", borderRadius: "10px", margin: "1rem 1rem", }}>
                        <img src={SearchIcon} style={{ width: 15, height: 15, marginTop: 0 }} alt='' />
                        <input className='showsearchinput' placeholder='Search' name='text' />
                    </div>
                    <hr />
                    <div className='search-result-list'>

                        {Profiledata?.map((item) => (
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 14, marginTop: 0, cursor: "pointer" }}>
                                <img src={item.profile} style={{ width: "45px", objectFit: "cover", height: "45px", borderRadius: "50%", marginTop: "10px" }} alt='' />
                                <div style={{ marginLeft: 10 }}>
                                    <text style={{ fontSize: 14, padding: 0, color: "#A8A8A8" }}>{item.name}</text>
                                    <article style={{ color: "#A8A8A8" }}>{item.email}</article>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            }
        </>
    )
}
