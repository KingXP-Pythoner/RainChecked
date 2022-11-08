import Weather from "./InnerComponents/Weather"
import News from "./InnerComponents/News"
import React from "react"

export default function Home() {
  
    return(
        <>

        <div className="home-container">
        
            <Weather />
            <div className="sideapi-container">
                <News />
            </div>
        </div>
        </>
    )
}