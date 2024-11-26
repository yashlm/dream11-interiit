import './App.css'
import './index.css'
import { Component } from "react";
import Home from "./header/Home";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StarterPage from './Starterpage/Starterpage';
import MyChatbot from './ChatBot/ChatBot';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <MyChatbot/>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<StarterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
