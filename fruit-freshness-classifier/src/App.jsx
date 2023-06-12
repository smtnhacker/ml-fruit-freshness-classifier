import { useEffect, useState } from "react";
import Stream from "./components/Stream";
import ImageForm from "./components/ImageForm";
import Camera from "./components/Camera";
import "./App.css";

function App() {
  const [mode, setMode] = useState(0)
  
  const prodAPI = "https://fastapi-production-ea27.up.railway.app"
  const devAPI = "http://127.0.0.1:8000"
  const API = import.meta.env.MODE !== 'production' ? devAPI : prodAPI

  useEffect(() => {
    console.log('Environment:', import.meta.env)
  }, [])

  return (
    <div className="container">
      <div className="title-container">
        <div className="title">FRESH</div>
        <div className="subtitle">Fruit and Vegetable Ripeness Evaluation System with High accuracy</div>
      </div>
      <span>Choose a method of uploading an image of a fruit or vegetable and determine if it is fresh or not.</span>
      <div>
        <button className="dark-button" onClick={() => setMode(0)}>Upload</button>
        <button className="dark-button" onClick={() => setMode(1)}>Stream</button>
        <button className="dark-button" onClick={() => setMode(2)}>Camera</button>
      </div>
      <div style={{ padding: '1rem' }}>
      {
          mode == 0 ? <ImageForm API={API} />
        : mode == 1 ? <Stream API={API} />
        : <Camera API={API} />
      }
      </div>
      <footer>Copyright 2023 © Michael Angelo Monasterial, Pe Arian Rey, Ron Mikhael Surara, Jedidiah Carl Tan</footer>
    </div>
  );
}

export default App;
