import { useState, useEffect, useCallback, createContext } from 'react'
import NavMenu from './components/NavMenu'
import SearchDeploy from './components/SearchDeploy'
import UIRenderer from './components/UIRenderer'
import { imageBank } from './components/APIS/ImageBank'
import Locator from "./assets/map-pin.svg"
import getVisitorLocation from './components/HelperFunctions/getVisitorLocation'
import RotateLoader from 'react-spinners/RotateLoader'
import RCLogo from './assets/rainchecklogo.svg'


export const weatherContext = createContext()
export default function App() {
const [loading, setLoading] = useState(true)

const [spinner, setSpinner] = useState(true)
const [permDenied, setPermDenied] = useState(false)
// create useState variable that is an object containing whether button is clicked or not and the weather data of temp, pressure, humidity, wind speed, uv index and weather description
const [weatherData, setweatherData] = useState({city: "", clicked: false, weatherIcon: "", visible: false, temp: "", pressure: "", humidity: "", news: [], c_code: "",
 windSpeed: "", uvIndex: "", weatherDescription: "", weatherImg: "", feels_Like: "", newImg: "", w_icon: imageBank.defaultImg.icon })




 useEffect(() => {

if ('geolocation' in navigator){
    if(localStorage.hasOwnProperty("location")){
      setLoading(false)
      fetchVisitorLocation()
    }
    else{
      localStorage.setItem("location", true)
    localStorage.setItem("theme", "dark")
  }
  if(localStorage.getItem("theme") === "light"){
    document.body.style.background = "linear-gradient(90deg, #5891a9, #719c9f, #5681a2)"
  }else{
    localStorage.setItem("theme", "dark")
    document.body.style.background = "linear-gradient(180deg, #050912, #0d1113)"
  }
    }
    
 else{
 setPermDenied(true)
  
 }
 
}, [])



 const fetchVisitorLocation = useCallback(() => {

    const getVisitorCoord = async () => {

         
          // if prompt is brought up and user clicks allow, store this action in local storage so that usestate called loading is set to false next time

             const latLon = []
             const onSuccess = (position) =>{
                 latLon.push(position.coords.latitude, position.coords.longitude)

         getVisitorLocation(latLon[0], latLon[1]).then((data)=>{

setweatherData((prev)=>({...prev, ...data[1], city: data[0]}))
         })
         .then(()=>setSpinner(false))
     
             }
             const onError = (error) => {
                 setPermDenied(true)
                 console.log(error)
             }
             const options = {
                 enableHighAccuracy: true,
                 maximumAge: 10000,
                 timeout: 10000,
             }
             navigator.geolocation.getCurrentPosition((position)=>onSuccess(position), onError, options)

      

         
         }
getVisitorCoord()


}, [])


function setweatherDataProps(obj){
  setweatherData((prev)=>{
    return {...prev, ...obj}
  })
} 

function themeMode(e){

  const {className} = e.target
  if(className === "dm"){
    localStorage.setItem("theme", "light")
    document.body.style.background = "linear-gradient(90deg, #5891a9, #719c9f, #5681a2)"
  }
  else if (className === "lm"){
    localStorage.setItem("theme", "dark")
    document.body.style.background = "linear-gradient(180deg, #050912, #0d1113)"
  }
}
return (
   <div>
{  permDenied ? <div style={{width: "100vw", height: "100vh", background: "#141c21e4", padding: "10px"}}>
It looks like this browser's location access has been blocked! :( <br /> Please refresh or enable location access for this application.</div>:
loading ? <div style={{flexDirection: "column"}} className='initial-loader'> Please click the button below to grant access to your device's location for app functionality.
<br/>
 <img style={{display: "inline-block", marginTop: "30px", cursor: "pointer"}} src={Locator} onClick={()=>{setLoading(false); fetchVisitorLocation(); }} /></div>
  :(spinner )?<div className="initial-loader"><RotateLoader color="#09ffb5" /></div>
:<div  className="App">
 <weatherContext.Provider value={{weatherData, setweatherData}}>
 <img className="rc-logo" src={RCLogo} />
<NavMenu 
togglerTheme={themeMode}
/>

<UIRenderer /> 
 { weatherData.clicked === true && <SearchDeploy  setweatherData={setweatherDataProps} visible={weatherData.visible}
/> 
 } 
 </weatherContext.Provider>
    </div>}
    </div>
  )
}