
const fetch = require('node-fetch')
 const handler = async (req, res) => {
  const { lat, lon } = req.query
  const secretKey = process.env.REACT_WEATHER_VERCEL_KEY
  const url = process.env.REACT_WEATHER_VERCEL_URL
  try{
  const response = await fetch(`${url}${secretKey}&q=${lat},${lon}&num_of_days=7&tp=24&format=json`)
  const data = await response.json()

  res.status(200).send(JSON.stringify(data));
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
 }

 module.exports = handler




 