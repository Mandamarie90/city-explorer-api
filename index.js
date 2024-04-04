const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const app = express();

app.get('/', (request, response) => {
  response.send('<h1>This is working!</h1>');
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const weatherData = await fetchWeatherData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const fetchWeatherData = async (lat, lon) => {
  try {
    // Make a request to your weather API here
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${lat},${lon}&days=3`);
    // Extract relevant data from the response and shape it
    const forecasts = response.data.forecast.forecastday.map(day => {
      const date = day.date;
      const description = day.day.condition.text;
      return new Forecast(date, description);
    });
    return forecasts;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
