import "../css/upload.css";
import sample from "../image/item-sample.png";
import Select from "react-select";
import React, {useState} from "react";

export default function Upload() {
    const options = [
        { value: "textiles", label: "Textiles" }, 
        { value: "ceramics", label: "Ceramics" },
        { value: "glass", label: "Glass" },
        { value: "woodwork", label: "Woodwork" },
        { value: "jewelry", label: "Jewelry" },
        { value: "leather", label: "Leather" },
        { value: "painting", label: "Painting" },
        { value: "others", label: "Others" },
    ]

    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [describtion, setDescribtion] = useState("");
    const [tags, setTags] = useState([]);

    /* Image */
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = (e) => {
        // prevent page being refresh
        e.preventDefault();
        const itemInfo = {itemName, price, describtion, tags}
        console.log(itemInfo)
    }
    return (
        <div className="layout-upload">
            <div className="preview-container">
                <img src={sample} alt="sample"></img>
                <img src={sample} alt="sample"></img>
                <img src={sample} alt="sample"></img>
            </div>
            <div className="upload-container">
                <input type="file" onChange={handleChange} multiple=""/>
                <img src={file} alt="file"/>
                <button className="button">Upload more photos</button>
            </div>
            <div className="fillin-container">
                <form method='post' onSubmit = {handleSubmit}>
                    <h2>Name your cute work?</h2>
                    <input type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <h2>Price your work?</h2>
                    <input type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />                    
                    <h2>Can you precisely describe your work?</h2>
                    <input type="text"
                        value={describtion}
                        onChange={(e) => setDescribtion(e.target.value)}
                        required
                    />
                    {/* tag selection */}
                    <h2>Tag your work with its category.</h2>
                    <Select className="tag"
                        isMulti
                        placeholder="Tell us what you interested in…"
                        options={options}
                        onChange={(item) => setTags(item)}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={false}
                        isLoading={false}
                        isRtl={false}
                        closeMenuOnSelect={false}
                    />  
                    <button className="button" type='submit'>Save Changes</button>
                </form>
            </div>
        </div>
    );
}