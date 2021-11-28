const router = require('express').Router();
const mongoose = require('mongoose');
var Food = require("../models/food_model");

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
module.exports = router;