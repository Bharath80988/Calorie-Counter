import { Link } from 'react-router-dom';
import '../css/navbar.css';
import { useState } from 'react';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/nutritionFacts">Nutrition Facts</Link></li>
          <div className="dropdown" onMouseEnter={() => setDropdown(!dropdown)}>
            <li>
              <span className="meal">Meal Log</span>
              {dropdown && (
                <ul className="dropdown-menu">
                  <li><Link to="/addMeal">Add Meal</Link></li>
                  <li><Link to="/customMeal">Custom Meal</Link></li>
                </ul>
              )}
            </li>
          </div>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
