import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [trashedMovie, setTrashedMovie] = useState(null);

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

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const trashCLicked = movie => {
    setTrashedMovie(movie);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id){
        return movie;
      }
      return mov;
    })

    setMovies(newMovies);
  }

  // to create a new movie record
  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const createdMovie = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="Layout">
        <div>
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} trashCLicked={trashCLicked}/>
          <button onClick = { newMovie }>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        { editedMovie ?
          <MovieForm movie={editedMovie} updatedMovie={updatedMovie} createdMovie={createdMovie}/>
           : null }
      </div>

    </div>
  );
}

export default App;
