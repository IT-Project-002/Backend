import "../css/market.css";
import annB from "../image/profile/AnnB.png";
import item1 from "../image/cloudsFav.png";
import item2 from "../image/CloudsPainting.png";
import item3 from "../image/embroFav.png";
import item4 from "../image/necklaceLanding.png";
import background from "../image/profile-photo-bg.png";
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

import React, { useState, useEffect } from 'react'

export default function Market() {
    const access_token=sessionStorage.getItem('access_token')
    const [data, setData]= useState({})
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
    },[]);
    return (
      <div className="layout-market" >

        <div className="user-avatar-container">
            <img className="user-avatar" src={annB} alt="annB"></img>
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
  