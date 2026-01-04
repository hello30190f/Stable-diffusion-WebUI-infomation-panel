import { useEffect, useState } from "react"
import { useMainData } from "../../App"


// just show raw JSON text which will be shown next to the image preview.
export function RawInfo(){
    const verticalStyle = " h-[50%] w-full"
    const horizontalStyle = " w-[50%] h-full"
    
    const screenOrientation = useMainData((s) => s.screenOrientation)
    const APIresponse = useMainData((s) => s.JSONdata)

    const [style,setStyle] = useState("RawInfo flex justify-center" + horizontalStyle)

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
        {JSON.stringify(APIresponse,null,4)}
    </div>
}