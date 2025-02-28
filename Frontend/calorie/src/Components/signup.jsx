import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/signup.css';

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (username && email && password) {
      localStorage.setItem('token', 'sample_token');
      setUser('sample_token');
      navigate('/dashboard');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSignup}>Signup</button>
        <p onClick={() => navigate('/login')}>Already have an account? Login</p>
      </div>
    </div>
  );
};

export default Signup;
