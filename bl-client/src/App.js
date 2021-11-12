import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./components/Dashboard/Home/Home";
import Profile from "./components/Dashboard/Profile/Profile";
import Rankings from "./components/Dashboard/Rankings/Rankings";
import DiningHalls from "./components/Dashboard/DiningHalls/DiningHalls";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     let token = localStorage.getItem("auth-token");
  //     if(token === null){
  //       localStorage.setItem("auth-token", "");
  //       token = "";
  //     }
  //     const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}}); //Change back to minipokedexherokuapp.com/users/ later
  //     if (tokenResponse.data) {
  //       const userRes = await axios.get("http://localhost:5000/users/", {
  //         headers: { "x-auth-token": token },
  //       });
  //       console.log(userRes)
  //       setUserData({
  //         token,
  //         user: userRes.data,
  //       });
  //     }
  //   }

  //   checkLoggedIn();
  // }, []);

  return (
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
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dininghalls" component={DiningHalls} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/rankings" component={Rankings} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
