const fetch = require("node-fetch");
const handler = async (req, res) => {
  const { lat, lon } = req.query;
  console.log(process.NODE_ENV);
  const secretKey = process.env.REACT_LOCATE_VERCEL_KEY;
  const url = process.env.REACT_LOCATE_VERCEL_URL;
  try {
    const response = await fetch(
      `${url}?lat=${lat}&lon=${lon}&format=json&apiKey=${secretKey}`
    );
    const data = await response.json();

    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = handler;
