import React, { useState } from "react";
import { API } from '../api-service';

function Auth() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginCLicked = () => {
    API.loginUser({username, password})
      .then( resp => console.log(resp.token))
      .catch( error => console.log(error));
  }

  return (
    <div>
      <label htmlFor="username">Username</label><br/>
      <input id="username" type="text" placeholder="username" value={username}
            onChange={ evt => setUsername(evt.target.value) }
      /><br/>
      <label htmlFor="password">Password</label><br/>
      <input id="password" type="password" placeholder="password"
            value={password} onChange={ evt => setPassword(evt.target.value) }
      /><br/>
      <button onClick={ loginCLicked }>Login</button>
    </div>
  )
}

export default Auth;