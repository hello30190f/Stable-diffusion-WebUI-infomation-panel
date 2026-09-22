import type { MainData } from "../App"

type settings = {
    "useSetting": boolean,
    "network":{
        "updateInterval"  : number, // sec
        "ipAddress"       : string, 
        "port"            : number, 
        "protocol"        : string
    }
}

// read settings from the cookie if it does exists and not malformed.
export async function readSettings(){
    // Try to use a json setting file that saved on server root.
    let res:Response | null = null
    try{
        const url  = "https://" + window.location.host + "/settings.json"
        res  = await fetch(url)
    }catch{
        console.log("Retry to fetch server side settings without SSL/TLS.")
        const url  = "http://" + window.location.host + "/settings.json"
        res  = await fetch(url)
    }

    if(res.ok){
        const text = await res.text()
        try{
            let data:settings = JSON.parse(text)
            if(data.useSetting){
                return data.network
            }else{
                console.log("Server side settings is disabled. Retry with cookie data.")
            }
        }catch(error){
            console.log("Unable to read server side settings. Retry with cookie data.")
            console.log(res.status)
            console.log(error)
        }
    }else{
        console.log("Unable to read server side settings. Retry with cookie data.")
    }

    // Try to use cookie data
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
