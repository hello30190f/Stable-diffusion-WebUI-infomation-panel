import './App.css'
import { create }   from 'zustand'
import { Header }   from './module/header'
import { MainInfo } from './module/mainInfo'
import { Sidebar }  from './module/sidebar'
import { useRef } from 'react'

// https://domain.name.or.ip.address/sdapi/v1/progress
// {
//     "progress": 0.9414285714285715,
//     "eta_relative": 73.19720708907812,
//     "state": {
//         "skipped": false,
//         "interrupted": false,
//         "stopping_generation": false,
//         "job": "Batch 10 out of 10",
//         "job_count": 10,
//         "job_timestamp": "20251021221750",
//         "job_no": 9,
//         "sampling_step": 12,
//         "sampling_steps": 35
//     },
//     "current_image": "ImageBlobString",
//     "textinfo": null
// }


type StableDiffusionWebUIapiJSON = {
    "progress": number,
    "eta_relative": number,
    "state": {
        "skipped": boolean,
        "interrupted": boolean,
        "stopping_generation": boolean,
        "job": string,            // Batch 10 out of 10
        "job_count": number,
        "job_timestamp": string,  // 20251021221750
        "job_no": number,
        "sampling_step": number,
        "sampling_steps": number
    },
    "current_image": string, // image blob base64 png? 
    "textinfo": null | string
}


type MainData = {
  JSONdata        : StableDiffusionWebUIapiJSON | null,   // automaticly update 
  sidebar         : boolean,                              // false -> close, true -> open
  view            : string,                                // "main" or "raw" -> change text info
  entryPointPath  : string,
  network:{
    updateInterval  : number, // sec
    ipAddress       : string, 
    port            : number, 
    protocol        : "http" | "https"
  }
}

export const useMainData = create<MainData>(() => ({
  JSONdata        : null,
  sidebar         : false,
  view            : "main",
  entryPointPath  : "/sdapi/v1/progress",
  network:{
    updateInterval  : 1.0 / 2, // 2 FPS 
    ipAddress       : "localhost",
    port            : 7860,
    protocol        : "https"
  }
}))

// 
async function useAutoUpdater(
  getMainData: () => MainData,
  setMainData: {
    (partial: MainData | Partial<MainData> | ((state: MainData) => MainData | Partial<MainData>), replace?: false): void;
    (state: MainData | ((state: MainData) => MainData), replace: true): void;
  }
){
  const protocol    = getMainData().network.protocol
  const ipAddress   = getMainData().network.ipAddress
  const port        = String(getMainData().network.port)
  const entryPoint  = getMainData().entryPointPath

  const url =  protocol + "://" + ipAddress + ":" + port + entryPoint

  function next(){
    setTimeout(() => {
      useAutoUpdater(getMainData,setMainData)
    },getMainData().network.updateInterval * 1000)
  }

  // ignore error because there are not grantee the user set correct netwrok infomation.
  try{
    let result = await fetch(url)
    let JSONdata = await result.json()
    setMainData({JSONdata: JSONdata})
    next()
  }catch(error){
    console.log(error)
    next()
  }
}

function App() {
  const getMainData = useMainData.getState
  const setMainData = useMainData.setState

  const init = useRef(true);
  if(init.current){
    useAutoUpdater(getMainData,setMainData)
    init.current = false
  }
    
  return <div>
    <MainInfo></MainInfo>
    <Header></Header>
    <Sidebar></Sidebar>
  </div>
}

export default App
