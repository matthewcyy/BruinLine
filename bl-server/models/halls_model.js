const mongoose = require("mongoose");
// models create a new object with different data associated with it
const hallsSchema = new mongoose.Schema({
  DeNeve: { type: Number, default: 0 },
  Epicuria: { type: Number, default: 0 },
  Feast: { type: Number, default: 0 },
  bPlate: { type: Number, default: 0 },
});
//here will store the number of ppl in halls
module.exports = Halls = mongoose.model("halls", hallsSchema);
