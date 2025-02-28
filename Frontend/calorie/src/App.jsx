import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar.jsx";
import Home from "./Components/dashboard.jsx";
import Signup from "./Components/signup.jsx";
import Login from "./Components/login.jsx";
import NutritionFacts from "./Components/nutritionfacts.jsx";
import AddMeal from "./Components/addMeal.jsx";
import CustomMeal from "./Components/custommeal.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nutritionFacts" element={<NutritionFacts />} />
          <Route path="/addMeal" element={<AddMeal />} />
          <Route path="/customMeal" element={<CustomMeal />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Custom 404 Page
function NotFound() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
    </div>
  );
}

export default App;
