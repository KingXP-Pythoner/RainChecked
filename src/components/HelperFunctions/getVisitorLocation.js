import getVisitorWeather from "./getVisitorWeather"

const getVisitorLocation = async (lat, lon) => {
const weatherStats = []    

    const url = `https://raincheck.vercel.app/api/fetchLocation?lat=${lat}&lon=${lon}`
    const fetchres = await fetch(url).then(res => res.json())
    weatherStats.push(fetchres.results[0].city + ", " + fetchres.results[0].country)
    const weatherInfo = await getVisitorWeather(lat, lon)
  weatherStats.push(weatherInfo)
    return weatherStats

  } 
export default getVisitorLocation;
