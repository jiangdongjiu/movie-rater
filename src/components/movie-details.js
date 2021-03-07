import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie";

function MovieDetails(props){

  let mov = props.movie;

  const [highLighted, setHighLighted] = useState(-1);
  const [token] = useCookies(['mr-token']);

  const highLightRate = highLightedIndex => evt => {
    setHighLighted(highLightedIndex);
  }
  const clickRate = clickIndex => evt => {
    fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token['mr-token']}` // need to be dynamic
      },
      body: JSON.stringify( {stars: clickIndex+1} ) // body need json type, {something:something} is an object.
    })
    .then( () => getdetails())
    .catch( error => console.log(error))
  }

  const getdetails = () => {
    fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token['mr-token']}` // need to be dynamic
      }
    })
    .then( resp => resp.json()) // convert it to json, selected movie
    .then( resp => props.updateMovie(resp)) // changed the selected movie data. tell parent to update.
    .catch( error => console.log(error))
  }

  return (
    <React.Fragment>
      { mov ? (
        <div>
          <h1>{mov && mov.title}</h1>
          <p>{mov && mov.description}</p>
          <FontAwesomeIcon icon={faStar} className={mov.average_of_ratings > 0 ? "orange" : ""}/>
          <FontAwesomeIcon icon={faStar} className={mov.average_of_ratings > 1 ? "orange" : ""}/>
          <FontAwesomeIcon icon={faStar} className={mov.average_of_ratings > 2 ? "orange" : ""}/>
          <FontAwesomeIcon icon={faStar} className={mov.average_of_ratings > 3 ? "orange" : ""}/>
          <FontAwesomeIcon icon={faStar} className={mov.average_of_ratings > 4 ? "orange" : ""}/>
          ({mov.number_of_ratings})
          <div className="rate-container">
            <h2>Rate it</h2>
            { [...Array(5)].map( (e, i) => {
              return <FontAwesomeIcon key={i} icon={faStar} className={highLighted > i - 1 ? "purple" : ""}
                      onMouseEnter={highLightRate(i)}
                      onMouseLeave={highLightRate(-1)}
                      onClick={clickRate(i)}
              />
            })}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default MovieDetails;