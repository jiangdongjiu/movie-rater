const TOKEN = "e9ddc5e91e1c82e33ca20a807f54238b766ada75"

export class API {

  static loginUser(body) {
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json()) // convert it to json, selected movie
  }

  static updateMovie(movie_id, body) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${TOKEN}` // need to be dynamic
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json()) // convert it to json, selected movie
  }

  static createMovie(body) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${TOKEN}` // need to be dynamic
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json()) // convert it to json, selected movie
  }

  static deleteMovie(movie_id) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${TOKEN}` // need to be dynamic
      }
    })
  }
}