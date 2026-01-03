import type { MainData } from "../App"

// read settings from the cookie if it does exists and not malformed.
export function readSettings(){
    for(const item of document.cookie.split(";")){
        if(!item.includes("stablediffusioninfomationpanelsettings"))continue
        const JSONstring = item.replace("stablediffusioninfomationpanelsettings=","")
        console.log(JSONstring)
        try{
            return JSON.parse(JSONstring)
        }catch{
            return null
        }
    }
    return null
}

// save settting to the cookie
export function saveSettings(data:MainData){
    document.cookie = "stablediffusioninfomationpanelsettings=" + JSON.stringify(data.network)
}

export function findOrientation(){
    const ratio = 1.0 * window.innerWidth / window.innerHeight
    // ratio bigger than 1 -> horizontal
    // ratio smaller than 1 -> vertical
    if(ratio >= 1){
        return "Horizontal"
    }else{
        return "Vertical"
    }
}
