'use strict';

async function getMovies( req,res ) {

  let fakeMovies = [
    {title:'We are all mad here'},
    {title:'You are all going to die down here'},
    {title:'What is this? Not a house!'}
  ];

  let movies = fakeMovies.map( movie => {
    return new Movie(movie);

  });

  res.json(movies);
}

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.year = movieData.year;
    this.posterImage = movieData.posterImage;
  }
}
module.exports = getMovies;
