 import paginateForecast from "./forecastMapFunction"
var apiObject
 const getVisitorWeather = async (lat, lon) => {

const api = await fetch(`/.netlify/functions/fetchWeather?lat=${lat}&lon=${lon}`)
 .then(res => res.json())

    apiObject = {clicked: false, visible: false, temp: api.data.current_condition[0].temp_C +"°C", pressure: api.data.current_condition[0].pressure,
  humidity: api.data.current_condition[0].humidity, windSpeed: api.data.current_condition[0].windspeedKmph, 
  uvIndex: api.data.current_condition[0].uvIndex, weatherDescription: api.data.current_condition[0].weatherDesc[0].value,
  feels_Like: api.data.current_condition[0].FeelsLikeC,
  forecastDates: paginateForecast(api.data.weather)}

 return apiObject //api object is returned to the getVisitorLocation function

 }
 export default getVisitorWeather;

