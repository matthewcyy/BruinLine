const router = require("express").Router();
const mongoose = require("mongoose");
var Halls = require("../models/halls_model");

//.patch is modifying existing data
//.post is adding new data
//.get gets data

router.patch("/checkin", async (req, res) => {
  try {
    let { username, hall } = req.body;
    // req.body needs: hallname
    const hall = await Halls.findById(req.body.hall); //take the hall from the function call
    if (!hall) return res.status(400).json({ msg: "Cannot find hall" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
