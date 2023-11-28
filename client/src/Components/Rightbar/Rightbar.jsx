import React from 'react'
import "./rightbar.css"
import Post from '../Post/Post'
import { PostExplore } from '../data'
export default function Rightbar() {
  return (
    <div className='MainRigntBar'>
      <div className='submainrightbar'>

        <div style={{}}>
          {PostExplore.map((item) => (
            <Post item={item} />
          ))}
        </div>

        <div>
          <div style={{ marginRight: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 0, cursor: "pointer" }}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
              <div style={{ marginLeft: 10 }}>
                <p style={{ textAlign: 'start' }}>Sumank9787</p>
                <p style={{ marginTop: -15, textAlign: 'start', color: "#A8A8A8" }}>Suman khadka</p>
              </div>
              <div style={{ marginLeft: "100px", cursor: "pointer" }}>
                <p style={{ color: "#0095f6", fontSize: 15, fontWeight: "500" }}>Switch</p>
              </div>
            </div>

            <div style={{ display: "flex"}}>
              <div>
                <p style={{ color: "#A8A8A8", textAlign: 'start' }}>Sugggested for you</p>
                <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: -20 }}>
                  <img src="https://cdn.britannica.com/45/223045-050-A6453D5D/Telsa-CEO-Elon-Musk-2014.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />

                  <div>
                    <p style={{ marginLeft: 10, textAlign: "start" }}>Elon</p>
                    <p style={{ marginTop: -14, color: "#A8A8A8", marginLeft: 10 }}>Follow you</p>
                  </div>
                  <div style={{ marginLeft: "90px", cursor: "pointer" }}>
                    <p style={{ color: "#0095f6" }}>Follow</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: -20 }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmw7aR4yLNQc85YL1r5VptLhSr-fx-gsMgVjyLrtUTYV9AxkfF-__pzCNu50pWZ8-m2dw&usqp=CAU" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                  <div>
                    <p style={{ marginLeft: 10, textAlign: "start" }}>Bil G</p>
                    <p style={{ marginTop: -14, color: "#A8A8A8", marginLeft: 10 }}>Follow you</p>
                  </div>
                  <div style={{ marginLeft: "90px", cursor: "pointer" }}>
                    <p style={{ color: "#0095f6" }}>Follow</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: -20 }}>
                  <img src="https://cdn.geekwire.com/wp-content/uploads/2023/05/bigstock-Jeff-Bezos-and-Lauren-Sanchez-438960968.jpeg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                  <div>
                    <p style={{ marginLeft: 10, textAlign: "start" }}>Jeff</p>
                    <p style={{ marginTop: -14, color: "#A8A8A8", marginLeft: 10 }}>Follow you</p>
                  </div>
                  <div style={{ marginLeft: "90px", cursor: "pointer" }}>
                    <p style={{ color: "#0095f6" }}>Follow</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: -20 }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVIYDt6bSnhK21l1e1eGY0FnEBcTkTYeyEgEL53gv&s" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                  <div>
                    <p style={{ marginLeft: 10, textAlign: "start" }}>everyone</p>
                    <p style={{ marginTop: -14, color: "#A8A8A8", marginLeft: 10 }}>Follow you</p>
                  </div>
                  <div style={{ marginLeft: "90px", cursor: "pointer" }}>
                    <p style={{ color: "#0095f6" }}>Follow</p>
                  </div>
                </div>


                <div style={{ display: "flex", alignItems: "center", marginLeft: 20, marginTop: -20 }}>
                  <img src="https://images.gamewatcherstatic.com/image/file/1/82/120641/Stray-Doc_s-Lab-Weapon-Location-2.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} alt="" />
                  <div>
                    <p style={{ marginLeft: 10, textAlign: "start" }}>Lilmiquela</p>
                    <p style={{ marginTop: -14, color: "#A8A8A8", marginLeft: 10 }}>Follow you</p>
                  </div>
                  <div style={{ marginLeft: "90px", cursor: "pointer" }}>
                    <p style={{ color: "#0095f6" }}>Follow</p>
                  </div>
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'start', marginLeft: 30, fontSize: 13, color: "#A8A8A8" }}>© 2023 INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>
    </div>
  )
}
