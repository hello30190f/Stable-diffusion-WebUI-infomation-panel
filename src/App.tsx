import './App.css'
import { create } from 'zustand'
import { Header } from './module/header'
import { MainInfo } from './module/mainInfo'
import { Sidebar } from './module/sidebar'


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
  JSONdata: StableDiffusionWebUIapiJSON | null,  // automaticly update 
  sidebar: boolean,         // false -> close, true -> open
  view:string,              // "main" or "raw" -> change text info
  network:{
    updateInterval: number, // sec
    ipAddress: string, 
    port: number
  }
}

export const useMainData = create<MainData>((get,set) => ({
  JSONdata: null,
  sidebar: false,
  view: "main",
  network:{
    updateInterval: 1.0 / 10, // 10 FPS 
    ipAddress: "localhost",
    port:7860
  }
}))

function App() {
  return <div>
    <MainInfo></MainInfo>
    <Header></Header>
    <Sidebar></Sidebar>
  </div>
}

export default App
