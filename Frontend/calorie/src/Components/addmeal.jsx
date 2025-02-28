import React, { useState } from "react";
import "../css/addmeal.css"; // Import CSS file

const AddMeal = () => {
    const [mealName, setMealName] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [type, setType] = useState("");
    const [nutrition, setNutrition] = useState(null);
    const [error, setError] = useState("");

    const fetchNutritionData = async () => {
        if (!mealName) {
            setError("⚠️ Please enter a meal name.");
            return;
        }

        // Search for products by name
        const searchUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${mealName}&search_simple=1&json=1`;

        try {
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();

            if (!searchData.products || searchData.products.length === 0) {
                setNutrition(null);
                setError("⚠️ No products found for this food.");
                return;
            }

            // Get the first matching product
            const product = searchData.products[0];
            const productCode = product.code;

            // Fetch product details
            const productUrl = `https://world.openfoodfacts.org/api/v0/product/${productCode}.json`;
            const productResponse = await fetch(productUrl);
            const productData = await productResponse.json();

            if (!productData.product || !productData.product.nutriments) {
                setNutrition(null);
                setError("⚠️ Nutrition data not found.");
                return;
            }

            const nutrients = productData.product.nutriments;

            setNutrition({
                calories: nutrients["energy-kcal_100g"] || "N/A",
                protein: nutrients["proteins_100g"] || "N/A",
                carbs: nutrients["carbohydrates_100g"] || "N/A",
                fats: nutrients["fat_100g"] || "N/A"
            });

            setError("");
        } catch (err) {
            console.error("Error fetching nutrition data:", err);
            setError("⚠️ Error fetching data.");
        }
    };

    return (
        <div className="add-meal-container">
            <h2 className="add-meal-title">🍽️ Add Meal</h2>

            <div className="add-meal-form">
                <input 
                    type="text" 
                    placeholder="Enter food name (e.g., apple, chocolate)" 
                    value={mealName} 
                    onChange={(e) => setMealName(e.target.value)} 
                />
                
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                    <option value="">Select Cuisine</option>
                    <option value="indian">Indian</option>
                    <option value="chinese">Chinese</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                </select>

                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="drink">Drink</option>
                    <option value="snack">Snack</option>
                    <option value="meal">Meal</option>
                </select>

                <button onClick={fetchNutritionData}>🔍 Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            {nutrition && (
                <div className="nutrition-info">
                    <h3>🍎 Nutrition Details (per 100g)</h3>
                    <p><strong>🔥 Calories:</strong> {nutrition.calories} kcal</p>
                    <p><strong>💪 Protein:</strong> {nutrition.protein} g</p>
                    <p><strong>🥖 Carbs:</strong> {nutrition.carbs} g</p>
                    <p><strong>🛢️ Fats:</strong> {nutrition.fats} g</p>
                </div>
            )}
        </div>
    );
};

export default AddMeal;
