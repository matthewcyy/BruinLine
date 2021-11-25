const router = require('express').Router();
const mongoose = require('mongoose');
var Food = require("../models/food_model");

router.post('/addFood', async (req, res) => {
    try {
        let { itemName, onTodaysMenu, diningHall, calories, fat, carbs, protein } = req.body;
        if (!itemName || !onTodaysMenu || !diningHall || !calories || !fat || !carbs || !protein)
            return res.status(400).json({ msg: "Not all information is filled out"})
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