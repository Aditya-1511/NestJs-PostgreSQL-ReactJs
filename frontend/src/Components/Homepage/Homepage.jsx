import React from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="homepage">
      <div className="mainContainer">
        <h1 className="mainHeading">Welcome to E-kart</h1>
        <div className="buttons">
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
          <button className="registerbutton" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
