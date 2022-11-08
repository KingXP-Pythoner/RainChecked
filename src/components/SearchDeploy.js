import React from "react";
import { useState, useEffect } from "react"
import CitySearch from "./Locator/CitySearch.js";
import cities from 'cities.json'
import paginateForecast from "./HelperFunctions/forecastMapFunction.js";
import ClipLoader from "react-spinners/ClipLoader";

function SearchDeploy({setweatherData}) {
  
  //******(USESTATES)***** */

   //...(useState Hooks to do with Cities).....
   
  const [cityList, setcityList] = useState(cities);
  const [cityDropList, setcityDropList] = useState({cityData: [] });
  const [inputChar, setinputChar] = useState("");
  const [selectedCity, setselectedCity] = useState(
    { name: "", countryCode: "", lat: "", lng: "", news: [] })
    const [search, setSearch] = useState(0)
// usestate hook to store object with keys of current temperature, current humidity, current uv index, weather description fetched from API
const [apidata, setapidata] = useState("")

const [emptyInput, setemptyInput] = useState(false)
//...............USEEFFECT Hooks....................................

 // Filter city list for Cities that match what is being typed in the box
useEffect(() => {
if (inputChar.length !== null) {
const city_DL = cityList.filter((item)=>{

  return item.name.toLowerCase()===inputChar.toLowerCase()

})
setcityDropList((prev)=>({
  ...prev, cityData: city_DL
}))
} else {
  return}
}, [inputChar])

useEffect(() => {


const fetchWeather = async () => {
 try{ const apiRes = await  fetch(`/.netlify/functions/fetchWeather?lat=${selectedCity.lat}&lon=${selectedCity.lng}`).then(res => res.json())
  setapidata(apiRes.data)
}
catch(err){
  console.log("TEST2 FETCH ERROR: " + err)
}
}
fetchWeather()


}, [selectedCity])


 //.................EVENT HANDLERS............................................
  
  // When User is typing in the city............
  function getIncomingChar(e){

const timeout = setTimeout(() =>{
  setinputChar(e.target.value)}, 2000)
  return () => clearTimeout(timeout)
  }
// When users click a city in the dropdown list
function handleListOptClick(e){
setselectedCity((prev)=>{
    const lat = e.target.getAttribute("data-lat")
  const long = e.target.getAttribute("data-long")
    const latitude = parseFloat(lat)
    const longitude = parseFloat(long)
    
    return {
    ...prev, name:e.target.innerHTML, countryCode:e.target.id,
     lat: latitude, lng: longitude
  }})

}

function validateSearchAction(){
  setSearch((prev)=>prev+=0.1)
  selectedCity.lat == "" ? setemptyInput(true) : setemptyInput(false)
}

  return (
    <div className="test2-blur-overlay">
    


<div className="test2-container">
       <CitySearch
       dropdownList={cityDropList}
       getCityname={getIncomingChar}
       emptyInput ={emptyInput}
       onListClick={handleListOptClick}
      /> 
{apidata.current_condition? <button onClick={()=>{validateSearchAction(); 
  setweatherData({ c_code: selectedCity.countryCode, clicked: false, visible: false, temp: apidata.current_condition[0].temp_C +"°C", pressure: apidata.current_condition[0].pressure,
   humidity: apidata.current_condition[0].humidity, windSpeed: apidata.current_condition[0].windspeedKmph, 
   uvIndex: apidata.current_condition[0].uvIndex, weatherDescription: apidata.current_condition[0].weatherDesc[0].value,
   feels_Like: apidata.current_condition[0].FeelsLikeC, forecastDates: paginateForecast(apidata.weather) })}}>SEARCH</button>:
<div style={{margin: "10px auto"}}><ClipLoader color={"#38c7b2"} loading={true} size={"10px"} /></div>
}
</div>
{/* create close button using font awesome for overlay */}
<div className="location-search-close-btn">
    <i onClick={()=>setweatherData({ clicked: false})} className="fas fa-times"></i>
    </div>
</div>
  )

}
export default React.memo(SearchDeploy)