import { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';



import { updateFollowingAsync, selectProfileDetails } from "../Profile/profileSlice";
import { selectLoggedInUser } from "../Auth/authSlice";


const Follow = ({ fromPost, profile }) => {

    const dispatch = useDispatch();

    const [follow, setFollow] = useState({
        status: false,       // status : false or true;
        id: null,
    });

    const handleFollow = (e) => {
        setFollow((prev) => ({
            ...prev,
            status: !follow.status,
            id: profile.user._id,
        }));
    }

    const handleUnfollow = () => {
        setFollow((prev) => ({
            ...prev,
            status: !follow.status,
            id: profile.user._id,
        }))
    }

    useEffect(() => {
        if (follow.id !== null) {
            dispatch(updateFollowingAsync({ id: follow.id }));
        }
    }, [follow, dispatch]);

    const user = useSelector(selectLoggedInUser);
    console.log(profile);
    return (

        <>
            {
                (profile.follower.length > 0 && profile.follower.some((value) => value._id === user.id))
                    ?
                    <>
                        {
                            fromPost !== undefined
                                ?
                                <>
                                    {/* <FiberManualRecordIcon style={{ fontSize: "6px" }} /> */}
                                    <text style={{ color: "#a1afbd", fontSize: "12px" }}
                                        onClick={handleFollow}
                                    >
                                        Following
                                    </text>
                                </>
                                :
                                <button style={{
                                    textDecoration: "none", backgroundColor: "transparent", color: "white",
                                    fontWeight: "600", fontSize: "15px", padding: "5px 15px", marginLeft: "20px",
                                    borderRadius: 10, border: "none", cursor: "pointer"
                                }}
                                    onClick={handleFollow}
                                >
                                    Following
                                </button>

                        }
                    </>
                    :
                    <>
                        {
                            fromPost !== undefined
                                ?
                                <>
                                    <FiberManualRecordIcon style={{ fontSize: "6px" }} />
                                    <text style={{ color: "#0095f6" }}
                                        onClick={handleUnfollow}
                                    >
                                        Follow
                                    </text>
                                </>
                                :
                                <>
                                    <button
                                        style={{
                                            textDecoration: "none", backgroundColor: "white", color: "black",
                                            fontWeight: "600", fontSize: "15px", padding: "5px 15px", marginLeft: "20px",
                                            borderRadius: 10, border: "none", cursor: "pointer"
                                        }}
                                        onClick={handleUnfollow}
                                    >
                                        Follow
                                    </button>
                                </>

                        }
                    </>

            }
        </>
    )
}

export default Follow;