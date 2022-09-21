import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import sample from "../image/item-sample.png";
import sample1 from "../image/items/pinkmug.png";


class Gallery extends React.Component {
    render() {
        return (
            <div className="carousel">
                <Carousel autoPlay={false} interval="5000" transitionTime="3000" infiniteLoop>
                    <img src={sample} alt="" />
                    <img src={sample} alt="" />
                    <img src={sample} alt="" />
                </Carousel>
            </div>
        )
    };
}
export default Gallery