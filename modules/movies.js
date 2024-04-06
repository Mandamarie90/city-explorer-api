const axios = require('axios');

async function getMovies(req, res) {
  const url = 'https://api.themoviedb.org/3/discover/movie';
  const apiKey = '194690844b4365335d34b2abf0f2929b'; // Replace with your MovieDB API key
  const options = {
    headers: {
      accept: 'application/json',
    }
  };

  try {
    const response = await axios.get(url, {
      ...options,
      params: {
        api_key: apiKey
      }
    });
    const data = response.data;
  
    const movies = data.results.map(movie => new Movie(movie));

    res.json(movies);
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
}

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.year = movieData.release_date ? new Date(movieData.release_date).getFullYear() : null;
    this.posterImage = movieData.poster_path ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : null;
  }
}

module.exports = getMovies;
