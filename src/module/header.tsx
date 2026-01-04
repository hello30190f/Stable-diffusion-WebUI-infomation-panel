import { useMainData } from "../App"
import icon from "../assets/favicon.svg"

export function Header(){
    const setMainData   = useMainData.setState
    const sidebar       = useMainData((s) => s.sidebar)
    const connection    = useMainData((s) => s.connection)

    let headerClassName = "header fixed top-0 left-0 w-screen h-[5rem] "
    headerClassName += connection ? " bg-gray-950 " : " bg-red-950 "

    return <div 
            className={headerClassName}
            onClick={(event:React.MouseEvent<HTMLDivElement>) => {
                if(sidebar && event.currentTarget.className.includes("header")) 
                    setMainData({sidebar:false})
            }}
            >
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