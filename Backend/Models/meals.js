const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
});

module.exports = mongoose.model("Meal", MealSchema);
