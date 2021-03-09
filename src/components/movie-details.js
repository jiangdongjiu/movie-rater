import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from "react-cookie";
import { API } from "../api-service";

function MovieDetails(props){

  let mov = props.movie;

  const [highLighted, setHighLighted] = useState(-1);
  const [token] = useCookies(['mr-token']);

  const highLightRate = highLightedIndex => evt => {
    setHighLighted(highLightedIndex);
  }
  const clickRate = clickIndex => evt => {
    API.rateMovie(mov.id, {stars: clickIndex+1}, token['mr-token'])
    .then( () => getdetails())
    .catch( error => console.log(error))
  }

  const getdetails = () => {
    API.getMovieDetails(mov.id, token['mr-token'])
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