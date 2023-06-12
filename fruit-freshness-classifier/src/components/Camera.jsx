/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Camera({ API }) {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState("");
    const [image, setImage] = useState(null);
    const vidRef = useRef()
    const canRef = useRef()
    
    const processPicture = async (frame) => {
        setImage(frame)
        setIsLoading(true)
        setResult("")
        try {
            const response = await axios.post(
                `${API}/frame`,
                JSON.stringify({ frame: frame }),
                {
                    headers: { "Content-Type": "application/json"}
                }
            )
            setResult(response.data.predictions[0])
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        canRef.current.getContext('2d').drawImage(vidRef.current, 0, 0, canRef.current.width, canRef.current.height)
        const frame = canRef.current.toDataURL('image/jpeg', 0.5)
        processPicture(frame)
    }

    const handleRestart = () => {
        setResult("")
        setImage(null)
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
            { image  
                ? <img src={image} />
                : <></>
            }
            <video ref={vidRef} height="360" style={{ display: image ? 'none': '' }} />
            <canvas ref={canRef} width={480} height={360} style={{ display: 'none' }} />
            <div className="result">
                {isLoading ? 
                (<div className="progress-bar"><div className="progress-fill"></div></div>)
                : 
                (<span>{result === "" ? "" : result > 0.5 ? "This is most likely: rotten" : "This is most likely: fresh"}</span>)}
            </div>
            { image
                ? <button className="dark-button" onClick={handleRestart}>Again</button>
                : <button className="dark-button" onClick={handleClick}>Take a Picture</button>
            }
        </div>
    )
}

export default Camera