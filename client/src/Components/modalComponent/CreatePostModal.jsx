import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Iconsfromcreatemodal from "../../Icons/Icon to represent media such as images or videos.png";
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import "./css/create_post_modal.css";
import { createPostAsync } from "../Post/postSlice";


const CreatePostModal = ({ id, username }) => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const date = new Date();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    

    const [uploadImage, setUploadImage] = useState(null);
    const [shareFile, setShareFile] = useState(null);
    const [fileData, setFileData] = useState({});
    const [sharePost, setSharePost] = useState(null);
    const [caption, setCaption] = useState(`${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`);

    const handleOpenFileExplorer = () => {
        inputRef.current.click();
    }

    const handleSelectFile = (e) => {
        setFileData(e.target.files[0]);
        setUploadImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleBackToCreatePost = () => {
        setUploadImage(null);
    }

    const handleSendToSharePost = () => {
        setShareFile(uploadImage);
    }

    const handleBackToCropPost = () => {
        setShareFile(null);
    }

    const handlCaption = (e) => {
        setCaption(e.target.value);
    }

    const handleSharePost = () => {
        const fd = new FormData();
        fd.append("file", fileData);
        fd.append("caption", JSON.stringify(caption));
        console.log(fd.get("file"));
        setSharePost(fd);
    }

    useEffect(() => {
        if (sharePost !== null) {
            dispatch(createPostAsync(sharePost));
            setShareFile(null)
            setUploadImage(null);
        }
    }, [sharePost, dispatch])

    return (
        <>
            {uploadImage === null ?
                <div className='modal-container'>
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

                        <form>
                            <input ref={inputRef} type="file" onChange={handleSelectFile} hidden />
                        </form>
                        <button onClick={handleOpenFileExplorer} id="selectFile">
                            Select From Computer
                        </button>
                    </div>
                </div>
                :
                <>
                    {shareFile === null ?
                        <div className='modal-container'>
                            <div className='modal_container-heading-preview' id="modal-modal-title" style={{ textAlign: "center" }}>
                                <p onClick={handleBackToCreatePost}> <WestRoundedIcon /> </p>
                                <p>Preview</p>
                                <p onClick={handleSendToSharePost}>Next</p>
                            </div>


                            <div className='modal_container-body'>

                                <div className='modal-container_body-file'>
                                    <img src={uploadImage} />
                                </div>

                            </div>
                        </div>
                        :
                        <>
                            <div style={{ width: "730px" }} className='modal-container'>
                                <div className='modal_container-heading-preview' id="modal-modal-title">
                                    <p onClick={handleBackToCropPost}> <WestRoundedIcon /> </p>
                                    <p>Create new post</p>
                                    <p onClick={handleSharePost}>Share</p>
                                </div>


                                <div className='modal_container-body-share'>

                                    <div className='modal-container_body-share_file'>
                                        <img src={shareFile} />
                                    </div>

                                    <div className="modal-container_body-share_desc">
                                        <div className="profile_desc">
                                            <div>
                                                {/* <img src="" alt="" /> */}
                                                <SentimentSatisfiedRoundedIcon />
                                            </div>
                                            <div>
                                                Subhadip
                                            </div>
                                        </div>

                                        <textarea className="textarea" placeholder="Write a caption" name="addCaption" id="addCaption" cols="30" rows="9" onChange={handlCaption}></textarea>

                                        <div className="modal-container_body-share_footer_list">
                                            <SentimentSatisfiedRoundedIcon />
                                            <div>
                                                numberOfWords
                                            </div>
                                        </div>

                                        <div className="modal-container_body-share_footer_list">
                                            <div>
                                                <input style={{ backgroundColor: "transparent", border: "none" }} type="text" placeholder="Add Locatin" />
                                            </div>
                                            <LocationOnOutlinedIcon />
                                        </div>
                                        <div className="modal-container_body-share_footer_list">
                                            <div>
                                                Accessiblity
                                            </div>
                                            <KeyboardArrowDownRoundedIcon />
                                        </div>
                                        {/* <div></div> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}


export default CreatePostModal;