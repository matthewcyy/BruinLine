const mongoose = require("mongoose");
// models create a new object with different data associated with it
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true, minlength: 2, maxlength: 15 },
  password: { type: String, required: true, minlength: 5 },
  favFoods: [{ type: String }], // string of names for favorite pokemon
});

module.exports = User = mongoose.model("user", userSchema);