import "../css/upload.css";
import sample from "../image/item-sample.png";

export default function Upload() {
    return (
        <div className="main">
            <div className="preview-container">
                <img src={sample} alt="sample"></img>
                <img src={sample} alt="sample"></img>
                <img src={sample} alt="sample"></img>
            </div>
            <div className="upload-container">
                <img src={sample} alt="sample"></img>
                <button className="button">Upload more photos</button>
            </div>
            <div className="fillin-container">
                <form>
                    <h2>Name your cute work?</h2>
                    <input type="text"></input>
                    <h2>Price your work if you want :)</h2>
                    <input type="text"></input>
                    <h2>Can you precisely describe your work?</h2>
                    <input type="text"></input>
                    <h2>What’s your journey creating this work?</h2>
                    <input type="text"></input>
                    <h2>Tag your work with its category.</h2>
                    <button className="tag">Mug</button>
                    <button className="tag">Clothing</button>
                    <button className="button">Save Changes</button>
                </form>
            </div>
        </div>
    );
}