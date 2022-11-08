//import imageBank
import {imageBank} from "../APIS/ImageBank"

const {rain, snow, clear, sunny, cloudy} = imageBank
 function paginateForecast(data){

    const datesArray = data.map((forecast)=> {
      function getIconFromDesc(res){
        let data = res.toLowerCase()
        if(data.includes("cloud") || data.includes("overcast")){
          return cloudy[0].icon.cloudIc
        }else if (data.includes("fog")){
          return cloudy[0].icon.fogIc
        }
        else if (data.includes("mist")){
          return cloudy[0].icon.mistIc
        }
        else if (data.includes("rain") || data.includes("drizzle") || data.includes("thunder")){
          return rain[0].icon
        } else if (data.includes("snow")){
          return snow[0].icon.snowIc
        }else if (data.includes("sleet")){
          return snow[0].icon.sleetIc
        } else if (data.includes("clear") || data.includes("clear/sunny")){
          return clear[0].icon
        } else if (data.includes("sun") || data.includes("sunny")){
          return sunny[0].icon
        }
      }
      return {date: forecast.date, temp: forecast.hourly[0].tempC, icon: getIconFromDesc(forecast.hourly[0].weatherDesc[0].value)}
    }
    
    )
    
      return datesArray;
    
    }
    export default paginateForecast;