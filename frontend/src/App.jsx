import './App.css'
import './index.css'
// import './output.css'
import { Component } from "react";
import Home from "./header/Home";
// import MovieInfo from "./MovieInfo";
// import Tvinfo from "./Tvinfo";
// import Error from "./header/Error";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/:movie_id" element={<MovieInfo />} /> */}
            {/* <Route path="/tv/:movie_id" element={<Tvinfo />} /> */}
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
