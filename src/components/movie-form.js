import React, { useState, useEffect } from 'react';
import { API } from '../api-service';

function MovieForm(props) {

  const [ title, setTitle ] = useState(props.movie ? props.movie.title : null);
  const [ description, setDescription ] = useState(props.movie ? props.movie.description : null);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [input]);

  const updateCLicked = () => {
    API.updateMovie(props.movie.id, {title, description}) // SHOTCUT, body should be an object like {title: title, description: description}.
    .then( resp => props.updatedMovie(resp))
    .catch( error => console.log(error));
  }

  const createCLicked = () => {
    API.createMovie({title, description}) // SHOTCUT, body should be an object like {title: title, description: description}.
    .then( resp => props.createdMovie(resp))
    .catch( error => console.log(error));
  }

  return (
    <React.Fragment>
      { props.movie ? (
        <div>
          <label htmlFor="title">Title</label><br/>
          <input id="title" type="text" placeholder="title" value={title}
                onChange={ evt => setTitle(evt.target.value) }
          /><br/>
          <label htmlFor="description">Description</label><br/>
          <textarea id="description" type="text" placeholder="description"
                value={description} onChange={ evt => setDescription(evt.target.value) }
          /><br/>
          { props.movie.id ?
            <button onClick={ updateCLicked }>Update</button> :
            <button onClick={ createCLicked }>Create</button>
          }
        </div>
      ): null}
    </React.Fragment>
  )
}
// we cannot change the props from parent in this child component.
export default MovieForm;