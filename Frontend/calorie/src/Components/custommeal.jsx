import React, { useState } from "react";
import "../css/custommeal.css"; // Separate CSS for Custom Meal

const CustomMeal = () => {
    const [mealName, setMealName] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [meals, setMeals] = useState([]); // Stores added meals
    const [error, setError] = useState("");

    const handleAddMeal = () => {
        if (!mealName || !calories || !protein || !carbs || !fats) {
            setError("⚠️ Please fill all fields.");
            return;
        }

        const newMeal = {
            name: mealName,
            calories,
            protein,
            carbs,
            fats
        };

        setMeals([...meals, newMeal]); // Add meal to list
        setError("");
        setMealName("");
        setCalories("");
        setProtein("");
        setCarbs("");
        setFats("");
    };

    return (
        <div className="custom-meal-container">
            <h2 className="custom-meal-title">🍽️ Add Custom Meal</h2>

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

                <button onClick={handleAddMeal}>➕ Add Meal</button>
            </div>

            {error && <p className="custom-error">{error}</p>}

            {meals.length > 0 && (
                <div className="custom-nutrition-info">
                    <h3>🍎 Custom Meals</h3>
                    {meals.map((meal, index) => (
                        <div key={index} className="custom-meal-item">
                            <h4>📌 {meal.name}</h4>
                            <p><strong>🔥 Calories:</strong> {meal.calories} kcal</p>
                            <p><strong>💪 Protein:</strong> {meal.protein} g</p>
                            <p><strong>🥖 Carbs:</strong> {meal.carbs} g</p>
                            <p><strong>🛢️ Fats:</strong> {meal.fats} g</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomMeal;
