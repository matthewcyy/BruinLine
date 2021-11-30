import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "./ErrorNotice";
import UserContext from "../../context/userContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function Registration() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVerify, setPasswordVerify] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  let history = useHistory();
  const favFoods = [];

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordVerify, username, favFoods };
      console.log(newUser);
      await axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );
      console.log(loginResponse.data);
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/login");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="register">
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={2} margin="auto"></Grid>
        <div style={{ width: "90%", margin: "2rem auto" }}>
          <Card style={{ borderColor: "#2c7dc3" }}>
            <CardContent>
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                Register
              </Box>
              <Grid item xs={12} marginTop="0.5rem"></Grid>
            </CardContent>
          </Card>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={2} margin="auto"></Grid>
        <div style={{ width: "90%", margin: "2rem auto" }}>
          <Card style={{ borderColor: "#2c7dc3" }}>
            <CardContent>
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                {error && (
                  <ErrorNotice
                    message={error}
                    clearError={() => setError(undefined)}
                  />
                )}
                <form onSubmit={submit}>
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      type="password"
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      onChange={(e) => setPasswordVerify(e.target.value)}
                      type="password"
                      label="checkspasswords"
                    />
                  </FormControl>

                  <FormControl>
                    <InputLabel htmlFor="component-outlined">
                      Display-Name
                    </InputLabel>
                    <OutlinedInput
                      onChange={(e) => setUsername(e.target.value)}
                      label="usernamesett"
                    />
                  </FormControl>
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary"
                  />
                </form>
              </Box>
              <Grid item xs={12} marginTop="0.5rem"></Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Registration;
