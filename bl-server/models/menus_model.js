const mongoose = require("mongoose");
// models create a new object with different data associated with it
const menusSchema = new mongoose.Schema({
  DeNeve: [{ type: String }],
  Epicuria: [{ type: String }],
  Feast: [{ type: String }],
  bPlate: [{ type: String }],
});
//here will store the menu for each dining hall
module.exports = Menus = mongoose.model("menus", menusSchema);
