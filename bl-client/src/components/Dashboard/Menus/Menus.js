import React, { useEffect, useState, useContext } from "react";
import "./Menus.css";
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
import ItemCard from "./ItemCard"


function Menus() {
  const { userData, setUserData } = useContext(UserContext);
  const [id, setId] = useState();
  const [favorites, setFavorites] = useState([]);

  const [reviewPopShow, setReviewPopShow] = useState(false);
  const [reviewItemName, setReviewItemName] = useState("Default");

  const [epicuriaMenu, setEpicuriaMenu] = useState([]);
  const [deNeveMenu, setDeNeveMenu] = useState([]);
  const [bPlateMenu, setBPlateMenu] = useState([]);
  const [feastMenu, setFeastMenu] = useState([]);

  const getUserData = async () => {
    if (userData.user) {
      setFavorites(userData.user.favFoods);
      setId(userData.user.id);
    }
  }
  const updateMenus = async () => {
    const menus = await axios.get(
      "http://localhost:5000/menus/getMenu",
      {}
    );
    setEpicuriaMenu(menus.data.entry["Epicuria"])
    setDeNeveMenu(menus.data.entry["DeNeve"])
    setBPlateMenu(menus.data.entry["bPlate"])
    setFeastMenu(menus.data.entry["Feast"]);
  }

  useEffect(() => {
    getUserData();
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

  useEffect(() => {
    updateUserData();
  }, [favorites])


  const onSendingReview = () => {
    console.log("Sent review")
  }

  return (
    <div className="container">
      <h2>Current Menus</h2>
      <div class="menuContainer">
        {reviewPopShow ? (
          <p>{reviewItemName}</p>
        ) : (
          null
        )}
        <div class="menuSection" id="DeNeve">
          <h3>De Neve</h3>
          {deNeveMenu.map(item => {
            return (
              <ItemCard
                name={item}
                favorites={favorites}
                setFavorites={setFavorites}
                id={id}
                setReviewPopShow={setReviewPopShow}
                setReviewItemName={setReviewItemName}
              />
            );
          })}
        </div>
        <div class="menuSection" id="Epicuria">
          <h3>Epicuria</h3>
          {epicuriaMenu.map(item => {
            return (
              <ItemCard
                name={item}
                favorites={favorites}
                setFavorites={setFavorites}
                id={id}
                setReviewPopShow={setReviewPopShow}
                setReviewItemName={setReviewItemName}
              />
            );
          })}
        </div>
        <div class="menuSection" id="bPlate">
          <h3>Bruin Plate</h3>
          {bPlateMenu.map(item => {
            return (
              <ItemCard
                name={item}
                favorites={favorites}
                setFavorites={setFavorites}
                id={id}
                setReviewPopShow={setReviewPopShow}
                setReviewItemName={setReviewItemName}
              />
            );
          })}
        </div>
        <div class="menuSection" id="Feast">
          <h3>Feast</h3>
          {feastMenu.map(item => {
            return (
              <ItemCard
                name={item}
                favorites={favorites}
                setFavorites={setFavorites}
                id={id}
                setReviewPopShow={setReviewPopShow}
                setReviewItemName={setReviewItemName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Menus;
