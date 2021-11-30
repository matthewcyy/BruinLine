const router = require("express").Router();
const mongoose = require("mongoose");
var Menus = require("../models/menus_model");


router.patch("/updateMenu", async (req, res) => {
    try {
        let { diningHall, menuItems } = req.body; // hallCheck = req.body.hallCheck
        // needs hallname
        var entry = await Menus.findById("61a58124f3a8a112fec23b0b"); //take the main entry from the function call
        entry[diningHall] = menuItems;
        const savedEntry = await entry.save();
        res.json({ savedEntry });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});


router.get("/getMenu", async (req, res) => {
    try {
        const entry = await Menus.findById("61a58124f3a8a112fec23b0b"); //take the hall from the function call
        res.json({ entry });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

module.exports = router;
