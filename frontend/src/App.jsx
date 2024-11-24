import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import CardStack from "./component/cardStack";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CardStack />} />
        <Route
          path="/theme"
          element={
            <button
              onClick={() => {
                console.log("hi");
                document.body.classList.toggle("dark-theme");
              }}
            >
              Change theme
            </button>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
