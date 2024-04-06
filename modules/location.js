'use strict';

const axios = require('axios');

// Cache object to store location data
const locationCache = {};

async function getLocation(req, res) {
  let city = req.query.city;
  let cachedLocation = locationCache[city];

  // Check if location data is already cached
  if (cachedLocation) {
    console.log('Using cached data for:', city);
    res.json(cachedLocation);
    return;
  }

  let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${city}&format=json`;

  try {
    let axiosResponse = await axios.get(url);
    let locationData = axiosResponse.data;
    let location = new Location(locationData[0]);

    // Cache the location data for future use
    locationCache[city] = location;

    res.json(location);
  } catch (error) {
    console.error('Error fetching location data:', error);
    res.status(500).json({ error: 'Error fetching location data' });
  }
}

class Location {
  constructor(locationData) {
    this.name = locationData.display_name;
    this.latitude = locationData.lat;
    this.longitude = locationData.lon;
  }
}

module.exports = getLocation;

