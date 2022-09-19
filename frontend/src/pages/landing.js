import "../css/landing.css";
import "../css/modal.css";
import Modal from "../components/modal"
import item1 from "../image/cloudsFav.png";
import item2 from "../image/CloudsPainting.png";
import item3 from "../image/countryRoadPainting.png";
import item4 from "../image/embroLanding.png";
import item5 from "../image/greenMugFav.png";
import item6 from "../image/necklaceLanding.png";
import item7 from "../image/strawberrymug.png";
import item8 from "../image/embroFav.png";
import Gallery from "../components/Carousel";

import React,{useEffect, useState} from "react"
function Landing() {
  const [showModal, setShowModal] = useState(false);
  /* appear after 5 seconds */
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setShowModal(true)
    },[5000]);
    return () => clearTimeout(timer);
  },[]);

  const Toggle = () => {
    setShowModal(false);
  }

  return (
    <div className="layout-landing">
      <div className="slider-container">
        <Gallery />
      </div>
      <div className="browse-container">
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <img src={item2} alt="item2" ></img>
        <img src={item3} alt="item3" ></img>
        <img src={item4} alt="item4" ></img>
        <img src={item5} alt="item5" ></img>
        <img src={item6} alt="item6" ></img>
        <img src={item7} alt="item7" ></img>
        <img src={item8} alt="item8" ></img>
        <img src={item5} alt="item5" ></img>
        <img src={item6} alt="item6" ></img>
        <img src={item7} alt="item7" ></img>
        <img src={item8} alt="item8" ></img>
      </div>
      {showModal && <Modal className="pop-up" close = {Toggle}/>}
    </div>
  );
}

export default Landing;