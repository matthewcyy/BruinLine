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
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MenuCard from "./MenuCard"
import Modal from "@mui/material/Modal";

function DiningHalls() {
    const { userData, setUserData } = useContext(UserContext);

    const [id, setId] = useState();
    const [favorites, setFavorites] = useState([]);
    const [reviewItemName, setReviewItemName] = useState("Default");
    const [reviewPopShow, setReviewPopShow] = useState(false);

    const [currentHall, setCurrentHall] = useState();
    const [error, setError] = useState();
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
    const [menus, setMenus] = useState({
        DeNeve: [],
        Epicuria: [],
        "B-Plate": [],
        Feast: [],
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
        }
        getPeopleHall();
        updateStates();
    }, [userData]);

    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(false);

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

    const getUserFavorites = async () => {
        if (userData.user) {
            setFavorites(userData.user.favFoods);
            setId(userData.user.id);
        }
    }

    const updateMenus = async () => {
        const menus = await axios.get(
            "http://localhost:5000/menus/getMenu",
            {}
        )
        const newMenus = {
            DeNeve: menus.data.entry["DeNeve"],
            Epicuria: menus.data.entry["Epicuria"],
            "B-Plate": menus.data.entry["bPlate"],
            Feast: menus.data.entry["Feast"],
        }
        setMenus(newMenus);
    }

    useEffect(() => {
        getUserFavorites();
        updateMenus();
    }, [])

    const updateUserData = async () => {
        try {
            const newUserData = userData
            newUserData.user.favFoods = favorites
            setUserData({ ...newUserData })
        } catch {
            console.log("error updating user data")
        }
    }

    const handleClose = () => setReviewPopShow(false);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4
    };
    const ratingOptions = [1, 2, 3, 4, 5]
    const [reviewDescription, setReviewDescription] = useState("");
    const [rating, setRating] = useState(0)

    useEffect(() => {
        updateUserData();
    }, [favorites])

    const submitReview = async (itemName, hallName) => {
        if (userData.user) {
            try {
                const reviewer = userData.user.username
                var date = new Date()
                const dd = String(date.getDate()).padStart(2, '0');
                const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = date.getFullYear();

                date = mm + '/' + dd + '/' + yyyy;
                var reqObject = { reviewer, date }
                reqObject.itemName = itemName
                reqObject.rating = rating
                reqObject.description = reviewDescription


                reqObject.diningHall = hallName
                // newObj[hallName].push(reviewObject) 
                // setDiningHallsWithFoods(newObj)
                const addReview = await axios.patch("http://localhost:5000/foods/reviewFood", reqObject);
                console.log("ADDREVIEW", addReview)
            } catch (err) {
                console.log("ERROR", err.response.data.msg)
            }
        }
    }

    return (
        <div className="halls">
            <h2> Dining Halls </h2>
            <div style={{ textAlign: "center" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid container spacing={2} xs={12} margin="auto"></Grid>
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
                                    <Grid item xs={6} marginTop="0.5rem">
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
                                    <Grid item xs={6} marginTop="0.5 rem">
                                        <Box>Number of People: {peopleInHall[hall]}</Box>
                                    </Grid>
                                    <Grid item xs={6} marginTop="0.5 rem">
                                        <Box>
                                            <Accordion
                                                expanded={openmenu[hall]}
                                                onChange={showmenu(hall)}
                                            >
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                                                        Menu
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <MenuCard
                                                        menu={menus[hall]}
                                                        favorites={favorites}
                                                        setFavorites={setFavorites}
                                                        id={id}
                                                        setReviewItemName={setReviewItemName}
                                                        setReviewPopShow={setReviewPopShow}
                                                    />
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Modal
                                open={reviewPopShow}
                                onClose={handleClose}
                            >
                                <Box sx={style}>
                                    <Box>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {reviewItemName}
                                        </Typography>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            {hall}
                                        </Typography>
                                        <TextField label="Rating" select fullWidth size="small" onChange={(e) => setRating(e.target.value)}>
                                            {ratingOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                    <TextField label="Review" variant="outlined" size="Normal" value={reviewDescription} onChange={(e) => setReviewDescription(e.target.value)} fullWidth multiline rows={4} />
                                    <Button onClick={() => submitReview(reviewItemName, hall)} variant="contained">
                                        Submit
                                    </Button>
                                </Box>
                            </Modal>
                        </div>
                    ))}
                </Grid>
            </div>
        </div>
    );
}
export default DiningHalls;
