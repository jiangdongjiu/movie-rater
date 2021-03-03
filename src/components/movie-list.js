import React from 'react';

function MovieList(props){
  return (
    <div>
      { props.movies && props.movies.map( movie => {
        return <h2 key={movie.id}>{movie.title}</h2>;
      })}
    </div>
  )
}

export default MovieList;