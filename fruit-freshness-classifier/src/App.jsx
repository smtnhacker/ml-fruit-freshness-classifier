import "./App.css";
import axios from "axios";
import { useState } from "react";

const ImageForm = ({ setresult }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    setresult("");
    event.preventDefault();

    const imageInput = event.target.elements.image.files[0];
    setImage(imageInput);

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

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  const [result, setresult] = useState("");

  return (
    <div>
      <h2>FRUIT CLASSIFIER</h2>
      <ImageForm setresult={setresult} />
      <h1>
        This fruit is most likely:{" "}
        {result === "" ? "" : result > 0.5 ? "rotten" : "fresh"}
      </h1>
    </div>
  );
}

export default App;
