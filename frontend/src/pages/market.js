import "../css/market.css";
import annB from "../profile/AnnB.png";
import item1 from "../image/cloudsFav.png";
import item2 from "../image/CloudsPainting.png";
import item3 from "../image/embroFav.png";
import item4 from "../image/necklaceLanding.png";

export default function Market() {
    return (
      <div className="layout-market">
        <div className="user-avatar-container">
            <img className="user-full-profile" src={annB} alt="annB" ></img>
        </div>
        <div className="user-intro-container">
            <h1>Ann B's Marketplace</h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
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
        </div>
      </div>
    );
  }
  