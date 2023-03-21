import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
// import { CsrfToken } from 'django-react-csrftoken';

import { UserContext } from '../../contexts/userContext.js'
import { loginUser, logoutUser } from '../../api/auth.js'

// Hook to get query params.
// this could be refactored to somewhere else for future contributors.
function useQueryParams () {
  return new URLSearchParams(useLocation().search);
}

import CSRFToken from '../../csrftoken.js';

function Login() {
  const queryParams = useQueryParams();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const {user, setUser, isUserLoggedIn} = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorDisplay, setErrorDisplay] = useState("")

  const onLoginFormSubmit = (event) => {
    event.preventDefault();
    // // if (!isValidForm()){
    // //   return
    // // }
    // // loginUser(username, password).then((data)=>{
    // //   setUser({username: username})
    // //   history.push(getRouteAfterLogin());
    // // }).catch((error)=> {
    // //   setErrorDisplay()
    // // })
    // // const responee 
    // async function postData() {
    //   const response = await fetch('http://localhost:8000/accounts/login/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({email: email, password: password})
    //     })
    //   const data = await response.json()
    //   setUser({email: email})
    // }

    // postData()
    // .catch((error)=> {
    //   setErrorDisplay(error)
    // })
    console.log({email: email, password: password})
    fetch('http://127.0.0.1:8000/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUser({email: email})
      })
      .catch((error)=> {
        console.log(error)
      }
    )

  }

  const getRouteAfterLogin = () => {
    let route = queryParams.get("next")
    if (route === null) {
      route = "/";
    }
    return route
  }

  const isValidForm = () => {
    setErrorDisplay("")
    if (email === "" || password === ""){
      setErrorDisplay("username and password can't be empty. try user: test, password: test")
      return false;
    }
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    logoutUser()
    setUser(null);
  }
  return <div>
    <form onSubmit={onLoginFormSubmit} method="POST">
      <CSRFToken />
      <div>
        <label>Email</label>
        <input
          onChange={(event)=>{setEmail(event.target.value)}}
          type="text"
          id="email"
          name="email"/>
      </div>
      <br/>
      <div>
        <label>Password</label>
        <input
          onChange={(event)=>{setPassword(event.target.value)}}
          type="text"
          id="password"
          name="password"/>
      </div>
      <button type="submit">login</button>
      <p style={{color: 'red'}}>{errorDisplay}</p>
    </form>
  </div>
}

export default Login;
