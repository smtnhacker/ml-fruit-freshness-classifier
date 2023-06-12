import { useState } from "react";
import Stream from "./components/Stream";
import ImageForm from "./components/ImageForm";
import Camera from "./components/Camera";
import "./App.css";

function App() {
  const [mode, setMode] = useState(0)
  
  const prodAPI = "https://fastapi-production-ea27.up.railway.app"
  const devAPI = "http://127.0.0.1:8000"

  return (
    <div className="container">
      <h1>FRUIT CLASSIFIER</h1>
      <span>Upload a photo of a fruit here to determine if it is rotten or not</span>
      <div>
        <button onClick={() => setMode(0)}>Upload</button>
        <button onClick={() => setMode(1)}>Stream</button>
        <button onClick={() => setMode(2)}>Camera</button>
      </div>
      {
          mode == 0 ? <ImageForm API={devAPI} />
        : mode == 1 ? <Stream API={devAPI} />
        : <Camera API={devAPI} />
      }
    </div>
  );
}

export default App;
