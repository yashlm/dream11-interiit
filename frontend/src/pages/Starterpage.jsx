import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import '../css/StarterPage.css';
import Navbar from '../component/Navbar';
import Testinomial from '../component/testinomials';
import logo from '../assets/landing_page/dream11logo.svg';
import FAQ from '../component/faqs';
import AboutUs from '../component/AboutUs';
import Footer from '../component/footer'

const App = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/home');
  };

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="content-container">
          <h1 className="welcome-text">
            Welcome to <span className="dream11"><img src={logo} alt="Dream11 Logo" /></span>
            <span className="lets">Let’s Get Started</span>
          </h1>
          <div className="form-container">
            <TextField
              className="outlined-name"
              id="outlined-username"
              label="Enter Your Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{ style: { color: 'white' } }}
              InputLabelProps={{ style: { color: '#808080' } }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px solid #fcf3f2',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    border: '2px solid #e6e6e6',
                  },
                  '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fcf3f2',
                  },
                },
              }}
            />
            <button className="next-btn" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
      <AboutUs />
      <Testinomial />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;
