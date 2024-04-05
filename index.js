'use strict';


require('dotenv').config();
const express= require('express');
const cors= require('cors');

const getLocation = require('./modules/location.js');
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');

const app= express();

app.use(cors());

app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('*', handleNotFound);

function handleNotFound(req, res) {
  res.status(404).send('We are all mad here.');
}



function startServer() {
  let PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`All good here ${PORT}`);
  });
}

module.exports = {
  handleNotFound: handleNotFound
};


startServer();

