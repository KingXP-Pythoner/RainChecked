
const fetch = require('node-fetch')
const handler = async (event) => {
 const { lat, lon } = event.queryStringParameters
 const secretKey = process.env.REACT_LOCATE_KEY
 const url = process.env.REACT_LOCATE_URL
 try{
 const response = await fetch(`${url}?lat=${lat}&lon=${lon}&format=json&apiKey=${secretKey}`)
 const data = await response.json()

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




