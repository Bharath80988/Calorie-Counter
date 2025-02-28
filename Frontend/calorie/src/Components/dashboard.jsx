import React from "react";
import "../css/dashboard.css";
import userPic from "../assets/picofme.png";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

// Data for charts
const calorieData = [
  { day: "Mon", calories: 1800 },
  { day: "Tue", calories: 2000 },
  { day: "Wed", calories: 2200 },
  { day: "Thu", calories: 2100 },
  { day: "Fri", calories: 1900 },
  { day: "Sat", calories: 2500 },
  { day: "Sun", calories: 2300 }
];

const exerciseData = [
  { day: "Mon", minutes: 30 },
  { day: "Tue", minutes: 45 },
  { day: "Wed", minutes: 60 },
  { day: "Thu", minutes: 40 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 70 },
  { day: "Sun", minutes: 60 }
];

const weeklyReport = [
  { name: "Calories Burned", value: 5000 },
  { name: "Calories Consumed", value: 12000 }
];

const exercisePieData = [
  { name: "Light Exercise", value: 120 },
  { name: "Moderate Exercise", value: 180 },
  { name: "Intense Exercise", value: 210 }
];

const COLORS = ["#00FFFF", "#FF4500", "#FFD700"];

const Dashboard = () => {
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

      {/* Input Bar for Food Tracking */}
      <div className="food-input">
        <input type="text" placeholder="Enter food item..." />
        <button>Add</button>
      </div>

      {/* Charts Section - Pie Charts First */}
      <div className="charts-container">
        {/* Weekly Summary Pie Chart */}
        <div className="chart">
          <h3>Weekly Report</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={weeklyReport}
                cx="50%" cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {weeklyReport.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Exercise Pie Chart */}
        <div className="chart">
          <h3>Exercise Intensity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={exercisePieData}
                cx="50%" cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {exercisePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Exercise Time Bar Chart */}
        <div className="chart">
          <h3>Exercise Time (Minutes per Day)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exerciseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.3)" />
              <XAxis dataKey="day" stroke="cyan" />
              <YAxis stroke="cyan" />
              <Tooltip />
              <Legend />
              <Bar dataKey="minutes" fill="cyan" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Calorie Intake Line Chart */}
        <div className="chart">
          <h3>Calorie Intake (Daily)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.3)" />
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
