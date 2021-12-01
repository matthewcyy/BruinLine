const router = require("express").Router();
const mongoose = require("mongoose");
var Halls = require("../models/halls_model");
var User = require("../models/user_model");

//.patch is modifying existing data
//.post is adding new data
//.get gets data

router.patch("/checkin", async (req, res) => {
  try {
    let { hallCheck, userId } = req.body; // hallCheck = req.body.hallCheck
    // needs hallname
    var hall = await Halls.findById("61a54697b2b28a17be702118"); //take the hall from the function call
    console.log("HALL", hall);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    if (!hall) {
      return res.status(400).json({ msg: "Cannot find hall" });
    }
    user.currentHall = hallCheck; // getting user's current hall
    hall[hallCheck] += 1; //increment ppl in hall
    const updatedUser = await user.save(); // save your change into database
    const savedHall = await hall.save();
    res.json({ updatedUser, savedHall });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.patch("/checkout", async (req, res) => {
  try {
    let { hallCheck, userId } = req.body; // hallCheck = req.body.hallCheck
    // needs hallname
    var hall = await Halls.findById("61a54697b2b28a17be702118"); //take the hall from the function call
    console.log("HALL", hall);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    if (!hall) {
      return res.status(400).json({ msg: "Cannot find hall" });
    }
    var currhall = user.currentHall; // getting user's current hall

    currhall = hallCheck; // changing current hall
    hall[hallCheck] = --hall[hallCheck]; //increment ppl in hall
    const updatedUser = await user.save(); // save your change into database
    const savedHall = await hall.save();
    res.json({ updatedUser, savedHall });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.get("/getPeople", async (req, res) => {
  try {
    var hall = await Halls.findById("61a54697b2b28a17be702118"); //take the hall from the function call
    res.json({ hall });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.post("/gethall", async (req, res) => {
  try {
    const user = req.body;
    var curruser = await User.findById(user);
    currhall = curruser.hall;
    res.json({ currhall });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
