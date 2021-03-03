import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': 'Token e9ddc5e91e1c82e33ca20a807f54238b766ada75' // need to be dynamic
      }
    })
    .then( resp => resp.json()) // convert it to json
    .then( resp => setMovies(resp)) // set movies
    .catch( error => console.log(error))
  }, []); //empty means it will run when app.js component did mount(run)

  const movieClicked = movie => {
    setSelectedMovie(movie);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>

      </header>
      <div className="Layout">
        <MovieList movies={movies} movieClicked={movieClicked}/>
        <MovieDetails movie={selectedMovie}/>
      </div>
    </div>
  );
}

export default App;
