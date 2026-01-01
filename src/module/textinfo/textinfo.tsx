




// just show info as text which will be shown next to the image preview.

import { useEffect, useState, type JSX } from "react"
import { useMainData } from "../../App"

// progress, ETA(xxh xxm xxs), Sampling Step, Batch Job Amount
export function TextInfo(){
    const verticalStyle = " h-[50%] w-full"
    const horizontalStyle = " w-[50%] h-full"
    
    const screenOrientation = useMainData((s) => s.screenOrientation)
    const APIresponse = useMainData((s) => s.JSONdata)

    const [style,setStyle] = useState("TextInfo flex items-center justify-center bg-gray-600" + horizontalStyle)

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

    function Item({children,title}:{children:JSX.Element ,title:string}){
        return <div className="TextInfoItem m-6 w-[20rem]">
            <div className="title text-3xl font-bold text-start border-b-solid border-b-[3px] border-b-black">{title}</div>
            <div className="detail text-xl text-end">
                {children}
            </div>
        </div>
    }

    const errorMessage = "Unable to get the Infomation"
    const ETAtimeString = APIresponse ? 
                                    String(Math.floor(APIresponse.eta_relative / 3600.0)).padStart(2,"0") + "h " + 
                                    String(Math.floor(APIresponse.eta_relative / 60)).padStart(2,"0") + "min " + 
                                    String(Math.floor(APIresponse.eta_relative % 60)).padStart(2,"0") + "sec"                               
                                    : null

    return <div className={style}>
        <div className="container w-fit h-fit">
            <Item title="Progress">
                <div className="">
                    {APIresponse ? String(Math.floor(APIresponse.progress*100)) + " %" : errorMessage}
                </div>
            </Item>
            <Item title="ETA">
                <div className="">
                    {APIresponse&&ETAtimeString ? String(Math.floor(APIresponse.eta_relative)) + " Sec (" + ETAtimeString + ")" : errorMessage}
                </div>
            </Item>
            <Item title="Sampling Step">
                <div className="">
                    {APIresponse ? String(APIresponse.state.sampling_step) + " / " + String(APIresponse.state.sampling_steps) : errorMessage}                    
                </div>
            </Item>
            <Item title="Batch Job">
                <div className="">
                    {APIresponse ? String(APIresponse.state.job_no) + " / " + String(APIresponse.state.job_count) : errorMessage}                                        
                </div>
            </Item>
        </div>
    </div>
}