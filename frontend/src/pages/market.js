import "../css/market.css";
import annB from "../image/profile/AnnB.png";
import item1 from "../image/cloudsFav.png";
import item2 from "../image/CloudsPainting.png";
import item3 from "../image/embroFav.png";
import item4 from "../image/necklaceLanding.png";
import background from "../image/profile-photo-bg.png";
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
            <h1>{data['username']}'s Marketplace</h1>
            <p>Lorem ipsum dolor sit amet,data consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
        </div>
        <div className="user-collection-container">
            <div>
                <img src={item1} alt="item1" ></img>
                <h3>Item1</h3>
            </div>
            <div>
                <img src={item2} alt="item2" ></img>
                <h3>Item2</h3>
            </div>
            <div>
                <img src={item3} alt="item3" ></img>
                <h3>Item3</h3>
            </div>
            <div>
                <img src={item4} alt="item4" ></img>
                <h3>Item4</h3>
            </div>
            <div>
                <img src={item4} alt="item4" ></img>
                <h3>Item4</h3>
            </div>
            <div>
                <img src={item4} alt="item4" ></img>
                <h3>Item4</h3>
            </div>
            <div>
                <img src={item4} alt="item4" ></img>
                <h3>Item4</h3>
            </div>
            <div>
                <img src={item4} alt="item4" ></img>
                <h3>Item4</h3>
            </div>
        </div>
      </div>
    );
  }
  