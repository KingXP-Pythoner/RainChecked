import MapPinIcon from "../../assets/map-pin.svg";
import { useEffect, useContext } from "react";
import { weatherContext } from "../../App";
import { imageBank } from "../APIS/ImageBank";
import ReactSpeedometer from "react-d3-speedometer"
import Transition from "react-d3-speedometer"
import random from "random";
import { nanoid } from "nanoid";
export default function Weather() {
    //destructure and consume weather data from context

    const update = useContext(weatherContext)
    const {weatherData, setweatherData} = update
    const { forecastDates } = weatherData
    const { rain, snow, clear, sunny, cloudy, defaultImg } = imageBank

    // ----------ALL HOOKS AND FUNCTIONS--------------------------------------------------------------------------------------
    function showWeeklyList() {
        if (forecastDates){
        const mapWeekPred = forecastDates.map((item) => {

            function convertDatetoDayName(date) {
                const dayName = new Date(date).toLocaleString("en-us", { weekday: "long" })
                return dayName
            }
            const { icon, temp, date } = item
            return (
                <div className="itm-box" key={nanoid(33)}>
                    <div className="itm-box-inner">
                        <img src={icon} className="icon" />
                        <span>{temp} °C</span>
                    </div>
                    <span>{convertDatetoDayName(date)}</span>
                </div>
            )
        })
        return mapWeekPred
    }
    else {
        return <div className="no-data">No Data</div>

    }
    
}

    // Weather Functions here-------------------
    //     // if statement function to see if weatherdescription of weatherdata includes certain keywords: rain or rainy or drizzle, snow, cloudy or fog or mist, sunny or sun, clear/sunny or clear
    // create constant variable that only runs if weatherdata.weatherdescription is not empty or ""


useEffect(() => {
        
            const desc = weatherData.weatherDescription.toLowerCase()
            if (desc.includes("rain") || desc.includes("thunder") || desc.includes("drizzle") || desc.includes("shower")) {
                // return random image from rain array
                setweatherData((prev) => ({
                    ...prev, w_icon: rain[random.int(0, rain.length)].icon,
                    newImg: rain[random.int(0, rain.length)].src
                }))
            } else if (desc.includes("snow") || desc.includes("blizzard")) {
                // return random image from snow array
                setweatherData((prev) => ({
                    ...prev, w_icon: snow[random.int(0, snow.length)].icon.snowIc,
                    newImg: snow[random.int(0, snow.length)].src
                }))
            }
            else if (desc.includes("sleet") || desc.includes("hail")) {
                // return random image from sleet array
                setweatherData((prev) => ({
                    ...prev, w_icon: snow[random.int(0, snow.length)].icon.sleetIc,
                    newImg: snow[random.int(0, snow.length)].src
                }))
            }
            else if (desc.includes("cloudy") || desc.includes("overcast")) {
                // return random image from cloudy array
                setweatherData((prev) => ({
                    ...prev, w_icon: cloudy[random.int(0, cloudy.length)].icon.cloudIc,
                    newImg: cloudy[random.int(0, cloudy.length)].src
                }))
            }
            else if (desc.includes("fog") || desc.includes("haze")) {
                // return random image from cloudy array
                setweatherData((prev) => ({
                    ...prev, w_icon: cloudy[random.int(0, cloudy.length)].icon.fogIc,
                    newImg: cloudy[random.int(0, cloudy.length)].src
                }))
            }
            else if (desc.includes("mist")) {
                // return random image from cloudy array
                setweatherData((prev) => ({
                    ...prev, w_icon: cloudy[random.int(0, cloudy.length)].icon.mistIc,
                    newImg: cloudy[random.int(0, cloudy.length)].src
                }))
            }
            else if (desc.includes("sunny") || desc.includes("sun")) {
                // return random image from sunny array
                setweatherData((prev) => ({ ...prev, w_icon: sunny[random.int(0, sunny.length)].icon, newImg: sunny[random.int(0, sunny.length)].src }))
            }
            else if (desc.includes("clear") || desc.includes("sky")) {
                // return random image from sunny array
                setweatherData((prev) => ({ ...prev, w_icon: clear[random.int(0, clear.length)].icon, newImg: clear[random.int(0, clear.length)].src }))
            }

            else {
                // return random image from defaultImg array
                setweatherData((prev) => ({ ...prev, w_icon: defaultImg.icon, newImg: defaultImg.src }))
            }
        

        

    }, [weatherData.weatherDescription])


    //----------ALL JSX RETURNS-------------------------------------
    return (
        <>
            <div className="weather-container">

                <div className="weatherhud">
                    <img title="image attributed to Pexels" src={weatherData.newImg} className="weatherimage" />

                        <div className="wrap-1">
                            <img src={MapPinIcon} alt="location icon" />
                            <span className="curr-location">{weatherData.city} </span>

                        </div>

                    <div className="weatherstats">
                        <div className="curr-temp">
                            <img src={weatherData.w_icon} alt={weatherData.weatherDescription} />
                            <span>
                                {weatherData.temp}
                            </span>
                        </div>
                        <span className="curr-description">{weatherData.weatherDescription}</span>
                        <div className="indepth-stat-wrapper">
                            <div className="indepth-stat">
                                <span className="desc feels">Feels Like °C</span>

                                <ReactSpeedometer
                                    maxValue={100}
                                    value={Number(weatherData.feels_Like)}
                                    needleColor="#d8ebe8"
                                    textColor="rgba(53, 239, 183, 0.776)"
                                    ringWidth={10}
                                    needleHeightRatio={0.6}
                                    startColor="#aec2d1"
                                    segments={1000}
                                    width={100}

                                    maxSegmentLabels={0}
                                    needleTransition={Transition.easeCubicInOut}
                                    needleTransitionDuration={3000}
                                    endColor="#10e6a9"
                                />
                            </div>
                            <div className="indepth-stat">
                                <span className="desc humidity">Humidity %</span>
                                <ReactSpeedometer
                                    maxValue={100}
                                    value={Number(weatherData.humidity)}
                                    needleColor="#d8ebe8"
                                    ringWidth={10}
                                    needleHeightRatio={0.6}
                                    textColor="rgba(53, 239, 183, 0.776)"
                                    startColor="#aec2d1"
                                    segments={1000}
                                    width={100}

                                    maxSegmentLabels={0}
                                    needleTransition={Transition.easeCubicInOut}
                                    needleTransitionDuration={3000}
                                    endColor="#10e6a9"
                                />

                            </div>
                            <div className="indepth-stat">
                                <span className="desc windspeed">Wind Speed Km/H</span>
                                <ReactSpeedometer
                                    maxValue={408}
                                    value={Number(weatherData.windSpeed)}


                                    needleColor="#d8ebe8"
                                    ringWidth={10}
                                    needleHeightRatio={0.6}
                                    startColor="#aec2d1"
                                    textColor="rgba(53, 239, 183, 0.776)"
                                    segments={2000}
                                    maxSegmentLabels={0}
                                    width={100}
                                    needleTransition={Transition.easeCubicInOut}
                                    needleTransitionDuration={3000}
                                    endColor="#10e6a9"
                                />
                            </div>
                            <div className="indepth-stat">
                                <span className="desc uv">UV Index</span>

                                <ReactSpeedometer maxValue={10} value={Number(weatherData.uvIndex)} needleColor="#d8ebe8"
                                    ringWidth={10} needleHeightRatio={0.6} startColor="#aec2d1"
                                    textColor="rgba(53, 239, 183, 0.776)" segments={2000} maxSegmentLabels={0} width={100} needleTransition={Transition.easeCubicInOut}
                                    needleTransitionDuration={3000}
                                    endColor="#10e6a9"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------WEEKLY PREDICTION---------------------------------------- */}
                <div className="wk-prediction-container">
                    <span className="wk-pd-title"></span>
                    <div className="tile-wrapper">
                        {forecastDates && showWeeklyList()}
                    </div>
                </div>
            </div>
        </>
    )
}