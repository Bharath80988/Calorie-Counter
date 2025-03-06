const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalCalories: { type: Number, default: 0 }, // Tracks total calories separately
});

module.exports = mongoose.model("User", UserSchema);
