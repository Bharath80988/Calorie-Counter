import React, { useState } from "react";
import axios from "axios";
import "../css/custommeal.css"; // Import CSS

const CustomMeal = () => {
    const [mealName, setMealName] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [message, setMessage] = useState("");

    const handleAddMeal = async () => {
        if (!mealName || !calories || !protein || !carbs || !fats) {
            setMessage("⚠️ Please fill all fields.");
            return;
        }

        const newMeal = {
            name: mealName,
            calories,
            protein,
            carbs,
            fat: fats, // Match backend schema
        };

        try {
            await axios.post("http://localhost:3001/api/upload", newMeal);
            setMessage("✅ Meal added successfully!");
            setMealName("");
            setCalories("");
            setProtein("");
            setCarbs("");
            setFats("");
        } catch (err) {
            setMessage("⚠️ Error adding meal. Please try again.");
            console.error("Error:", err);
        }
    };

    return (
        <div className="custom-meal-container">
            <h2 className="custom-meal-title">🍽️ Add Food</h2>

            <div className="custom-meal-form">
                <input 
                    type="text" 
                    placeholder="Enter food name" 
                    value={mealName} 
                    onChange={(e) => setMealName(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Calories (kcal)" 
                    value={calories} 
                    onChange={(e) => setCalories(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Protein (g)" 
                    value={protein} 
                    onChange={(e) => setProtein(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Carbs (g)" 
                    value={carbs} 
                    onChange={(e) => setCarbs(e.target.value)} 
                />

                <input 
                    type="number" 
                    placeholder="Fats (g)" 
                    value={fats} 
                    onChange={(e) => setFats(e.target.value)} 
                />

                <button onClick={handleAddMeal}>➕ Add Food</button>
            </div>

            {message && <p className="custom-message">{message}</p>}
        </div>
    );
};

export default CustomMeal;
