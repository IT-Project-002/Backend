import "../css/landing.css";
import SimpleImageSlider from "react-simple-image-slider";
import item1 from "../image/cloudsFav.png";
import item2 from "../image/CloudsPainting.png";
import item3 from "../image/countryRoadPainting.png";
import item4 from "../image/embroLanding.png";
import item5 from "../image/greenMugFav.png";
import item6 from "../image/necklaceLanding.png";
import item7 from "../image/strawberrymug.png";
import item8 from "../image/embroFav.png";

function Landing() {
  const images = [
    { url: "http://image.uc.cn/s/wemedia/s/upload/2022/cc50253aa8bc9f05d91e7b7cd7cac7b7.jpg"},
    { url: "https://i.pinimg.com/originals/80/50/e1/8050e13f1236e94dae432f055efb850f.jpg" },
    { url: "http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" }
  ];

  return (
    <div className="layout-landing">
      <div className="slider-container">
        <SimpleImageSlider className="slider"
          width={1300}
          height={400}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
        />
      </div>
      <div className="browse-container">
        <a href="/user/item"><img src={item1} alt="item1" ></img></a>
        <img src={item2} alt="item2" ></img>
        <img src={item3} alt="item3" ></img>
        <img src={item4} alt="item4" ></img>
        <img src={item5} alt="item5" ></img>
        <img src={item6} alt="item6" ></img>
        <img src={item7} alt="item7" ></img>
        <img src={item8} alt="item8" ></img>
      </div>
    </div>
  );
}

export default Landing;
