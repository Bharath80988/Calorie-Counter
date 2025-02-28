import React, { useState } from "react";
import "../css/nutritionfacts.css";

const NutritionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const foodItems = [
    { name: "Apple", calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    { name: "Banana", calories: 89, protein: 1.1, fat: 0.3, carbs: 23 },
    { name: "Orange", calories: 47, protein: 0.9, fat: 0.1, carbs: 12 },
    { name: "Grapes", calories: 69, protein: 0.7, fat: 0.2, carbs: 18 },
    { name: "Mango", calories: 60, protein: 0.8, fat: 0.4, carbs: 15 },
    { name: "Strawberry", calories: 32, protein: 0.7, fat: 0.3, carbs: 7.7 },
    { name: "Watermelon", calories: 30, protein: 0.6, fat: 0.2, carbs: 8 },
    { name: "Pineapple", calories: 50, protein: 0.5, fat: 0.1, carbs: 13 },
    { name: "Burger", calories: 295, protein: 17, fat: 14, carbs: 30 },
    { name: "Pizza", calories: 266, protein: 11, fat: 10, carbs: 33 },
    { name: "French Fries", calories: 312, protein: 3.4, fat: 15, carbs: 41 },
    { name: "Pav Bhaji", calories: 390, protein: 8, fat: 20, carbs: 45 },
    { name: "Samosa", calories: 308, protein: 6, fat: 18, carbs: 36 },
    { name: "Chicken Biryani", calories: 320, protein: 19, fat: 12, carbs: 40 },
    { name: "Dal Tadka", calories: 220, protein: 12, fat: 6, carbs: 28 },
    { name: "Rajma Chawal", calories: 350, protein: 15, fat: 8, carbs: 55 },
    { name: "Butter Naan", calories: 300, protein: 7, fat: 10, carbs: 50 },
    { name: "Chole Bhature", calories: 450, protein: 14, fat: 22, carbs: 50 },
    { name: "Dhokla", calories: 160, protein: 8, fat: 4, carbs: 25 },
    { name: "Idli Sambar", calories: 200, protein: 9, fat: 2, carbs: 40 },
    { name: "Dosa", calories: 168, protein: 4, fat: 5, carbs: 30 },
    { name: "Vada Pav", calories: 290, protein: 6, fat: 15, carbs: 34 },
    { name: "Poha", calories: 250, protein: 6, fat: 8, carbs: 45 },
    { name: "Aloo Paratha", calories: 320, protein: 7, fat: 18, carbs: 40 },
    { name: "Pani Puri", calories: 180, protein: 3, fat: 6, carbs: 25 },
    { name: "Gulab Jamun", calories: 150, protein: 2, fat: 7, carbs: 20 },
    { name: "Jalebi", calories: 140, protein: 1, fat: 7, carbs: 19 },
    { name: "Mysore Pak", calories: 200, protein: 3, fat: 10, carbs: 25 },
    { name: "Chocolate Cake", calories: 350, protein: 5, fat: 15, carbs: 50 },
    { name: "Ice Cream", calories: 200, protein: 4, fat: 11, carbs: 24 },
    { name: "Soft Drink", calories: 150, protein: 0, fat: 0, carbs: 39 },
    { name: "Milkshake", calories: 250, protein: 8, fat: 10, carbs: 35 },
    { name: "Hot Dog", calories: 290, protein: 11, fat: 17, carbs: 30 },
    { name: "Tandoori Chicken", calories: 280, protein: 25, fat: 10, carbs: 8 },
    { name: "Shawarma", calories: 310, protein: 22, fat: 15, carbs: 30 },
    { name: "Pasta Alfredo", calories: 400, protein: 12, fat: 18, carbs: 50 },
    { name: "Mac and Cheese", calories: 320, protein: 10, fat: 15, carbs: 40 },
    { name: "Fried Chicken", calories: 320, protein: 24, fat: 18, carbs: 14 },
    { name: "Chowmein", calories: 280, protein: 7, fat: 10, carbs: 40 },
    { name: "Tacos", calories: 250, protein: 10, fat: 12, carbs: 30 },
    { name: "Burrito", calories: 420, protein: 18, fat: 15, carbs: 50 },
    { name: "Nachos", calories: 350, protein: 9, fat: 18, carbs: 40 },
    { name: "Hakka Noodles", calories: 270, protein: 6, fat: 8, carbs: 42 },
    { name: "Falafel", calories: 330, protein: 12, fat: 18, carbs: 35 },
    { name: "Cheesecake", calories: 400, protein: 7, fat: 25, carbs: 45 },
    { name: "Brownie", calories: 380, protein: 6, fat: 20, carbs: 45 },
    { name: "Popcorn", calories: 100, protein: 3, fat: 2, carbs: 20 },
    { name: "Omelette", calories: 210, protein: 15, fat: 14, carbs: 2 },
    { name: "Scrambled Eggs", calories: 180, protein: 12, fat: 13, carbs: 3 },
    { name: "Muesli", calories: 240, protein: 7, fat: 6, carbs: 38 },
    { name: "Energy Bar", calories: 220, protein: 10, fat: 6, carbs: 30 },
    { name: "Fruit Smoothie", calories: 180, protein: 5, fat: 2, carbs: 40 },
    { name: "Green Salad", calories: 120, protein: 4, fat: 6, carbs: 12 },
    { name: "Grilled Salmon", calories: 350, protein: 30, fat: 20, carbs: 2 },
  ];

  const filteredFoods = foodItems.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="nutrition-container">
      <h1>Nutrition Facts</h1>
      <input
        type="text"
        placeholder="Search for food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="table-container">
        <table className="nutrition-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Calories</th>
              <th>Protein (g)</th>
              <th>Fat (g)</th>
              <th>Carbs (g)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food, index) => (
                <tr key={index}>
                  <td>{food.name}</td>
                  <td>{food.calories}</td>
                  <td>{food.protein}</td>
                  <td>{food.fat}</td>
                  <td>{food.carbs}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-result">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionPage;
