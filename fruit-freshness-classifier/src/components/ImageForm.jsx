/* eslint-disable react/prop-types */
import axios from "axios";
import { useRef, useState } from "react";

const ImageForm = ({ API }) => {
  const [imgSrc, setImgSrc] = useState("image.svg")
  const [result, setresult] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const fileInput = useRef(null)

  const submit = async (imageInput) => {
    setIsLoading(true)
    setresult("");

    console.log(imageInput)
    setImgSrc(URL.createObjectURL(imageInput))

    const formData = new FormData();
    formData.append("image", imageInput);

    try {
      const response = await axios.post(
        `${API}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully", response);
      console.log(response.data.predictions[0]);
      setresult(response.data.predictions[0]);
    } catch (error) {
      console.error("Failed to upload image", error);
    }
    setIsLoading(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageInput = fileInput.current.files[0];
    await submit(imageInput)
    
  };

  const handleDrop = (e) => {
    console.log("File(s) dropped", e)
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach(item => {
        if (item.kind === "file") {
          const file = item.getAsFile()
          if (file.type.includes("image/")) {
            submit(file)
          }
        }
      })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const removeDrag = {
    onDrag: e => e.preventDefault(),
    onDrop: e => e.preventDefault(),
    onDragEnd: e => e.preventDefault(),
    onDragEnter: e => e.preventDefault(),
    onDragLeave: e => e.preventDefault(),
    onDragOver: e => e.preventDefault(),
    onDragStart: e => e.preventDefault(),
  }

  return (
    <>
      <div 
        className={`form`}
        onClick={()=> fileInput.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <output><div {...removeDrag} className="image"><img {...removeDrag} src={imgSrc} /></div></output>
        <input onChange={handleSubmit} ref={fileInput} type="file" name="image" accept="image/*" required style={{display:"none"}}/>
        <p>Upload image here</p>
      </div>
      <div className="result">
        {isLoading ? 
          (<div className="progress-bar"><div className="progress-fill"></div></div>)
          : 
          (<span>{result === "" ? "" : result > 0.5 ? "This fruit is most likely: rotten" : "This fruit is most likely: fresh"}</span>)}
      </div>
      
    </>

  );
};

export default ImageForm;