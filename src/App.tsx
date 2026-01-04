import './App.css'
import { create }   from 'zustand'
import { Header }   from './module/header'
import { MainInfo } from './module/mainInfo'
import { Sidebar }  from './module/sidebar'
import { useEffect, useRef } from 'react'
import { findOrientation, readSettings, saveSettings } from './module/helper'

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


export type MainData = {
  JSONdata            : StableDiffusionWebUIapiJSON | null,   // automaticly update 
  sidebar             : boolean,                              // false -> close, true -> open
  view                : string,                               // "main" or "raw" -> change text info
  entryPointPath      : string,
  screenOrientation   : "Vertical" | "Horizontal",
  connection          : boolean                               // true -> ok, false -> disconnected
  network:{
    updateInterval  : number, // sec
    ipAddress       : string, 
    port            : number, 
    protocol        : "http" | "https"
  }
}

export const useMainData = create<MainData>(() => ({
  JSONdata          : null,
  sidebar           : false,
  view              : "main",
  screenOrientation : "Horizontal",
  entryPointPath    : "/sdapi/v1/progress",
  connection        : false,
  // try to connect local WebUI by default.
  network:{
    updateInterval  : 1.0 / 2, // 2 FPS 
    ipAddress       : "localhost",
    port            : 7860,
    protocol        : "http"
  }
}))

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
  const connection  = getMainData().connection

  const url =  protocol + "://" + ipAddress + ":" + port + entryPoint

  function next(){
    setTimeout(() => {
      useAutoUpdater(getMainData,setMainData)
    },getMainData().network.updateInterval * 1000)
  }

  // ignore error because there are not grantee the user set correct netwrok infomation while try to poll the infomation.
  try{
    let result = await fetch(url)
    let JSONdata = await result.json()
    setMainData({JSONdata: structuredClone(JSONdata)})
    if(!connection) setMainData({connection: true})
    next()
  }catch(error){
    // suppress the error because it's too heavy make that browser console slow or unusable to outputing the error message when the connection can't be established.
    // console.log(error)
    if(connection) setMainData({connection: false})
    setTimeout(() => {
      next()
    },3 * 1000)
  }
}


function App() {
  const getMainData = useMainData.getState
  const setMainData = useMainData.setState
  const netwrok = useMainData((s) => s.network)

  const init = useRef(true);
  if(init.current){
    // begin polling
    useAutoUpdater(getMainData,setMainData)

    // use saved setting if it does exist.
    const settings = readSettings()
    if(settings != null){
      setMainData({network:settings})
    }else{
      // when settings does not exist, save the default settings.
      saveSettings(getMainData())
    }    
    init.current = false
  }

  // save settings if any changes are made.
  useEffect(() => {
    saveSettings(getMainData())
  },[netwrok])
  useEffect(() => {
    function updateScreenInfo(){
      const result = findOrientation()
      if(result != getMainData().screenOrientation){
        setMainData({screenOrientation:result})
      }
    }

    addEventListener("resize",updateScreenInfo)
    return () => {
      removeEventListener("resize",updateScreenInfo)
    }
  },[])

    
  return <div>
    <MainInfo></MainInfo>
    <Header></Header>
    <Sidebar></Sidebar>
  </div>
}

export default App
