import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import comment from "../../Icons/Comment.png"
import Likeicon from "../../Icons/Notifications.png"
import Unlike from "../../Icons/Unlike.png";
import Shareicon from "../../Icons/SharePost.png"
// import Saveicon from "../../Icons/Save.png"
// import Bookmark from '@mui/icons-material/Bookmark';
// import BookmarkBorder from '@mui/icons-material/BookmarkBorder';

import { handleLikeAsync } from "../Post/postSlice";


const LikeShareCommentSaved = ({ postDetails, userId }) => {
    const dispatch = useDispatch();

    const [Like, setLike] = useState({
        status: false,
        id: null,
    });
    const [saved, setSaved] = useState({
        status: false,
        id: null,
    });
    const [postId, setPostId] = useState("");
    const [message, setMessage] = useState(null);

    const handleLike = () => {
        setLike((prev) => ({
            ...prev,
            status: !Like.status,
            id: postDetails._id,
        }));
    }

    const handleSaved = () => {
        setSaved((prev) => ({
            ...prev,
            status: !saved.status,
            id: postDetails._id,
        }));
    }

    useEffect(() => {
        if (Like.id !== null) {
            dispatch(handleLikeAsync({ id: Like.id }));
        }
    }, [Like, dispatch]);


    return (
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
            <div onClick={handleLike}>
                {(postDetails?.like?.length > 0 &&
                    postDetails?.like?.some((value) => value._id === userId))
                    || Like.status === true
                    ?
                    <img src={Unlike} className='logoforpost' alt="" />
                    :
                    <img src={Likeicon} className='logoforpost' alt="" />
                }

                {/* <div> {postDetails.like.length} </div> */}

            </div>
            <div style={{ cursor: "pointer" }}>
                <img src={comment} className='logoforpost' alt="" />
            </div>
            <img src={Shareicon} className='logoforpost' alt="" />
        </div>

    )
}

export default LikeShareCommentSaved;