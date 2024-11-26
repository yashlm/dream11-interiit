import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'; 
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
      <Navbar />
      <div className="main-container">
        <div className="content-container">
          <h1 className="welcome-text">
            Welcome , <br /> Let’s Get Started
          </h1>
          <div className="form-container">
            <TextField
              id="outlined-username" 
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ style: { color:"white",} }}
              InputLabelProps={{ style: { color: "#e6e6e6" } }}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #fcf3f2"
                },
      
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "2px solid #e6e6e6"
                  },
                  "&:hover:not(.Mui-focused)": {
               "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fcf3f2",
            },
          },

                }
              }}
            
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
