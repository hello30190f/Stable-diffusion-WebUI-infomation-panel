import { useEffect, useState } from "react"
import { useMainData } from "../App"



export function ImagePreview(){
    const verticalStyle = " h-[50%] w-full"
    const horizontalStyle = " w-[50%] h-full"

    const screenOrientation = useMainData((s) => s.screenOrientation)
    
    const [style,setStyle] = useState("ImagePreveiw bg-gray-600" + horizontalStyle)

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



    

    return <div className={style}>

    </div>
}