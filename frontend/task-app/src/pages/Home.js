import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../component/Login';
const Home = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    onLoginSuccess();
    navigate('/dashboard');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Task Man</h1>
      <div className="login-container">
        <Login/>
        <div className="register-link">
          <a href="/register">New User? Register</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
