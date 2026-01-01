import { useMainData } from "../App"
import { ImagePreview } from "./imagePreview"
import { RawInfo } from "./textinfo/rawinfo"
import { TextInfo } from "./textinfo/textinfo"

export function MainInfo(){
    const sidebar = useMainData((s) => s.sidebar)
    const view = useMainData((s) => s.view)
    const setMainData = useMainData.setState

    let InfomationView = <TextInfo></TextInfo>
    if(view != "main"){
        InfomationView = <RawInfo></RawInfo>
    }

    return <div 
            className="MainInfo main w-screen fixed top-0 left-0 h-screen pt-[5rem] bg-gray-800"
            onClick={(event:React.MouseEvent<HTMLDivElement>) => {                
                if(sidebar && event.currentTarget.className.includes("MainInfo")) 
                    setMainData({sidebar:false})
            }}
            >
            <div className="flex flex-row">
                {InfomationView}
                <ImagePreview></ImagePreview>
            </div>
    </div>
}