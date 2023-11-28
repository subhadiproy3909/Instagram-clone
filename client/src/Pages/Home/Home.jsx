import React from 'react'
import "./home.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import Rightbar from '../../Components/Rightbar/Rightbar'
export default function Home() {
    return (
        <>
            <div className='homesubcontainer'>
                <div className='leftside'>
                    <Sidebar />
                    {/* <div>dsfasd</div> */}
                </div>
                <div className='rightside'>
                    <Rightbar />
                    {/* <div>sdfsaf</div> */}
                </div>
            </div>
        </>
    )
}
