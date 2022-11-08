const fetch = require('node-fetch')
const handler = async (event) => {

    const secretKey = process.env.REACT_NEWS_KEY
    const url = process.env.REACT_NEWS_URL
    try{
    const response = await fetch(`${url}${secretKey}`)
    const data = await response.json()
    return {
   
       statusCode: 200,
       body: JSON.stringify(data)
       
   }
    }
    catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
   }
   
   module.exports = { handler }
   