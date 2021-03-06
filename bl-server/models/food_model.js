const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  itemName: { type: String },
  onTodaysMenu: { type: Boolean, default: false }, // sayng whether or not on today's menu
  diningHall: { type: String },
  calories: { type: Number },
  fat: { type: Number },
  carbs: { type: Number },
  protein: { type: Number },
  reviews: [
    {
      reviewer: { type: String },
      rating: { type: Number },
      date: { type: String },
      description: { type: String },
    },
  ],
  nextAvailable: { type: String },
});

module.exports = Food = mongoose.model("food", foodSchema);
