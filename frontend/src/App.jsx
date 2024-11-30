import "./css/App.css";
import "./css/index.css";
import "./css/output.css";
import { Component } from "react";
import "./css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StarterPage from "./pages/Starterpage";
import MyChatbot from "./ChatBot/ChatBot";
import CardStack from "./component/cardStack";
import DreamTeamGround from "./pages/dreamTeam";
import FavTeam from "./pages/FavTeam";
import Loading from "./component/Loading";
import CustomMatch from "./pages/CustomMatch";
import HomePage from "./pages/HomePage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyChatbot />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/custommatch/:date" element={<CustomMatch />} />
            <Route path="/teamSelect" element={<CardStack />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/custommatch/:date" element={<CustomMatch />} />
            <Route path="/dreamTeam/:match_id" element={<DreamTeamGround />} />
            <Route path="/" element={<StarterPage />} />
            <Route path="/fav" element={<FavTeam />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
