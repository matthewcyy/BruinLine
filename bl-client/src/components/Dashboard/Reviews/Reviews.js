import "./Reviews.css";
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import axios from 'axios';
import ReviewCard from './ReviewCard';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

function Reviews() {
  const ratingOptions = [1, 2, 3, 4, 5]
  const diningHallOptions = ["DeNeve", "Feast", "B-Plate", "Epicuria"]
  ratingOptions.map(x => console.log("MAPPING", x))
  const [foodItemReview, setFoodItemReview] = useState("")
  const [diningHallReview, setDiningHallReview] = useState("")
  const [foodRating, setRating] = useState(0)
  const [reviewDesc, setReviewDesc] = useState("")
  const [diningHallsWithFoods, setDiningHallsWithFoods] = useState({'DeNeve': [], 'Feast': [], 'B-Plate': [], 'Epicuria': []})
  const columnHeader = {0: 'DeNeve', 1: 'Feast', 2: 'B-Plate', 3: 'Epicuria'}
  const { userData, setUserData } = useContext(UserContext);

  // var diningHallsWithFoods = {'DeNeve': [], 'Feast': [], 'B-Plate': [], 'Epicuria': []}
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
        // diningHallsWithFoods[x.diningHall].push(reviewObject)
        var newObj = {...diningHallsWithFoods}
        newObj[x.diningHall].push(reviewObject) 
        setDiningHallsWithFoods(newObj)
        // console.log("REVIEW OBJECT", reviewObject)
      })
    })
    console.log('DININGHALLSWITHFOODS', diningHallsWithFoods)
}
  useEffect(() => {
    getAllReviews()
  }, []);

  const submitReview = async () => {
    if (userData.user) {
      try {
        const reviewer = userData.user.username
        var date = new Date()
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        date = mm + '/' + dd + '/' + yyyy;
        var reqObject = {reviewer, date}
        reqObject.itemName = foodItemReview
        reqObject.rating = foodRating
        reqObject.description = reviewDesc
        
        var newObj = {...diningHallsWithFoods}
        newObj[diningHallReview].push(reqObject) 
        setDiningHallsWithFoods(newObj)

        reqObject.diningHall = diningHallReview
        // newObj[diningHallReview].push(reviewObject) 
        // setDiningHallsWithFoods(newObj)
        const addReview = await axios.patch("http://localhost:5000/foods/reviewFood", reqObject);
        console.log("ADDREVIEW", addReview)
      } catch (err) {
        console.log("ERROR", err.response.data.msg)
      }
      }
  }

  return (
    <div className="header">
      <h1> Reviews </h1>
      <Grid style={{width: '100%'}} sx={{ flexGrow: 1 }} container className="Container">
      <Grid item xs={12}>
        <Grid container justifyContent="center" textAlign="center" marginTop="1rem">
          {[0, 1, 2, 3].map((value) => (
            <Grid item key={value} style={{width: '24.5%'}} margin="0 auto">
              {/* <Paper sx={{ height: 500, width: 100 }} /> */}
              <Box textAlign="center" sx={{fontWeight: 'bold', fontSize: '1.5rem', borderRadius: '8px', border: 1, borderWidth: 2, borderColor: 'grey.500'}} display="block">
                <>
                  {columnHeader[value]}
                  {
                    diningHallsWithFoods[columnHeader[value]].map((review) => (
                      <ReviewCard reviewObj={review} style={{margin: "auto"}}/>
                    ))
                  }
                </>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container justifyContent="center" textAlign="center" marginTop="1rem">
        <Card style={{borderColor: "#2c7dc3"}}>
          <CardContent>
            <Box sx={{fontWeight: 'bold', fontSize: '1.5rem', marginBottom: "0.75rem"}}>Write a Review</Box>
            <Grid container xs={12} spacing={0.3}>
              <Grid item xs={4}>
                <TextField label="Food" variant="outlined" size="small" value={foodItemReview} onChange={(e) => setFoodItemReview(e.target.value)}/>
              </Grid>
              <Grid item xs={4}>
              <TextField label="Dining Hall" select fullWidth size="small" onChange={(e) => setDiningHallReview(e.target.value)}>
                  {diningHallOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField label="Rating" select fullWidth size="small" onChange={(e) => setRating(e.target.value)}>
                  {ratingOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} marginTop="0.5rem">
                <TextField label="Review" variant="outlined" size="Normal" value={reviewDesc} onChange={(e) => setReviewDesc(e.target.value)} fullWidth multiline rows={4}/>
              </Grid>
              <Grid item xs={12} marginTop="0.5rem">
                <Button onClick={() => submitReview()} outlined={true}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Grid>
    </Grid>
    </div>
  );
}
export default Reviews;
