const mongoose = require("mongoose");
// models create a new object with different data associated with it
const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupMembers: [{ type: String, required: true }], // array of group members, containing each group member's username
  votes: { 
    DeNeve: { type: Number, default: 0 },
    Epicuria: { type: Number, default: 0 },
    Feast: { type: Number, default: 0 },
    bPlate: { type: Number, default: 0 }
   }
});

module.exports = Group = mongoose.model("group", groupSchema);