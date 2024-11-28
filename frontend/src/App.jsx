import "./App.css";
import "./index.css";
import "./output.css";
import { Component } from "react";
import Home from "./pages/Home";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StarterPage from "./Starterpage/Starterpage";
import MyChatbot from "./ChatBot/ChatBot";
import CardStack from "./component/cardStack";

import PlayerCard from "./component/playerCard";
import DreamTeamGround from "./pages/dreamTeam";
import FavTeam from "./pages/FavTeam";
import Loading from "./component/Loading";
import CustomMatch from "./pages/CustomMatch";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyChatbot />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/custommatch/:date" element={<CustomMatch />} />
            <Route path="/teamSelect" element={<CardStack />} />
            <Route path="/loading" element={<Loading />} />

            {/* <Route path="/dreamTeam" element={<DreamTeam />}></Route> */}
            <Route
              path="/playerCard"
              element={
                <PlayerCard
                  name="Virat Kohli"
                  type={"All Rounder"}
                  points={90}
                  info="One of the greatest batsmen in cricket history."
                  backgroundImageUrl="https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg"
                  profileUrl="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png"
                />
              }
            />
            <Route path="/dreamTeam" element={<DreamTeamGround />} />
            <Route path="/" element={<StarterPage />} />
            <Route path="/fav" element={<FavTeam />} />
            <Route path="/chart" element={<h1>hi</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
