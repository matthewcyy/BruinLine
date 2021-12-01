import React, { useState, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ItemCard(props) {
    const itemName = props.name
    const favorites = props.favorites
    const id = props.id
    const [isFavorite, setIsFavorite] = useState(false);
    
    const updateFavorite = () => {
        setIsFavorite(favorites.includes(itemName))
    }

    useEffect(() => {
        updateFavorite();
    }, [favorites])

    const starItem = async () => {
        if(!favorites.includes(itemName)) {
            favorites.push(itemName);
            props.setFavorites([...favorites])
            const reqBody = {}
            reqBody.id = id
            reqBody.foods = favorites
            const getResponse = await axios.patch('http://localhost:5000/users/updateFavFood', reqBody);
            console.log(getResponse);
        }
    }

    const unStarItem = async () => {
        debugger;
        const index = favorites.indexOf(itemName);
        if (index > -1) {
            favorites.splice(index, 1);
            props.setFavorites([...favorites])
            const reqBody = {}
            reqBody.id = id
            reqBody.foods = favorites
            const getResponse = await axios.patch('http://localhost:5000/users/updateFavFood', reqBody);
        }
    }

    const reviewItem = async (foodName) => {
        console.log("Reviewing")
        props.setReviewItemName(itemName);
        props.setReviewPopShow(true);
        props.setReviewHallName(props.hall);
    }



    console.log("HIHIHI")
    return (
        <div>
            <p>{props.name}</p>
            <button onClick={() => reviewItem()}>Review</button>
            {isFavorite ? (
                <button onClick={() => unStarItem()}>Unstar</button>
            ) : (
                <button onClick={() => starItem()}>Star</button>
            )}
        </div>
    )
}

export default ItemCard;