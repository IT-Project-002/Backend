import React from "react";
import "../css/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Gallery extends React.Component {
    render() {
        return (
            <div className="carousel">
                <Carousel autoPlay interval="5000" transitionTime="5000" infiniteLoop>
                    <div>
                        <img src="http://image.uc.cn/s/wemedia/s/upload/2022/cc50253aa8bc9f05d91e7b7cd7cac7b7.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/originals/80/50/e1/8050e13f1236e94dae432f055efb850f.jpg" alt="" />
                    </div>
                    <div>
                        <img src="http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" alt="" />
                    </div>
                    <div>
                        <img src="http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" alt="" />
                    </div>
                    <div>
                        <img src="http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" alt="" />
                    </div>
                </Carousel>
            </div>
        )
    };
}
export default Gallery