import React, {useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import axios from 'axios';
import Reviews from './components/Dashboard/Reviews/Reviews';
import Profile from './components/Dashboard/Profile/Profile';
import DiningHalls from './components/Dashboard/DiningHalls/DiningHalls';
import Groups from './components/Dashboard/Groups/Groups';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserContext from './context/userContext';
import Navbar from './Navbar';
import Voting from './components/Dashboard/Voting/MajorityVote';

import './App.css';
import LandingPage from "./components/LandingPage/LandingPage";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: [
        'Arial',
      ].join(','),
      button: {
        textTransform: 'none'
      }
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      }
    }
  });

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}}); // getting token for authorization
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        console.log("USERRESSSS",userRes)
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar/>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/dininghalls" component={DiningHalls} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/profile" component={Profile} />
            <Route path="/groups" component={Groups} />
            <Route path="/voting" component={Voting} />
          </Switch>
        </UserContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
