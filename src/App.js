import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm,  faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { useFetch } from './hooks/useFetch';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken] = useCookies(['mr-token']); // token I think should be name as cookies. it is like the session that have keys.
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]); //empty means it will run when app.js component did mount(run). it will run once.

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

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error loading movies: {error}</h1>
  // if a return happended, code below that return will not run.
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
