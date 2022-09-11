import "../css/market.css";
import sample from "../image/item-sample.png";

export default function Market() {
  return (
    <div className="main">
      <div className="item-img-container">
          <img src={sample} alt="sample"></img>
      </div>
      <div className="item-desc-container">
        <ul>
          <li className="item-name">
            <h1>Purely Hand-made mug, Perfectly for hot tea in winter.</h1>
          </li>
          <li className="item-price">
            <h1>AU$49.00+</h1>
          </li>
          <li className="item-desc">
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
              dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
              invidunt ut labore et ut labore et dolore magna aliquyam erat.
            </p>
          </li>
          <li className="item-status"><button>Available</button></li>
          <li className="item-contact"><button>ann.b@gmail.com</button></li>
        </ul>
      </div>
    </div>
  );
}