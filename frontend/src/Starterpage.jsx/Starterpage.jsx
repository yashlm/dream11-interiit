import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './StarterPage.css';
import Navbar from '../header/Navbar'; 

const App = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const handleNextClick = () => {
    navigate("/home"); 
  };

  return (
    <div>
    <Navbar/>
    <div className="main-container">
   
      <div className="content-container">
        <h1 className="welcome-text">
          Welcome , <br /> Let’s Get Started
        </h1>
        <div className="form-container">
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="next-btn" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
