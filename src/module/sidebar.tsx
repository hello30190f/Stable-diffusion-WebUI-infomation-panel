import { useMainData } from "../App"


export function Sidebar(){
    const sidebar = useMainData((s) => s.sidebar)
    const setMainData = useMainData.setState
    const network = useMainData((s) => s.network)

    if(sidebar)
        return <div className="sidebar fixed top-0 left-0 h-screen min-w-[10rem] bg-gray-900">
            <div className="settings text-3xl font-bold pt-6 pl-1 text-start">Network Settings:</div>
            <div className="detail m-2">
                <div className="Interval text-center m-2 p-2 rounded-2xl bg-gray-800">
                    <div className="explain text-start ml-2 text-xl font-bold">
                        Update Interval
                    </div>
                    <div className="flex w-full flex-row">
                        <input 
                            className="text-xl text-end font-bold" 
                            placeholder="Please enter update interval" 
                            id="interval" type="number"
                            value={network.updateInterval}
                            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                                setMainData({
                                    network:{
                                        ...network,
                                        updateInterval: Number(event.target.value)
                                    }
                                })
                            }}
                            ></input>
                        <div className="text-xl font-bold">sec</div>
                    </div>
                </div>
                <div className="Address text-center m-2 p-2 rounded-2xl bg-gray-800">
                    <div className="explain text-start ml-2 text-xl font-bold">
                        IP Address
                    </div>
                        <input 
                            className="text-xl text-end font-bold" 
                            placeholder="Please enter update interval" 
                            id="interval" type="text"
                            value={network.ipAddress}
                            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                                setMainData({
                                    network:{
                                        ...network,
                                        ipAddress: event.target.value
                                    }
                                })
                            }}
                            ></input>
                </div>
                <div className="Port text-center m-2 p-2 rounded-2xl bg-gray-800">
                    <div className="explain text-start ml-2 text-xl font-bold">
                        Port
                    </div>
                        <input 
                            className="text-xl text-end font-bold" 
                            placeholder="Please enter update interval" 
                            id="interval" type="number" step={1}
                            value={network.port}
                            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                                setMainData({
                                    network:{
                                        ...network,
                                        port: Number(event.target.value)
                                    }
                                })
                            }}
                            ></input>
                </div>
            </div>
        </div>
}