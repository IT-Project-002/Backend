import "../css/upload.css";
import Select from "react-select";
import React, {useState} from "react";
import AWS from 'aws-sdk'

const S3_BUCKET ='it-project-002';
const REGION ='ap-southeast-2';

AWS.config.update({
    accessKeyId: 'AKIA3V2C4OGZ2UVFEEHG',
    secretAccessKey: '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'
})

const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

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
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const files = []
    var form = new FormData();

    const onSelectFile = (e) => {
        // const file = e.target.files[0];
        // files.concat(file);
        // form.append('file', file)
          const selectedFiles = e.target.files;
          const selectedFilesArray = Array.from(selectedFiles);
    
          const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
          });
          // save the previous selected images
          setSelectedImages((previousImages) => previousImages.concat(imagesArray));
          // FOR BUG IN CHROME
          e.target.value = "";
        // setSelectedFile(e.target.files[0]);
    };

    const uploadFile = (file) => {

        // console.log(file.name)

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `lily/${file.name}`
        };

        s3.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    const deleteImage = (image) => {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    } 

    const handleSubmit = (e) => {
        // prevent page being refresh
        e.preventDefault();
        var images = selectedImages.map(async (image) => {
            return await fetch(image)
                .then(r => r.blob())
                .then(blobFile => new File([blobFile], image, { type: "image/png" }))
        })
        // const getFile = async (i) => {
        //     await fetch(i).then(r => r.blob()).then(blobFile => new File([blobFile], i, { type: "image/png" }))
        // }
        // var images = []
        // const convertBlob = async() => {
        //     const imagesPromise = selectedImages.map(getFile);
        //     images = await Promise.all(imagesPromise);
        // }
        // convertBlob();
        console.log(images);
        const itemInfo = {itemName, price, describtion, tags, images}
        itemInfo["files"] = files;
        console.log(itemInfo);
        fetch('http://localhost:9000/user/upload',{
            headers : {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(itemInfo)
        })
        .then(response => {
            console.log('hi:', response);
        })
        .then(itemInfo => {
            console.log('Success:', itemInfo);
        })
    }

    return (
        <div className="main">
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
                <form method='post' onSubmit = {handleSubmit} enctype="multipart/form-data">
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