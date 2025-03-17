require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Meal = require("./Models/meals"); 

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"], credentials: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Fetch meals
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    if (!meals.length) return res.status(404).json({ error: "No meals found" });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meals", details: err.message });
  }
});

//Search a Soecific Meal
app.get("/api/meals/:name", async (req, res) => {
  try {
    const mealName = req.params.name;
    const meal = await Meal.find({ name: mealName });

    if (!meal.length) return res.status(404).json({ error: "Meal not found" });

    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meal", details: err.message });
  }
});

//Add the Meal using API Call
app.post("/api/meals", async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body;
    if (!name || !calories || !protein || !carbs || !fat) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMeal = new Meal({ name, calories, protein, carbs, fat });
    await newMeal.save();

    res.status(201).json({ message: "Meal added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add meal", details: err.message });
  }
});

//Add a Custom Meal
app.post("/api/custom-meal", async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat } = req.body;
    if (!name || !calories || !protein || !carbs || !fat) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMeal = new Meal({ name, calories, protein, carbs, fat });
    await newMeal.save();

    res.status(201).json({ message: "Custom meal added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add custom meal", details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
