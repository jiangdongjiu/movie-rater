import env from "react-dotenv";

const URL = env['API_URL'];
export class API {
  static getMovie(token) {
    return fetch(`${URL}/api/movies/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token}` // need to be dynamic
      }
    })
    .then( resp => resp.json()) // convert it to json
  }

  static loginUser(body) {
    return fetch(`${URL}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json()) // convert it to json, selected movie
  }

  static registerUser(body) {
    return fetch(`${URL}/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
      },
      body: JSON.stringify( body )
    })
    .then( resp => resp.json())
  }

  static updateMovie(movie_id, body, token) {
    return fetch(`${URL}/api/movies/${movie_id}/`, {
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
    return fetch(`${URL}/api/movies/`, {
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
    return fetch(`${URL}/api/movies/${movie_id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}` // need to be dynamic
      }
    })
  }

  static rateMovie(movie_id, body, token) {
    return fetch(`${URL}/api/movies/${movie_id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token}` // need to be dynamic
      },
      body: JSON.stringify( body ) // body need json type, {something:something} is an object.
    })
  }

  static getMovieDetails(movie_id, token) {
    return fetch(`${URL}/api/movies/${movie_id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // it means it will send the get requrest and receive json data
        'Authorization': `Token ${token}` // need to be dynamic
      }
    })
    .then( resp => resp.json())
  }
}