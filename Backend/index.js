const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const Meal = require("./Models/meals");
const User = require("./Models/user");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/nutritionDB";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Fetch meal by name or all meals
app.get("/api/meals", async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      // Search for a meal by its name (case-insensitive)
      const meal = await Meal.find({ name: { $regex: new RegExp(`^${name}$`, "i") } });

      if (meal.length === 0) {
        return res.status(404).json({ error: "Meal not found in the database" });
      }

      return res.json(meal);
    }

    // If no name is provided, return all meals
    const meals = await Meal.find();
    if (meals.length === 0) {
      return res.status(404).json({ error: "No meals found in the database" });
    }

    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Error fetching meals", details: err.message });
  }
});

// Fetch user details including totalCalories
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user", details: err.message });
  }
});

// Add meal & update user calories
app.post("/api/upload", async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: "User ID and food name are required" });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Fetch meal details from MealDB API
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    
    if (!response.data.meals) {
      return res.status(404).json({ error: "Meal not found in MealDB" });
    }

    // Extract nutrition data (simulated)
    const mealData = response.data.meals[0];
    const calories = Math.floor(Math.random() * 500) + 100;
    const protein = Math.floor(Math.random() * 30) + 5;
    const fat = Math.floor(Math.random() * 20) + 3;
    const carbs = Math.floor(Math.random() * 50) + 10;

    // Save meal in the database
    const newMeal = new Meal({ userId, name, calories, protein, fat, carbs });
    await newMeal.save();

    // Update user's totalCalories
    await User.findByIdAndUpdate(userId, { $inc: { totalCalories: calories } });

    res.status(201).json({ message: "Meal added successfully!", meal: newMeal });
  } catch (err) {
    res.status(500).json({ error: "Error uploading meal", details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
