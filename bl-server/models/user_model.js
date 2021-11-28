const mongoose = require("mongoose");
// models create a new object with different data associated with it
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true, minlength: 2, maxlength: 15 },
  password: { type: String, required: true, minlength: 5 },
  favFoods: [{ type: String }], // string of names for favorite food
  groups: [{ groupName: {type: String}, groupId: {type: String }}], // string of names for groups, accompanied with their _id's
  invitations: [{ groupName: {type: String}, groupId: {type: String}, inviter: {type: String} }],
  reviews: [{ foodItem: {type: String}, diningHall: {type: String}, rating: {type: Number}, date: {type: String}, description: {type: String}}]
});

module.exports = User = mongoose.model("user", userSchema);