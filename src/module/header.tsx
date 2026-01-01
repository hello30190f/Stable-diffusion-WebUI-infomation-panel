import { useMainData } from "../App"
import icon from "../assets/favicon.svg"

export function Header(){
    const setMainData = useMainData.setState

    return <div className="header fixed top-0 left-0 w-screen h-[5rem] bg-gray-950">
        <img 
            className="h-[5rem] hover:opacity-[0.5]" 
            draggable={false} src={icon}
            onClick={() => {
                setMainData({
                    sidebar: true
                })
            }}
            ></img>
    </div>  
}