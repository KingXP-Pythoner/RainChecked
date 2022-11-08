
const fetch = require('node-fetch')
 const handler = async (event) => {
  const { lat, lon } = event.queryStringParameters
  const secretKey = process.env.REACT_WEATHER_KEY
  const url = process.env.REACT_WEATHER_URL
  try{
  const response = await fetch(`${url}${secretKey}&q=${lat},${lon}&num_of_days=7&tp=24&format=json`)
  const data = await response.json()
  console.log(data)
  return ({
  
     statusCode: 200,
     body: JSON.stringify(data)
    
 })
  }
  catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
 }

 module.exports = { handler }




 