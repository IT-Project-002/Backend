import "../css/market.css";
import female1 from "../image/profile/female2background.png"
import female2 from "../image/profile/female2background.png"
import female3 from "../image/profile/female3background.png"
import male1 from "../image/profile/male2background.png"
import male2 from "../image/profile/male2background.png"
import male3 from "../image/profile/male3background.png"

import item1 from "../image/cloudsFav.png";
import background from "../image/profile-photo-bg.png";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import React, { useState, useEffect } from 'react'

export default function Market() {
    const access_token=sessionStorage.getItem('access_token')
    const [data, setData]= useState({})
    const avatar = data['Avatar'] 

    useEffect(()=>{
        fetch('http://localhost:9000/user/market', {
            headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                 Authorization: 'Bearer ' + access_token
              },
              method: 'GET',
              mode: 'cors',
            })
            .then(res => {
                console.log(res)
                if(res.status === 401){
                    sessionStorage.removeItem('access_token')
                    window.location.href = "http://localhost:3000/user/login"
                }else{
                    return res.json()
                }

            })
            .then(dat => {
                console.log(dat)
                setData(dat)
            })
    },[access_token]);
    return (
      <div className="layout-market" >

        <div className="user-avatar-container">
            { avatar==="female1" ?  (<img className="user-avatar" src={female1} alt="female1"></img>) : null}
            { avatar==="female2" ?  (<img className="user-avatar" src={female2} alt="female2"></img>) : null}
            { avatar==="female3" ?  (<img className="user-avatar" src={female3} alt="female3"></img>) : null}
            { avatar==="male1" ?  (<img className="user-avatar" src={male1} alt="male1"></img>) : null}
            { avatar==="male2" ?  (<img className="user-avatar" src={male2} alt="male2"></img>) : null}
            { avatar==="male3" ?  (<img className="user-avatar" src={male3} alt="male3"></img>) : null}
             {/* <img className="user-avatar" src={figure3} alt="figure"></img> */}
            <img className="user-avatar-bg" src={background} alt="background"></img>
        </div>

        <div className="user-intro-container">
            <a href="/user/upload"><AddAPhotoOutlinedIcon/></a>
            <p>Click to upload more items.</p>
            <hr className="divider"></hr>
            <h1>{data['username']}'s Marketplace</h1>
            <p>Lorem ipsum dolor sit amet,data consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.  </p>
        </div>
        <div className="user-collection-container">
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div className="market-column">
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
        </div>
      </div>
    );
  }
  