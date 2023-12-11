import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


import { Modal } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import SearchIcon from '@mui/icons-material/Search';


import SettingIcon from "../../../Icons/Settingslogo.png";
import Search from "../../../Icons/Search.png";
import Follow from "../../subComponent/Follow";
// import Followers from "../../subComponent/FollowerList";
import Followers from "../../subComponent/FollowerFollowingList";


const ProfileHeader = ({ own, profile, posts }) => {
    const [followerModal, setFollowerModal] = useState(false);
    const [followingModal, setFollowingModal] = useState(false);
    // const [type, setType] = useState("");

    const handleShowFollower = (status) => {
        setFollowingModal(false);
        setFollowerModal(status);
    }

    const handleShowFollowing = (status) => {
        setFollowerModal(false);
        setFollowingModal(status);
    }

    // const handleClose = () => {
    //     setFollowerModal(false);
    // }

    return (
        <>
            {profile &&
                <div className='subProfilerightbar'>
                    <div>
                        <img src={profile?.user.image} style={{ width: "150px", height: "150px", color: "white", objectFit: "cover", borderRadius: "50%" }} alt="" />
                    </div>
                    <div className="profile_header-rightside">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginLeft: "" }}> {profile?.user.username} </p>
                            {
                                own ?
                                    <Link to={"/edit/profile"} state={profile?.user} style={{ textDecoration: "none", backgroundColor: "white", color: "black", fontWeight: "600", fontSize: "15px", padding: "5px 15px", marginLeft: "20px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                                        Edit profile
                                    </Link>
                                    :
                                    <Follow profile={profile} />
                            }
                            <img src={SettingIcon} style={{ marginLeft: 20, cursor: "pointer" }} alt="" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginLeft: "" }}>{posts} Post</p>
                            <p style={{ marginLeft: 40, cursor: "pointer" }} onClick={handleShowFollower}> {profile?.follower.length} Followers </p>
                            <p style={{ marginLeft: 40, cursor: "pointer" }} onClick={handleShowFollowing}>{profile?.following.length} Following</p>
                        </div>

                        {
                            followerModal && <Followers profile={profile.follower} state={"Follower"} handleModal={handleShowFollower} />
                        }

                        {
                            followingModal && <Followers profile={profile.following} state={"Following"} handleModal={handleShowFollowing} />
                        }

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginLeft: "", marginTop: -10, fontWeight: 600 }}>User description</p>
                        </div>
                    </div>
                </div>
                // <></>
            }
        </>
    )
}


export default ProfileHeader;