import React from 'react'
import "./profile.css"
import Sidebar from '../../Components/Sidebar/Sidebar'

import Explorepost from '../../Components/ExplorePost/Explorepost'
import ProfileHeader from '../../Components/Profile/component/ProfileHeader'
import { PostExplore } from '../../Components/data'
export default function Profile() {
  return (
    <div>
      <div>
        <div className='homesubcontainer'>
          <div className='leftside'>
            <Sidebar />
          </div>


          <div className='rightside'>
            <ProfileHeader />


            <hr style={{ color: "#fff", width: "90%", marginTop: "100px" }} />
            <div className='postContainerForProfile'>
              {PostExplore.map((item) => (
                <Explorepost item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
