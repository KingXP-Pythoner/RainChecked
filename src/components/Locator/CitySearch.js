import React, { useState, useEffect, useContext, useRef } from "react"
import { nanoid } from "nanoid"
import CountryList from "../CountryList.js"
import { weatherContext } from "../../App.js"
 function CitySearch({onListClick, getCityname, dropdownList, emptyInput}) {

    const update = useContext(weatherContext)
    const [inputBx, setinputBx] = useState(false)
    const currentinput = useRef("")
    const [countryDlist, setcountryDlist] = useState(null)

    useEffect(() => {
    setcountryDlist((prev)=>{
        let countryDL = [];
        for(var i=0;i<CountryList.data.length;i++){
            for(var j=0; j<dropdownList.cityData.length;j++)
            if(CountryList.data[i].sortname===dropdownList.cityData[j].country){

                countryDL.push(CountryList.data[i].country_name)
            }
        }
        return countryDL
    })
    }, [dropdownList])
    
    
     const showList = dropdownList.cityData.map((item, index)=>{
         return (
             <div data-lat={item.lat} data-long={item.lng} 
             onClick={(e)=>{setInputValue(e); onListClick(e); toggleBtn(); update.setweatherData((prev)=>({...prev,c_code: item.country, city: item.name +","+" " +countryDlist[index]}))}}
             className="hoveritems" id={item.country} key={nanoid(30)}>{item.name}, {countryDlist[index]}</div>
         )
     })
function setInputValue(e){
    currentinput.current = e.target.innerHTML

}
    function changeInput(e) {
        e.preventDefault()
        currentinput.current = e.target.value
        setinputBx(true)
    }
    function toggleBtn() {
        setinputBx(!inputBx)
    }

    return (
        <div className="input-container">
<label htmlFor="cityInput">
Enter a city: <input
    onClick={toggleBtn}
    id="cityInput"
    placeholder="Example: Lagos"
    type="search"
    ref={currentinput}
            style={{"textTransform": "capitalize"}}
    onChange={(e) => { changeInput(e); getCityname(e)}} />
</label>
{inputBx && <div className="hoveritems-container">
        {showList}
    </div>}
    {emptyInput === true && <div ><i style={{fontSize: "13px", marginTop: "19px"}}>Please type in a city and select among the options</i></div>}
        </div>
    )
}
export default React.memo(CitySearch)