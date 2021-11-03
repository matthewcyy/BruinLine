const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  calories: {type: Number},
  fat: {type: Number},
  carbs: {type: Number},
  protein: {type: Number},
});

module.exports = User = mongoose.model("food", foodSchema);