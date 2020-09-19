import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import News from './Components/News/News';
import Destination from './Components/Destination/Destination';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Book from './Components/Book/Book';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div>
      <h2>Welcome to <span className="user-name">{loggedInUser.name}</span> </h2>
      <h4>Your logged-in email is: {loggedInUser.email}</h4>
      </div>
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/destination">
            <Destination />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/book">
            <Book />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router >
    </UserContext.Provider>
  );
}

export default App;
