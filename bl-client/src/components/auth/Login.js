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
import BLineLogo from "../../images/logo_name.png";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      localStorage.setItem("user", JSON.stringify(loginResponse.data.user))
      console.log(localStorage.getItem("user"))
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="login">
      <div style={{ textAlign: "center" }}>
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
                Login
              </Box>
              <Grid item xs={12} marginTop="0.5rem"></Grid>
            </CardContent>
          </Card>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
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
              </Box>
              <form onSubmit={submit} id="register">
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                    />
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <FormControl>
                    <InputLabel htmlFor="component-outlined">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                    />
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <Button
                    type="submit"
                    value="Register"
                    form="register"
                    primary={true}
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
