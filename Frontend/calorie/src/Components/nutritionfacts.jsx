import React, { useState, useEffect } from "react";
import "../css/nutritionfacts.css";

const NutritionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/meals")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Meals:", data); // Debugging
        setFoodItems(data);
      })
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

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
