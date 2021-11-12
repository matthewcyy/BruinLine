<<<<<<< Updated upstream
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
=======
import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import Home from './components/Dashboard/Home/Home';
import Profile from './components/Dashboard/Profile/Profile';
import Rankings from './components/Dashboard/Rankings/Rankings';
import DiningHalls from './components/Dashboard/DiningHalls/DiningHalls';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
>>>>>>> Stashed changes

function Home() {
  return <h2> HOME </h2>;
}

function DiningHalls() {
  return <h2> DINING HALLS </h2>;
}

function Rankings() {
  return <h2> RANKINGS </h2>;
}

function Profile() {
  return <h2> PROFILE </h2>;
}

function App() {
  return (
<<<<<<< Updated upstream
    <Router>
      <div className="App-menu">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/DiningHalls">Dining Halls</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/Rankings">Rankings</Link>
            </li>
          </ul>
        </nav>
=======
    <BrowserRouter>
    <div className="nav">
      <Link to="/">
        <button type="button" className="button1">
          Home
        </button>
      </Link>
      
      <Link to="/register">
      <button type="button" className="button1">
      Register
      </button>
      </Link> 
      <Link to="/login">
      <button type="button" className="button1">
      Login
      </button>
      </Link>
      <Link to="/dininghalls">
      <button type="button" className="button1">
      Dining Halls
      </button>
      </Link>
      <Link to="/home">
      <button type="button" className="button1">
      Home
      </button>
      </Link>
      <Link to="/profile">
      <button type="button" className="button1">
      Profile
      </button>
      </Link>
      <Link to="/rankings">
      <button type="button" className="button1">
      Rankings
      </button>
      </Link>
    </div>
>>>>>>> Stashed changes
        <Switch>
          <Route path="/DiningHalls">
            <DiningHalls />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/Rankings">
            <Rankings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <div className="App-menu">
    //       <h1> BOO </h1>
    //     </div>
    //     <p> HELLO </p>
    //   </header>
    // </div>
  );
}

export default App;
