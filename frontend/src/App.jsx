import "./css/App.css";
import "./css/index.css";
import "./css/output.css";
import { useState } from "react";
import "./css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StarterPage from "./pages/Starterpage";
import ChatBot from "./ChatBot/ChatBot1";
import FloatingButton from "./ChatBot/FloatingButton";
import CardStack from "./component/selectMatch/cardStack";
import DreamTeamGround from "./pages/dreamTeam";
import FavTeam from "./pages/FavTeam";
import Loading from "./component/Loading";
import CustomMatch from "./pages/CustomMatch";
import CustomMatchcsv from "./pages/CustomMatchcsv";
import HomePage from "./pages/HomePage";
import PlayerCard from "./component/playerCard";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <div className="appbot">
          <ChatBot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
          <FloatingButton
            setIsChatOpen={setIsChatOpen}
            isChatOpen={isChatOpen}
          />
        </div>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/custommatch/:date" element={<CustomMatch />} />
          <Route path="/custommatch" element={<CustomMatchcsv />} />
          <Route path="/teamSelect" element={<CardStack />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/dreamTeam/:match_id" element={<DreamTeamGround />} />
          <Route path="/" element={<StarterPage />} />
          <Route path="/fav" element={<FavTeam />} />
          <Route
            path="/player"
            element={
              <PlayerCard
                name={"Virat Kohli"}
                points={120}
                type={"Batsman"}
                teamIconUrl={""}
                profileImage={
                  "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png"
                }
                bgImage={
                  "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg"
                }
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
