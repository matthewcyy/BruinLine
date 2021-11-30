import React, { useEffect, useState, useContext } from "react";
import "./DiningHalls.css";
import logo from "../../../images/BLINE LOGO OUTLINED.png";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import UserContext from "../../../context/userContext";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [openmenu, setopenmenu] = useState({
    DeNeve: false,
    Epicuria: false,
    bPlate: false,
    Feast: false,
  });

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
      setCurrentHall(userData.user.hall);
      if (userData.user.hall != "") {
        setIsCheckedIn(true);
      } else {
        setIsCheckedIn(false);
      }
    }
  };

  const addHall = async (hallName) => {
    console.log("ADD HALLNAMe", hallName);
    const reqBody = {};
    setCurrentHall(hallName);
    if (hallName == "B-Plate") {
      var copyPeople = peopleInHall;
      copyPeople[hallName] += 1;
      setPeopleInHall({ ...copyPeople });
      hallName = "bPlate";
    } else {
      var copyPeople = peopleInHall;
      copyPeople[hallName] += 1;
      setPeopleInHall({ ...copyPeople });
    }
    var CheckedIn = true;
    setIsCheckedIn(CheckedIn);
    console.log(hallName);

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
      if (peopleInHall[hallName] <= 0) {
      } else {
        if (hallName == "B-Plate") {
          var copyPeople = peopleInHall;
          copyPeople[hallName] = --copyPeople[hallName];
          setPeopleInHall({ ...copyPeople });
          hallName = "bPlate";
        } else {
          var copyPeople = peopleInHall;
          copyPeople[hallName] = --copyPeople[hallName];
          setPeopleInHall({ ...copyPeople });
        }
        setCurrentHall("");
        var CheckedIn = false;
        setIsCheckedIn(CheckedIn);
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
    updateStates();
  }, [userData]);

  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const showmenu = (hallbutton) => (event, isExpanded) => {
    //console.log("CLICKED", hallbutton);
    if (hallbutton == "B-Plate") {
      hallbutton = "bPlate";
    }
    var newopen = openmenu;
    newopen[hallbutton] = !openmenu[hallbutton];
    setopenmenu(newopen);
    setExpanded(isExpanded ? hallbutton : false);
    // setShow((prev) => !prev);
  };

  return (
    <div className="halls">
      <h2> Dining Halls </h2>
      <div style={{ textAlign: "center" }}>
        <Grid container justify="space-between" direction={"row"}>
          {allDiningHalls.map((hall) => (
            <div style={{ width: "90%", margin: "2rem auto" }}>
              <Grid item xs={12} marginTop="0.5rem">
                <Card style={{ borderColor: "#2c7dc3" }}>
                  <CardContent>
                    <Grid container justify="space-between">
                      <Grid item xs={5} marginTop="0.5rem" align="left">
                        <Box
                          sx={{
                            fontWeight: "bold",
                            fontSize: "2.0rem",
                            marginBottom: "0.75rem",
                          }}
                        >
                          {hall}
                        </Box>
                      </Grid>
                      <Grid item merginTop="0.5rem" xs={6}>
                        {" "}
                      </Grid>
                      <Grid item marginTop="0.5rem" float="left">
                        {userData.user ? (
                          isCheckedIn ? (
                            hall == currentHall ? (
                              <Button
                                onClick={() => removeHall(hall)}
                                variant="contained"
                              >
                                Check out
                              </Button>
                            ) : (
                              <Button
                                onClick={() => addHall(hall)}
                                variant="contained"
                                disabled
                              >
                                Check In
                              </Button>
                            )
                          ) : (
                            <Button
                              onClick={() => addHall(hall)}
                              variant="contained"
                            >
                              Check In
                            </Button>
                          )
                        ) : (
                          <div> </div>
                        )}
                      </Grid>
                      <Grid
                        item
                        align="left"
                        marginTop="1.0 rem"
                        marginBottom="1.0rem"
                      >
                        <Box>
                          Number of Users in {hall}: {peopleInHall[hall]}
                        </Box>
                      </Grid>
                      <Grid item xs={12} marginTop="0.5 rem">
                        <Box>
                          <Accordion
                            expanded={openmenu[hall]}
                            onChange={showmenu(hall)}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography
                                sx={{ width: "33%", flexShrink: 0 }}
                                align="left"
                              >
                                Menu
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                THIS IS THE MENU FOR {hall}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
export default DiningHalls;
