//async function snippet
import getVisitorLocation from "./getVisitorLocation"
const getVisitorCoord = async () => {

    if('geolocation' in navigator){
        const latLon = []
        const onSuccess = (position) =>{
            latLon.push(position.coords.latitude)
      latLon.push(position.coords.longitude)
    getVisitorLocation(latLon[0], latLon[1])

        }
        const onError = (error) => {
            console.log(error)
        }
        const options = {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000,
        }
        navigator.geolocation.getCurrentPosition((position)=>onSuccess(position), onError, options)
        
    }
    else{
        console.log("Geolocation not available")
    }
    }
    export default getVisitorCoord;