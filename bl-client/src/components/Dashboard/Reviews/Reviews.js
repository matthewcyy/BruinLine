import "./Reviews.css";
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import axios from 'axios';
import ReviewCard from './ReviewCard';

var diningHallsWithFoods = {'DeNeve': [], 'Feast': [], 'B-Plate': [], 'Epicuria': []}
const getAllReviews = async () => {
  var allReviews = await axios.get('http://localhost:5000/foods/getAllReviews') // getting all reviews for all items
  allReviews = allReviews.data.allFoodReviews
  // console.log("ALLREVIEWS", allReviews)
  allReviews.map(x => {
    // console.log("OUTER THING", x)
    x.reviews.map(y => {
      // console.log("REVIEW", y)
      var reviewObject = {}
      reviewObject.itemName = x.itemName
      reviewObject.reviewer = y.reviewer
      reviewObject.date = y.date
      reviewObject.rating = y.rating
      reviewObject.description = y.description
      diningHallsWithFoods[x.diningHall].push(reviewObject)
      // console.log("REVIEW OBJECT", reviewObject)
    })
  })
  console.log('DININGHALLSWITHFOODS', diningHallsWithFoods)
}

function Reviews() {
  useEffect(() => {
    getAllReviews()
  }, []);

  const columnHeader = {0: 'DeNeve', 1: 'Feast', 2: 'B-Plate', 3: 'Epicuria'}
  const { userData, setUserData } = useContext(UserContext);
  console.log("USERDATA", userData)
  return (
    <div className="header">
      <h2> Reviews </h2>
      <Grid style={{width: '100%'}} sx={{ flexGrow: 1 }} container className="Container">
      <Grid item xs={12}>
        <Grid container justifyContent="center" textAlign="center" marginTop="1rem">
          {[0, 1, 2, 3].map((value) => (
            <Grid item key={value} style={{width: '24.5%'}} margin="auto" align="center">
              {/* <Paper sx={{ height: 500, width: 100 }} /> */}
              <Box textAlign="center" sx={{fontWeight: 'bold', fontSize: '1.25rem', borderRadius: '8px', border: 1, borderWidth: 1.75, borderColor: 'grey.500'}} display="block">
                <>
                  {columnHeader[value]}
                  {
                    diningHallsWithFoods[columnHeader[value]].map((review) => (
                      <ReviewCard reviewObj={review} />
                    ))
                  }
                </>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}
export default Reviews;
