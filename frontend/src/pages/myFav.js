import "../css/myFav.css";
import item1 from "../image/myfav1.png"
import item2 from "../image/myfav2.png"
import item3 from "../image/embroFav.png"
import item4 from "../image/cloudsFav.png"
import item5 from "../image/greenMugFav.png"
import item6 from "../image/CloudsPainting.png"

export default function Like() {
  return (
    <div className="layout-like">
      <div className = "content">
        <h1>My Favourite</h1>
        <div className = "items">
        <img className="singleItem" src={item3} alt="item3" ></img>
        <img className="singleItem" src={item4} alt="item4" ></img>
        <img className="singleItem" src={item5} alt="item5" ></img>
        <img className="singleItem" src={item6} alt="item6" ></img>
        </div>
        <div className = "itemsName">
          <h2 className="singleItem">Embroidery Artist Katerina Marchenko</h2>
          <h2 className="singleItem">Bébé mobile Crèche mobile Crèche neutre Lit bébé mobile Cloud</h2>
          <h2 className="singleItem">Spring in Coming in my mug</h2>
          <h2 className="singleItem">Painting: Clouds</h2>
        </div>

      </div>
      <img className="itemhead" src={item1} alt="item1" ></img>
      <img className="itemfoot" src={item2} alt="item2" ></img>
    </div>
  );
}