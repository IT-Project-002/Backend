import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class Gallery extends React.Component {
    render() {
        return (
            <div className="carousel">
                <Carousel autoPlay interval="5000" transitionTime="5000" infiniteLoop>
                    <div>
                        <img src="http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" alt="" />
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
                    <div>
                        <img src="http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" alt="" />
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
                    <div>
                        <img src="http://n.sinaimg.cn/sinacn20115/0/w1920h1280/20190114/f0a1-hrpcmqw7350752.jpg" alt="" />
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