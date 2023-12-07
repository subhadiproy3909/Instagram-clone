import EditProfile from "../../Components/EditProfile";
import Sidebar from "../../Components/Sidebar/Sidebar";



const EditProfilePage = () => {
    return (
        <>
            <div className='homesubcontainer'>
                <div className='leftside'>
                    <Sidebar />
                </div>
                <div className='rightside'>
                    <EditProfile />
                </div>
            </div>
        </>
    )
}


export default EditProfilePage;