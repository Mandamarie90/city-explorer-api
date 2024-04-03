const express = require('express');
const app = express();

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

// Static weather data for a city (replace with actual data)
const cityWeatherData = [
  { date: '2022-04-01', description: 'Sunny' },
  { date: '2022-04-02', description: 'Cloudy' },
  { date: '2022-04-03', description: 'Rainy' }
];

// Create an array of Forecast objects from the cityWeatherData
const forecasts = cityWeatherData.map(data => {
  return new Forecast(data.date, data.description);
});

// Define the /weather endpoint
app.get('/weather', (req, res) => {
  // Send the array of Forecast objects as JSON response
  res.json(forecasts);
});

// Mock data for cities
const cities = [
  { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Amman', lat: 31.9454, lon: 35.9284 }
];

// Function to get city information based on lat and lon
const getCityInfo = (lat, lon) => {
  return cities.find(city => city.lat === parseFloat(lat) && city.lon === parseFloat(lon));
};
// Define an error handling middleware function
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace

  // Check if the error is a known error type with a status code
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    // If the error is unknown or unexpected, send a generic 500 error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Register the error handling middleware function with Express
app.use(errorHandler);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
