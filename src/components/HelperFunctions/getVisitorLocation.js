import getVisitorWeather from "./getVisitorWeather"
import CountryList from "../CountryList.js"

// function that takes in a country code and returns the country name by matching the code to whatever object sortname property is equal to the code
const codeToCountry = (code) => {
    const countryDB = CountryList.data
    const country = countryDB.find((item) => {
        return item.sortname.toLowerCase() === code.toLowerCase()
    })
    return country.country_name
}

const getVisitorLocation = async (lat, lon) => {
const weatherStats = []    

    const url = `http://www.geoplugin.net/extras/location.gp?lat=${lat}&lon=${lon}&format=json`
    const fetchres = await fetch(url)
    const data = await fetchres.json()
    let country = codeToCountry(data.geoplugin_countryCode)
    weatherStats.push(data.geoplugin_place + ", " + data.geoplugin_region + ", " + country)
    const weatherInfo = await getVisitorWeather(lat, lon)
  weatherStats.push(weatherInfo)

    return weatherStats


  } 
export default getVisitorLocation;