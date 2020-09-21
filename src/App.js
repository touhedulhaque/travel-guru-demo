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
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Book from './Components/Book/Book';
import Error from './Components/Error/Error';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import header from '../src/Components/Images/Image/header.png'
import DestinationDetail from './Components/DestinationDetail/DestinationDetail';

export const UserContext = createContext();



function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: '', 
    email: '',
    password: '',
    error: '',
    success: false,
    
  });

  return (
    <div style={{ backgroundImage: `url(${header})` }} className="header" >
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <div >
          <h2>Welcome  <span className="user-name">{loggedInUser.name}</span> </h2>
          <h6>Your logged-in email is: {loggedInUser.email}</h6>
        </div>
        <Router >
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
            <Route path="/destinationDetail/:id">
              <DestinationDetail />
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
            <Route path="*">
              <Error></Error>
            </Route>
          </Switch>
        </Router >
      </UserContext.Provider>
    </div>
  );
}

export default App;
