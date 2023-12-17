import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";


import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import { updateSavedPostAsync } from "../Profile/profileSlice";

const SavedPost = ({ profileDetails, item }) => {
    const dispatch = useDispatch();

    const [saved, setSaved] = useState({
        status: false,
        id: null,
    });

    const handleSaved = () => {
        setSaved((prev) => ({
            ...prev,
            status: !saved.status,
            id: item,
        }));
    }

    useEffect(() => {
        if (saved.id !== null) {
            dispatch(updateSavedPostAsync({ id: saved.id }))
        }
    }, [saved, dispatch]);

    return (
        <div style={{ cursor: "pointer" }} onClick={handleSaved}>

            {saved.status === true || (profileDetails?.profile.savedPost.length > 0 &&
                profileDetails?.profile.savedPost.some((post) => item === post._id))
                
                ?
                <Bookmark />
                :
                <BookmarkBorder />
            }
        </div>
    )
}


export default SavedPost;