import React, { useState, useEffect } from "react";
import UserContext from "../../../context/userContext";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Modal from "@mui/material/Modal";

function ItemCard(props) {
  const itemName = props.name;
  const favorites = props.favorites;
  const id = props.id;
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nutFacts, setNutFacts] = useState({});
  const [errorInReq, setErrorInReq] = useState(false);
  const updateFavorite = () => {
    console.log("IN UPDATEFAV");
    setIsFavorite(favorites.includes(itemName));
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    console.log("USEEFFECT");
    updateFavorite();
  }, [favorites]);

  const starItem = async () => {
    console.log("IN STARITEM");
    if (!favorites.includes(itemName)) {
      console.log("IN STARITEM IF");
      favorites.push(itemName);
      props.setFavorites([...favorites]);
      const reqBody = {};
      reqBody.id = id;
      reqBody.foods = favorites;
      const getResponse = await axios.patch(
        "http://localhost:5000/users/updateFavFood",
        reqBody
      );
      console.log(getResponse);
    }
  };

  const unStarItem = async () => {
    console.log("IN UNSTARITEM");
    const index = favorites.indexOf(itemName);
    if (index > -1) {
      console.log("IN UNSTARITEM IF");
      favorites.splice(index, 1);
      props.setFavorites([...favorites]);
      const reqBody = {};
      reqBody.id = id;
      reqBody.foods = favorites;
      const getResponse = await axios.patch(
        "http://localhost:5000/users/updateFavFood",
        reqBody
      );
    }
  };

  const reviewItem = async (foodName) => {
    console.log("Reviewing");
    props.setReviewItemName(itemName);
    props.setReviewHallName(props.hall);
    props.setReviewPopShow(true);
  };

  const getNutritionFacts = async () => {
    try {
      var reqBody = {};
      reqBody.itemName = itemName;
      console.log(reqBody);
      const getNutFacts = await axios.post(
        "http://localhost:5000/foods/getNutrientFacts",
        reqBody
      );
      setNutFacts(getNutFacts.data);
      handleOpen();
    } catch (err) {
      setErrorInReq(true)
      handleOpen();
    }
    
  };

  console.log("HIHIHI");
  return (
    <div>
      <Grid container justify="space-between" justifyContent="center" alignItems="center">
        <Grid item xs={10}></Grid>
        <Grid item xs={3} align="left">
          <p>{props.name}</p>
        </Grid>
        <Grid item xs={2} align="right">
          {isFavorite ? (
            <StarIcon
              onClick={() => unStarItem()}
              fontSize="large"
              style={{ color: "#FFD100" }}
            />
          ) : (
            <StarOutlineIcon onClick={() => starItem()} fontSize="large" />
          )}
        </Grid>
        <Grid item xs={0.3}>
          {" "}
        </Grid>
        <Grid item xs={1} align="left">
          <Button variant="contained" onClick={() => reviewItem()}>
            Review
          </Button>
        </Grid>
        <Grid item xs={2} align="left">
          <Button variant="contained" onClick={() => getNutritionFacts()}>
            Get Nutrition Facts
          </Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        {errorInReq ?
        <Box sx={style}>
        <Box>
          <Typography variant="h6" component="h2">
            <b>Error, no nutritional information for {itemName}</b>
          </Typography>
        </Box>
      </Box> :
        <Box sx={style}>
          <Box>
            <Typography variant="h6" component="h2">
              <b>Nutrition Facts for {itemName}</b>
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Calories: {nutFacts.calories}
            </Typography>
            <Typography sx={{ mt: 2 }}>Fats: {nutFacts.fat}</Typography>
            <Typography sx={{ mt: 2 }}>Carbs: {nutFacts.carbs}</Typography>
            <Typography sx={{ mt: 2 }}>Protein: {nutFacts.protein}</Typography>
          </Box>
        </Box>
          }
      </Modal>
    </div>
  );
}

export default ItemCard;
