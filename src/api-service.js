export class API {
  static getMovie(token) {
    return fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token}` // need to be dynamic
      }
    })
    .then( resp => resp.json()) // convert it to json
  }

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

  static registerUser(body) {
    return fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json())
  }

  static updateMovie(movie_id, body, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token}` // need to be dynamic
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json()) // convert it to json, selected movie
  }

  static createMovie(body, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token}` // need to be dynamic
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json()) // convert it to json, selected movie
  }

  static deleteMovie(movie_id, token) {
    return fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}` // need to be dynamic
      }
    })
  }
}