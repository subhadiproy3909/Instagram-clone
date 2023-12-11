import { useState } from "react"
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { Modal } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import CreatePostModal from "../modalComponent/CreatePostModal";


import Explorepost from "../ExplorePost/Explorepost";


const OwnPosts = ({ profile }) => {
    const [posts, setPosts] = useState(true);
    const [saved, setSaved] = useState(false);
    const [open, setOpen] = useState(false);

    const onClickPost = () => {
        setSaved(false);
        setPosts(true);
    }

    const onClickSaved = () => {
        setPosts(false);
        setSaved(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlePostModal = () => {
        setOpen(true)
    }

    // console.log(profile);
    return (
        <>
            <div className='post-saved-tagged'>
                <a href="#" onClick={onClickPost}>
                    <GridOnSharpIcon className='profile-icons' />
                    <p>POSTS</p>
                </a>

                <a href="#" onClick={onClickSaved}>
                    <BookmarkBorderOutlinedIcon className='profile-icons' />
                    <p>SAVED</p>
                </a>

                <a href="#">
                    <AssignmentIndOutlinedIcon className='profile-icons' />
                    <p>TAGGED</p>
                </a>
            </div>

            {posts &&
                <>
                    {profile?.posts.length !== 0 ?
                        // {map through all posts posted by logged in user}
                        <>
                            <div className='postContainerForProfile'>
                                {profile?.posts.map((item) => (
                                    <Explorepost item={item} />
                                ))}
                            </div>

                        </>
                        :
                        // {if the logged in user has no posts}
                        <>
                            <div style={{ margin: "10px 2.9rem" }}>
                                <div className='no-post'>
                                    <h3>Share photos</h3>
                                    <p>
                                        When you share photos, they will appear on your profile.
                                    </p>
                                    <button onClick={handlePostModal}>
                                        Share your first photo
                                    </button>

                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        className='modal'
                                    >
                                        <>
                                            <div onClick={handleClose} >
                                                <CloseRoundedIcon style={{ fontSize: "1.8rem" }} className="modal-close"></CloseRoundedIcon>
                                            </div>

                                            <CreatePostModal id={profile?.profile.user._id} username={profile.profile.user.username} />
                                        </>
                                    </Modal>
                                </div>
                            </div>
                            {/* <div>Empty</div> */}
                        </>
                    }
                </>
            }
        </>
    )
}

export default OwnPosts;