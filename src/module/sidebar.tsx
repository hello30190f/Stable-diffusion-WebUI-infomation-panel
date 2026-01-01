import { useMainData } from "../App"


export function Sidebar(){
    const sidebar = useMainData((s) => s.sidebar)

    if(sidebar)
        return <div className="sidebar fixed top-0 left-0 h-screen min-w-[10rem] bg-gray-900">

        </div>
}