import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Stream({ API }) {
    const [image, setImage] = useState(null);
    const vidRef = useRef()
    const canRef = useRef()
    
    const processFrame = async (frame) => {
        try {
            const response = await axios.post(
                `${API}/stream`,
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
        let intervalRef = null
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            vidRef.current.srcObject = stream
            vidRef.current.play()
            intervalRef = setInterval(() => {
                if (canRef.current) {
                    canRef.current.getContext('2d').drawImage(vidRef.current, 0, 0, canRef.current.width, canRef.current.height)
                    const frame = canRef.current.toDataURL('image/jpeg', 0.5)
                    processFrame(frame)
                }
            }, 1000/2)
        })
        .catch(err => console.error(err))

        return () => {
            clearInterval(intervalRef)
        }
    }, [])

    return (
        <div>
            <video ref={vidRef} style={{ display: 'none' }} />
            <canvas ref={canRef} width='640' height='360' style={{ display: 'none' }} />
            { image? <img src={image} /> : 'loading stream...' }
        </div>
    )
}

export default Stream