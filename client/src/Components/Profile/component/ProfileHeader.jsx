import SettingIcon from "../../../Icons/Settingslogo.png";



const ProfileHeader = () => {
    return (
        <div className='subProfilerightbar'>
            <div>
                <img src="https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=" style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }} alt="" />
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: 100 }}>Madankd</p>
                    <button style={{ paddingLeft: 10, marginLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, borderRadius: 10, border: "none", cursor: "pointer" }}>Edit profile</button>
                    <img src={SettingIcon} style={{ marginLeft: 20, cursor: "pointer" }} alt="" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: 100 }}>1 Post</p>
                    <p style={{ marginLeft: 40 }}>200k Followers</p>
                    <p style={{ marginLeft: 40 }}>10k Following</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginLeft: 100, marginTop: -10, fontWeight: 600 }}>User description</p>
                </div>
            </div>
        </div>
    )
}


export default ProfileHeader;