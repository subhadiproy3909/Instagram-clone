import Sidebar from '../../Components/Sidebar';
import Profile from '../../Components/Profile/Profile';
import { useLocation } from 'react-router-dom';


const ProfilePage = () => {
  const location = useLocation();

  const userId = location.pathname.slice(1);
  // console.log(`user profile id : ${userId}`);
  return (
    <>
      <div>
        <div className='homesubcontainer'>
          <div className='leftside'>
            <Sidebar />
          </div>

          <div className='rightside'>
            <Profile userId={userId} />
          </div>
        </div>
      </div>
    </>
  )
}


export default ProfilePage;