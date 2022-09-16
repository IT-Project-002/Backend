import "../css/upload.css";
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
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
  
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      // save the previous selected images
      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
      // FOR BUG IN CHROME
      event.target.value = "";
    };

    const deleteImage = (image) => {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    } 

    const handleSubmit = (e) => {
        // prevent page being refresh
        e.preventDefault();
        const itemInfo = {itemName, price, describtion, tags, selectedImages}
        console.log(itemInfo)
    }

    return (
        <div className="layout-upload">
            {/* <div className="preview-container">
                <img src={sample} alt="sample"></img>
                <img src={sample} alt="sample"></img>
                <img src={sample} alt="sample"></img>
            </div> */}
            {/* Image uploader*/}
            <div className="upload-container">
                <label>
                    <input className= "upload-input" type="file"  name="itemImages" multiple accept="image/*" onChange={onSelectFile}/>
                </label>
                <p>Upload more photos</p>
            </div>   
            {/* Image preview*/}
            <div className="preview-container">
                {selectedImages &&
                    selectedImages.map((image, index) => {
                        return(
                            <div key={image} >
                            <button className="delete-button" onClick={() => deleteImage(image)}> X </button>
                            <img  src={image} alt="file"/>
                            </div>
                        )
                    })
                }
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
