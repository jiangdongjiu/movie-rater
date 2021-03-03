import React from 'react';

function MovieList(props){

  const movieClicked = movie => evt => {
    props.movieClicked(movie);
  }

  return (
    <div>
      { props.movies && props.movies.map( movie => {
        return <h2 key={movie.id} onClick={movieClicked(movie)}>{movie.title}</h2>;
      })}
    </div>
  );
}

export default MovieList;