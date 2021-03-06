import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';


function MovieForm(props) {

  const [ title, setTitle ] = useState(props.movie ? props.movie.title : null);
  const [ description, setDescription ] = useState(props.movie ? props.movie.description : null);
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    setTitle(props.movie.title);
    setDescription(props.movie.description);
  }, [props.movie]); //useState will not change when props.movie change, useEffect help with this kind of lifecycle hooks.

  const updateCLicked = () => {
    API.updateMovie(props.movie.id, {title, description}, token['mr-token']) // SHOTCUT, body should be an object like {title: title, description: description}.
    .then( resp => props.updatedMovie(resp))
    .catch( error => console.log(error));
  }

  const createCLicked = () => {
    API.createMovie({title, description}, token['mr-token']) // SHOTCUT, body should be an object like {title: title, description: description}.
    .then( resp => props.createdMovie(resp))
    .catch( error => console.log(error));
  }

  const isDisabled = title.length === 0 || description.length === 0;

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
            <button onClick={updateCLicked} disabled={isDisabled}>Update</button> :
            <button onClick={createCLicked} disabled={isDisabled}>Create</button>
          }
        </div>
      ): null}
    </React.Fragment>
  )
}
// we cannot change the props from parent in this child component.
export default MovieForm;