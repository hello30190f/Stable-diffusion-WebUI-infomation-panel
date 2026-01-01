import './App.css'
import { create } from 'zustand'
import { Header } from './module/header'
import { MainInfo } from './module/mainInfo'
import { Sidebar } from './module/sidebar'


type MainData = {
  JSONdata: string | null,  // automaticly update 
  sidebar: boolean,         // false -> close, true -> open
  network:{
    updateInterval: number, // sec
    ipAddress: string, 
    port: number
  }
}

export const useMainData = create<MainData>((get,set) => ({
  JSONdata: null,
  sidebar: false,
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
