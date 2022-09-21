import "../css/myFav.css";
import backgroundTop from "../image/background/myfav1.png"
import backgroundBottom from "../image/background/myfav2.png"
import item1 from "../image/items/item1.png"
import item2 from "../image/items/item2.png"
import item3 from "../image/items/item3.png"
import item4 from "../image/items/item4.png"

export default function Like() {
  return (
    <div className="layout-like">
      <div className = "content">
        <h1>My Favourite</h1>
        <div className = "items">
        <img className="singleItem" src={item1} alt="item3" ></img>
        <img className="singleItem" src={item2} alt="item4" ></img>
        <img className="singleItem" src={item3} alt="item5" ></img>
        <img className="singleItem" src={item4} alt="item6" ></img>
        </div>
        <div className = "itemsName">
          <h2 className="singleItem">Embroidery Artist Katerina Marchenko</h2>
          <h2 className="singleItem">Bébé mobile Crèche mobile Crèche neutre Lit bébé mobile Cloud</h2>
          <h2 className="singleItem">Spring in Coming in my mug</h2>
          <h2 className="singleItem">Painting: Clouds</h2>
        </div>

      </div>
      <img className="itemhead" src={backgroundTop} alt="item1" ></img>
      <img className="itemfoot" src={backgroundBottom} alt="item2" ></img>
    </div>
  );
}