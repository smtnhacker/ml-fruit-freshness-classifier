import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Stream({ API }) {
    const [crazy, setCrazy] = useState(false)
    const [image, setImage] = useState(null)
    const [label, setLabel] = useState([])
    const vidRef = useRef()
    const canRef = useRef()
    
    const processFrame = async (frame) => {
        try {
            const response = await axios.post(
                `${API}/${crazy ? '' : 'simple_'}stream`,
                JSON.stringify({ frame: frame }),
                {
                headers: {
                    "Content-Type": "application/json"
                }
                }
            )
            if (crazy) {
                setImage(response.data.frame)

            } else {
                setImage(frame)
                setLabel(response.data.predictions)
            }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        const fps = crazy ? 2 : 5
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
            }, 1000/fps)
        })
        .catch(err => console.error(err))

        return () => {
            clearInterval(intervalRef)
        }
    }, [crazy])

    const getColor = () => {
        if (crazy) {
            return '(0, 0, 0)'
        } if (label > 0.5) {
            return '(255, 0, 0)'
        } else {
            return '(0, 255, 0)'
        }
    }

    return (
        <div>
            <video ref={vidRef} height="360" width="480" style={{ display: 'none' }} />
            <canvas ref={canRef} width={480} height={360} style={{ display: 'none' }} />
            { image? <img src={image} style={{ border: `solid 3px rgb${getColor()}`}} /> : 'loading stream...' }
            <span style={{ display: 'block' }}>
                { crazy ? '...' : label > 0.5 ? 'This is most likely: rotten' : 'This is most likely: fresh' }
            </span>
            {
                import.meta.env.MODE !== 'production' 
                && <button className="dark-button" onClick={() => setCrazy(prev => !prev)}>{crazy ? 'Turn off Object Detection' : 'Turn on Object Detection'}</button>
            }
        </div>
    )
}

export default Stream