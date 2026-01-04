import { useEffect, useRef, useState } from "react"
import { useMainData } from "../App"
import brokenImage from "../assets/brokenimage.png"


export function ImagePreview(){
    const verticalStyle = " h-[50%] w-full"
    const horizontalStyle = " w-[50%] h-full"

    const screenOrientation = useMainData((s) => s.screenOrientation)
    const APIresponse = useMainData((s) => s.JSONdata)
    
    const [imageURL,setImageURL] = useState(brokenImage)
    const [style,setStyle] = useState("ImagePreveiw flex justify-center" + horizontalStyle)

    const imageRef = useRef<HTMLImageElement | null>(null)
    const [imageElemStyle,setImageElemStyle] = useState({
        width: "",
        height: ""
    })

    useEffect(() => {
        if(screenOrientation == "Horizontal"){
            let replacement = style
            if(!style.includes(horizontalStyle)){
                replacement += horizontalStyle
            } 
            if(style.includes(verticalStyle)){
                replacement = replacement.replaceAll(verticalStyle,"")
            }
            setStyle(replacement)
        }else{
            let replacement = style
            if(!style.includes(verticalStyle)){
                replacement += verticalStyle
            } 
            if(style.includes(horizontalStyle)){
                replacement = replacement.replaceAll(horizontalStyle,"")
            }
            setStyle(replacement)
        }
    },[screenOrientation])


    useEffect(() => {
        if(APIresponse == null){
            setImageURL(brokenImage)
            setImageElemStyle({
                width: "",
                height: ""
            })
            return
        }

        if(APIresponse.current_image == "" ||  APIresponse.current_image == "null"){
            setImageURL(brokenImage)
            setImageElemStyle({
                width: "",
                height: ""
            })
            return
        }

        if(imageRef.current != null){
            const ratio = imageRef.current.width / imageRef.current.height
            if(ratio > 1){
                setImageElemStyle({
                    width: "100%",
                    height: ""
                })
            }else{
                setImageElemStyle({
                    width: "",
                    height: "100%"
                })
            }
        }
        setImageURL("data:image/png;base64," + APIresponse.current_image)
    },[APIresponse])



    return <div className={style}>
        <div className="w-full h-full flex justify-center" style={{alignItems:"center"}}>
            <img ref={imageRef} style={imageElemStyle} className="max-w-full max-h-full" src={imageURL}></img>
        </div>
    </div>
}