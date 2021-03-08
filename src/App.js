import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm,  faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken] = useCookies(['mr-token']); // token I think should be name as cookies. it is like the session that have keys.

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token['mr-token']}` // need to be dynamic
      }
    })
    .then( resp => resp.json()) // convert it to json
    .then( resp => setMovies(resp)) // set movies
    .catch( error => console.log(error))
  }, []); //empty means it will run when app.js component did mount(run). it will run once.

  useEffect(() => {
    console.log(token)
    if (!token['mr-token']) window.location.href = '/';
  }, [token]);

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const removeCLicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
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

  const logoutUser = () => {
    setToken('mr-token', '');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm}/>
          <span> Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="Layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeCLicked={removeCLicked}
          />
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
