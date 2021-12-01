const router = require('express').Router();
const mongoose = require('mongoose');
var Food = require("../models/food_model");
var User = require("../models/user_model");

router.post('/addFood', async (req, res) => {
    try {
        let { itemName, onTodaysMenu, diningHall, calories, fat, carbs, protein } = req.body;
        if (!itemName || !diningHall || !calories || !fat || !carbs || !protein)
            return res.status(400).json({ msg: "Not all information is filled out"})
        if (!onTodaysMenu)
            onTodaysMenu = 'false'
        const foodItemExists = await Food.findOne({ itemName: itemName, diningHall: diningHall })
        if (foodItemExists) 
            return res.status(400).json({ msg: "Food item already in database"})
        const newFood = new Food({
            itemName,
            onTodaysMenu,
            diningHall,
            calories,
            fat,
            carbs,
            protein
        })
        const savedFood = await newFood.save();
        res.json(savedFood);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.patch('/reviewFood', async (req, res) => {
    try {
        let { itemName, diningHall, rating, date, description, reviewer } = req.body;
        const reviewerObject = await User.findOne({ username: reviewer }) // getting the reviewer object
        const foodReview = {}
        foodReview.rating = rating
        foodReview.date = date
        foodReview.description = description
        const userReview = foodReview
        foodReview.reviewer = reviewer
        userReview.foodItem = itemName
        userReview.diningHall = diningHall
        const userReviewList = reviewerObject.reviews
        console.log("FOOD REVIEW", foodReview)
        console.log("USER REVIEW", userReview)
        userReviewList.push(userReview)
        const savedUserReview = await reviewerObject.save()
        res.json({savedFoodReview, savedUserReview})
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
})

router.get('/getAllReviews', async (req, res) => {
    try {
        var allFoodReviews = await User.find({});
        // allFoodReviews = allFoodReviews.map(({itemName, diningHall, reviews}) => ({itemName, diningHall, reviews}))
        allFoodReviews = allFoodReviews.map(({username, reviews}) => ({username, reviews}))
        console.log('ALLFOODREVIEWS', allFoodReviews)
        allFoodReviews.map(x => console.log("REVIEW", x.reviews))
        allFoodReviews = allFoodReviews.filter(x => x.reviews.length !== 0)
        res.json({allFoodReviews})
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
})
module.exports = router;