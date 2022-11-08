import LightMIcon from "../assets/lightbulb-line.svg";
import ExitIconUL from "../assets/logout-box-fill.svg"
import  DarkModeIcon from "../assets/moon-clear-fill.svg"
import selectLocationIcon from "../assets/compass-3-fill.svg"
import { useRef, useEffect, useContext } from "react";

import { weatherContext } from "../App";

export default function NavMenu({togglerTheme}) {
    const toggle = useContext(weatherContext)
    const drkM = useRef(null);
    const lightM = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            drkM.current.scrollIntoView({ behavior: "smooth" });
        } else {
            lightM.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);
    
    function toggleTheme(event) {
        const {className} = event.target;
        if (className === "dm") {
            lightM.current.scrollIntoView({behavior: "smooth"});
        } else {
            drkM.current.scrollIntoView({behavior: "smooth"});
            
        }
    }
    return (
        <nav className="nav-container">

           
            <div className="dark-mode-icon">
                <div ref={drkM} title=" in Dark mode" className="btngrp">
                    <img  onClick={(e)=>{toggleTheme(e); togglerTheme(e)}} className="dm" src={DarkModeIcon} />

                </div>
                <div ref={lightM} title=" in Light mode" className="btngrp">
                    <img onClick={(e)=>{toggleTheme(e); togglerTheme(e)}} className="lm" src={LightMIcon} />

                </div>
            </div>
            <div title="search for a new location" className="btngrp">
                <img className="nav-search" onClick={() => toggle.setweatherData((prev) => ({ ...prev, clicked: true }))} src={selectLocationIcon} />

            </div>

            {/* ------EXIT BUTTON----- */}


            <div title="exit application" className="btngrp">
                <a href="https://google.com"><img src={ExitIconUL} /></a>

            </div>



        </nav>
    )
} 