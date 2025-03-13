const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// 🔹 Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/nutritionDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Meal Schema & Model
const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
});

const Meal = mongoose.model("Meal", MealSchema);

// ------------------- 🔹 ROUTES ------------------- //

// ✅ **Get All Meals**
app.get("/api/meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    if (!meals.length) return res.status(404).json({ error: "No meals found" });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch meals", details: err.message });
  }
});

// ✅ **Search Meals (by name)**
app.get("/api/meals/search", async (req, res) => {
  try {
    const { query } = req.query;
    const meals = await Meal.find({ name: { $regex: query, $options: "i" } });

    if (!meals.length) return res.status(404).json({ error: "No matching meals found" });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: "Failed to search meals", details: err.message });
  }
});

// ✅ **Add a Meal**
app.post("/api/meals", async (req, res) => {
  try {
    const { name, calories, protein, fat, carbs } = req.body;

    if (!name || calories === undefined || protein === undefined || fat === undefined || carbs === undefined) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newMeal = new Meal({ name, calories, protein, fat, carbs });
    await newMeal.save();

    res.status(201).json({ message: "Meal added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding meal", details: err.message });
  }
});

// ✅ **Delete a Meal**
app.delete("/api/meals/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });

    res.json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting meal", details: err.message });
  }
});

// 🔹 Start Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],  // Allow both ports
  credentials: true
}));
