import "./App.css";
import axios from "axios";
import { useRef, useState } from "react";
import { AiFillFileImage } from 'react-icons/ai';


const ImageForm = ({ setresult }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
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

  };


  const fileInput = useRef(null)




  return (
    <div onClick={()=> fileInput.current.click()} className="form">
      <output><AiFillFileImage size={130} fill="#848b9a" /></output>
      <input onChange={handleSubmit} ref={fileInput} type="file" name="image" accept="image/*" required style={{display:"none"}}/>
      <p>Upload image here</p>

    </div>

  );
};

function App() {
  const [result, setresult] = useState("");

  return (
    <div className="container">
      <h1>FRUIT CLASSIFIER</h1>
      <ImageForm setresult={setresult} />
      <p>
        This fruit is most likely:{" "}
        {result === "" ? "" : result > 0.5 ? "rotten" : "fresh"}
      </p>
    </div>
  );
}

export default App;
