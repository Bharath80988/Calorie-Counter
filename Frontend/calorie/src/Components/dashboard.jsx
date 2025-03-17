import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/dashboard.css";
import userPic from "../assets/picofme.png";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const COLORS = ["#00FFFF", "#FF4500", "#FFD700"];

const Dashboard = () => {
  const [calorieData, setCalorieData] = useState([
    { day: "Mon", calories: 0 },
    { day: "Tue", calories: 0 },
    { day: "Wed", calories: 0 },
    { day: "Thu", calories: 0 },
    { day: "Fri", calories: 0 },
    { day: "Sat", calories: 0 },
    { day: "Sun", calories: 0 }
  ]);

  const [exerciseData, setExerciseData] = useState([
    { day: "Mon", minutes: 0 },
    { day: "Tue", minutes: 0 },
    { day: "Wed", minutes: 0 },
    { day: "Thu", minutes: 0 },
    { day: "Fri", minutes: 0 },
    { day: "Sat", minutes: 0 },
    { day: "Sun", minutes: 0 }
  ]);

  const [weeklyReport, setWeeklyReport] = useState([
    { name: "Calories Burned", value: 0 },
    { name: "Calories Consumed", value: 0 }
  ]);

  const [exercisePieData, setExercisePieData] = useState([
    { name: "Light Exercise", value: 0 },
    { name: "Moderate Exercise", value: 0 },
    { name: "Intense Exercise", value: 0 }
  ]);

  const [foodItem, setFoodItem] = useState("");
  const [exerciseType, setExerciseType] = useState("Light Exercise");
  const [exerciseDuration, setExerciseDuration] = useState("");

  // Function to fetch calories for food item
  const addFoodItem = async () => {
    if (!foodItem) return;

    try {
      const response = await axios.get(`https://calorie-counter-xp9i.onrender.com/api/meals/${foodItem}`);  
      const meal = response.data;

      if (meal.length > 0) {
        const calories = meal[0].calories;
        updateCalorieData(calories);
      } else {
        alert("Food item not found in database!");
      }
    } catch (error) {
      console.error("Error fetching meal:", error);
    }

    setFoodItem(""); 
  };

  // Update weekly calorie data
  const updateCalorieData = (newCalories) => {
    const today = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = days[today];

    const updatedData = calorieData.map((data) =>
      data.day === dayName ? { ...data, calories: data.calories + newCalories } : data
    );

    setCalorieData(updatedData);

    setWeeklyReport((prevReport) => [
      { name: "Calories Burned", value: prevReport[0].value },
      { name: "Calories Consumed", value: prevReport[1].value + newCalories }
    ]);
  };

  // Update exercise data
  const addExercise = () => {
    const duration = parseInt(exerciseDuration);
    if (!duration || duration <= 0) return;

    const today = new Date().getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = days[today];

    const updatedExerciseData = exerciseData.map((data) =>
      data.day === dayName ? { ...data, minutes: data.minutes + duration } : data
    );
    setExerciseData(updatedExerciseData);

    const updatedPieData = exercisePieData.map((item) =>
      item.name === exerciseType ? { ...item, value: item.value + duration } : item
    );
    setExercisePieData(updatedPieData);

    setWeeklyReport((prevReport) => [
      { name: "Calories Burned", value: prevReport[0].value + duration * 5 },
      { name: "Calories Consumed", value: prevReport[1].value }
    ]);

    setExerciseDuration(""); 
  };

  return (
    <div className="dashboard-container">
      <div className="user-info">
        <span className="user-name">Test User</span>
        <img src={userPic} alt="User Logo" className="user-logo" />
      </div>

      {/* Header */}
      <header className="dashboard-header">
        <h2>Health Dashboard</h2>
      </header>

      {/* Food Input */}
      <div className="food-input">
        <input
          type="text"
          placeholder="Enter food item..."
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <button onClick={addFoodItem}>Add</button>
      </div>

      {/* Exercise Input */}
      <div className="exercise-input">
        <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
          <option value="Light Exercise">Light Exercise</option>
          <option value="Moderate Exercise">Moderate Exercise</option>
          <option value="Intense Exercise">Intense Exercise</option>
        </select>
        <input
          type="number"
          placeholder="Minutes"
          value={exerciseDuration}
          onChange={(e) => setExerciseDuration(e.target.value)}
        />
        <button onClick={addExercise}>Add</button>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* 1. Weekly Summary Pie Chart */}
        <div className="chart">
          <h3>Weekly Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={weeklyReport} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                {weeklyReport.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Exercise Breakdown Pie Chart */}
        <div className="chart">
          <h3>Exercise Intensity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={exercisePieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label>
                {exercisePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Exercise Time Bar Chart */}
        <div className="chart">
          <h3>Exercise Time (Minutes per Day)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exerciseData}>
              <XAxis dataKey="day" stroke="cyan" />
              <YAxis stroke="cyan" />
              <Tooltip />
              <Legend />
              <Bar dataKey="minutes" fill="cyan" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Weekly Calorie Intake Line Chart */}
        <div className="chart">
          <h3>Weekly Calorie Intake</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calorieData}>
              <XAxis dataKey="day" stroke="cyan" />
              <YAxis stroke="cyan" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="calories" stroke="cyan" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
