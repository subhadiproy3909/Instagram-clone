import { useSelector } from "react-redux";

import UserLoading from "./UserLoading"
import Follow from "./subComponent/Follow"
import { selectFollowSuggestion } from "./Profile/profileSlice"
import { Link } from "react-router-dom";



const Suggestion = () => {

    const followSuggestion = useSelector(selectFollowSuggestion);

    return (
        <>
            {
                followSuggestion.length > 0 ?
                    <>
                        {
                            followSuggestion.map((profile) => (
                                <div style={{ display: "flex", alignItems: "center", marginLeft: 10, marginTop: 10 }}>
                                    <Link to={`/${profile.user.username}`} state={profile.user._id}>
                                        <img src={profile.user.image}
                                            style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} alt=""
                                        />
                                    </Link>
                                    <div style={{ display: "flex", flexDirection: "column", }}>
                                        <Link to={`/${profile.user.username}`} state={profile.user._id}
                                            style={{ marginLeft: 10, textAlign: "start", color: "white", textDecoration: "none", }}>
                                            {profile.user.username}
                                        </Link>
                                        <p style={{ marginTop: 0, color: "#A8A8A8", marginLeft: 10, fontSize: 12 }}>Suggested for you</p>
                                    </div>
                                    <div style={{ marginLeft: "90px", cursor: "pointer", fontSize: "14px" }}>
                                        {/* <p style={{ color: "#0095f6", fontSize: 13 }}>Follow</p> */}
                                        <Follow fromPost={true} profile={profile} />
                                    </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <>
                        <UserLoading />
                    </>
            }
        </>
    )
}


export default Suggestion;