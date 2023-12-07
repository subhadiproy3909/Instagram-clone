import { Link } from "react-router-dom";
import SettingIcon from "../../../Icons/Settingslogo.png";




const ProfileHeader = ({ own, profile, posts }) => {


    // console.log(profile);
    return (
        <>
            {profile &&
                <div className='subProfilerightbar'>
                    <div>
                        <img src={profile.user.image} style={{ width: "150px", height: "150px", color: "white", objectFit: "cover", borderRadius: "50%" }} alt="" />
                    </div>
                    <div className="profile_header-rightside">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginLeft: "" }}> {profile.user.username} </p>
                            <Link to={"/edit/profile"} state={profile.user} style={{ textDecoration: "none", backgroundColor: "white", color: "black", fontWeight: "600", fontSize: "15px", padding: "5px 15px", marginLeft: "20px", borderRadius: 10, border: "none", cursor: "pointer" }}>
                                {own ? <> Edit profile</> : <> Follow </>}
                            </Link>
                            <img src={SettingIcon} style={{ marginLeft: 20, cursor: "pointer" }} alt="" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginLeft: "" }}>{posts} Post</p>
                            <p style={{ marginLeft: 40 }}> {profile.follower.length} Followers </p>
                            <p style={{ marginLeft: 40 }}>{profile.following.length} Following</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ marginLeft: "", marginTop: -10, fontWeight: 600 }}>User description</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default ProfileHeader;