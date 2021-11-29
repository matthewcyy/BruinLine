import React, { useEffect, useState, useContext } from "react";
import "./DiningHalls.css";
import logo from "../../../images/BLINE LOGO OUTLINED.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import UserContext from "../../../context/userContext";

function DiningHalls() {
  const [currentHall, setCurrentHall] = useState();
  const [error, setError] = useState();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    async function getUserData() {
      let token = localStorage.getItem("auth-token");
      const userRes = await axios.get("http://localhost:5000/users/", {
        headers: { "x-auth-token": token },
      });
      setCurrentHall(userRes.data.currentHall);
    }
    getUserData();
  }, []);

  const updateStates = async () => {
    if (userData.user) {
      setCurrentHall(userData.user.currentHall);
    }
  };

  const addHall = async () => {
    try {
      const reqBody = {};
    } catch (err) {
      console.log("ERROR", err.response.data.msg);
    }
  };

  return (
    <div className="halls">
      <h2> Dining Halls </h2>
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={2} margin="auto"></Grid>

        <div style={{ width: "50%", margin: "2rem auto" }}>
          <Card style={{ borderColor: "#2c7dc3" }}>
            <CardContent>
              <Box
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                Hall
              </Box>
              <Grid item xs={12} marginTop="0.5rem"></Grid>
              <Grid item xs={12} marginTop="0.5rem">
                <Button onClick={() => addHall()} variant="contained">
                  Check In
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default DiningHalls;
