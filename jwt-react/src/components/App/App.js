import React, {useState} from 'react';
import { UserContext } from '../../contexts/userContext.js';
import './App.css';

import LoginPage from '../../pages/LoginPage.js';
import HomePage from '../../pages/HomePage.js';
import { logoutUser } from '../../api/auth.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);
  const isUserLoggedIn = () => {
    return !!user;
  }
  const logout = (event) => {
    event.preventDefault();
    logoutUser();
    setUser(null);
  }

  /* referring to <UserContext.Provider value={{user, setUser, isUserLoggedIn}}> and other instances.
  * since the values are stored as variables in context, it's not necessary to escape the values for XSS-sake.
  */
  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser, isUserLoggedIn}}>
        <Router>
          <Switch>
              <Route exact path="/login">
                <LoginPage/>
              </Route>
              <Route exact path="/">
                <HomePage/>
              </Route>
            </Switch>
        </Router>

      </UserContext.Provider>
    </div>
  );
}

export default App;
