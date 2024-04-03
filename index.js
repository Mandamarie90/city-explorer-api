const express = require('express');
const app = express();


app.get('/', (request, response) => {
  response.send('<h1>This is some html!</h1>');
});
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

const cityWeatherData = [
  { date: '2022-04-01', description: 'Sunny' },
  { date: '2022-04-02', description: 'Cloudy' },
  { date: '2022-04-03', description: 'Rainy' }
];

const forecasts = cityWeatherData.map(data => {
  return new Forecast(data.date, data.description);
});


app.get('/weather', (req, res) => {
  res.json(forecasts);
});

// Mock for cities
const cities = [
  { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Amman', lat: 31.9454, lon: 35.9284 }
];

const getCityInfo = (lat, lon) => {
  return cities.find(city => city.lat === parseFloat(lat) && city.lon === parseFloat(lon));
};


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
