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

function ItemCard(props) {
  const itemName = props.name;
  const favorites = props.favorites;
  const id = props.id;
  const [isFavorite, setIsFavorite] = useState(false);

  const updateFavorite = () => {
      console.log('IN UPDATEFAV')
    setIsFavorite(favorites.includes(itemName));
  };

  useEffect(() => {
      console.log("USEEFFECT");
    updateFavorite();
  }, [favorites]);

  const starItem = async () => {
      console.log('IN STARITEM')
    if (!favorites.includes(itemName)) {
        console.log('IN STARITEM IF')
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
      console.log('IN UNSTARITEM')
    const index = favorites.indexOf(itemName);
    if (index > -1) {
        console.log('IN UNSTARITEM IF')
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
    props.setReviewHallName(props.hall)
    props.setReviewPopShow(true);
  };

  console.log("HIHIHI");
  return (
    <div>
      <Grid container justify="space-between">
        <Grid item xs={3}></Grid>
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
        <Grid item xs={2} align="left">
          <Button variant="contained" onClick={() => reviewItem()}>
            Review
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ItemCard;
