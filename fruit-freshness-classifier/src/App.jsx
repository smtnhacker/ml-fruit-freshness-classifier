import "./App.css";
import axios from "axios";
import { useRef, useState } from "react";


const ImageForm = () => {
  const [result, setresult] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (event) => {
    setIsLoading(true)

    setresult("");
    event.preventDefault();
    const imageInput = fileInput.current.files[0];
    setImage(imageInput);

    const output = document.querySelector("output")
    let imageOutput = "";

    console.log(imageInput)
    imageOutput = `<div class="image">
                <img src="${URL.createObjectURL(imageInput)}" alt="image">
              </div>`

    output.innerHTML = imageOutput;

    const formData = new FormData();
    formData.append("image", imageInput);
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        "https://fastapi-production-ea27.up.railway.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully", response);
      console.log(`Prediction: ${response.data.predictions}`);
      setresult(response.data.predictions[0]);
    } catch (error) {
      console.error("Failed to upload image", error);
    }
    setIsLoading(false)
  };


  const fileInput = useRef(null)




  return (
    <>
      <div onClick={()=> fileInput.current.click()} className="form">
        <output><img src="/image.svg" /></output>
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

function App() {

  return (
    <div className="container">
      <h1>FRUIT CLASSIFIER</h1>
      <span>Upload a photo of a fruit here to determine if it is rotten or not</span>
      <ImageForm />  
    </div>
  );
}

export default App;
