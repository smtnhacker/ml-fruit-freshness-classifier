import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Camera({ API }) {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setresult] = useState("");
    const [image, setImage] = useState(null);
    const vidRef = useRef()
    const canRef = useRef()
    
    const processPicture = async (frame) => {
        try {
            const response = await axios.post(
                `${API}/upload`,
                JSON.stringify({ frame: frame }),
                {
                headers: {
                    "Content-Type": "application/json"
                }
                }
            )
            setImage(response.data.frame)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        vidRef.current.srcObject = stream
        vidRef.current.play()
      })
      .catch(err => console.error(err))
  }, [])

    return (
        <div>
            <video ref={vidRef} />
            <canvas ref={canRef} width='640' height='360' style={{ display: 'none' }} />
            { image? <img src={image} /> : 'loading stream...' }
            <div className="result">
                {isLoading ? 
                (<div className="progress-bar"><div className="progress-fill"></div></div>)
                : 
                (<span>{result === "" ? "" : result > 0.5 ? "This fruit is most likely: rotten" : "This fruit is most likely: fresh"}</span>)}
            </div>
        </div>
    )
}

export default Camera