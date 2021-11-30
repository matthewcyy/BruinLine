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
import Alert from "@mui/material/Alert";

function DiningHalls() {
  const [currentHall, setCurrentHall] = useState();
  const [error, setError] = useState();
  const { userData, setUserData } = useContext(UserContext);
  const [peopleInHall, setPeopleInHall] = useState({
    DeNeve: 0,
    Epicuria: 0,
    bPlate: 0,
    Feast: 0,
  });
  const [isCheckedIn, setIsCheckedIn] = useState();

  const allDiningHalls = ["DeNeve", "Epicuria", "B-Plate", "Feast"];
  //   useEffect(() => {
  //     async function getUserData() {
  //       let token = localStorage.getItem("auth-token");
  //       const userRes = await axios.get("http://localhost:5000/users/", {
  //         headers: { "x-auth-token": token },
  //       });
  //       setCurrentHall(userRes.data.currentHall);
  //     }
  //     getUserData();
  //   }, []);

  const updateStates = async () => {
    if (userData.user) {
      setCurrentHall(userData.user.currentHall);
      setIsCheckedIn(!!userData.user.hall);
    }
  };

  const addHall = async (hallName) => {
    console.log("ADD HALLNAMe", hallName);
    const reqBody = {};
    if (hallName == "B-Plate") {
      hallName = "bPlate";
    }
    var copyPeople = peopleInHall;
    var CheckedIn = true;
    copyPeople[hallName] += 1;
    setPeopleInHall({ ...copyPeople });
    setIsCheckedIn(CheckedIn);
    reqBody.hallCheck = hallName;
    reqBody.userId = userData.user.id;
    const hallCreateResponse = await axios.patch(
      "http://localhost:5000/halls/checkin",
      reqBody
    );
  };

  const removeHall = async (hallName) => {
    try {
      console.log("REMOVE HALLNAMe", hallName);
      const reqBody = {};
      var copyPeople = peopleInHall;
      if (peopleInHall[hallName] <= 0) {
      } else {
        var CheckedIn = false;
        setIsCheckedIn(CheckedIn);
        copyPeople[hallName] = --copyPeople[hallName];
        setPeopleInHall({ ...copyPeople });
        reqBody.hallCheck = hallName;
        reqBody.userId = userData.user.id;
        const hallCreateResponse = await axios.patch(
          "http://localhost:5000/halls/checkout",
          reqBody
        );
      }
    } catch (err) {
      console.log("ERROR", err.response.data.msg);
    }
  };

  useEffect(() => {
    const getPeopleHall = async () => {
      try {
        const hallCreateResponse = await axios.get(
          "http://localhost:5000/halls/getPeople"
        );
        hallCreateResponse.data.hall["B-Plate"] =
          hallCreateResponse.data.hall["bPlate"];
        setPeopleInHall(hallCreateResponse.data.hall);
        console.log("ss", hallCreateResponse);
      } catch (err) {
        console.log("ERROR", err.response.data.msg);
      }
    };
    getPeopleHall();
  }, []);

  return (
    <div className="halls">
      <h2> Dining Halls </h2>
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={2} margin="auto"></Grid>
        {allDiningHalls.map((hall) => (
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
                  {hall}
                </Box>
                <Grid item xs={12} marginTop="0.5rem"></Grid>
                <Grid item xs={12} marginTop="0.5rem">
                  <Grid item xs={5} marginTop="0.5rem">
                    <Button onClick={() => addHall(hall)} variant="contained">
                      Check In
                    </Button>
                  </Grid>
                  <Grid item xs={5} marginTop="0.5rem">
                    <Button
                      onClick={() => removeHall(hall)}
                      variant="contained"
                    >
                      Check out
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} marginTop="0.5 rem">
                  <Box>Number of People: {peopleInHall[hall]}</Box>
                </Grid>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DiningHalls;
