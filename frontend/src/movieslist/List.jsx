import React, { useState, useEffect } from "react";
import { ScrollMenu, } from "react-horizontal-scrolling-menu";
import SingleMovie from "./SingleMovie.jsx";
import "react-horizontal-scrolling-menu/dist/styles.css";


// Arrow components
const Arrow = ({ text, className }) => <div className={className}>{text}</div>;

const List = ({ apiCall, heading }) => {
  const [movies, setMovies] = useState([]);
  const randomPage = Math.floor(Math.random() * 100) + 1;

  useEffect(() => {
    const url =
      typeof apiCall === "number"
        ? `https://api.themoviedb.org/3/discover/movie?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${apiCall}&page=${randomPage}`
        : `https://api.themoviedb.org/3/movie/${apiCall}?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [apiCall, randomPage]);

  return (
    <div className="lists">
      <br />
      <div
        style={{
          marginLeft: "20px",
          marginBottom: "-50px",
          width: "8px",
          height: "40px",
          backgroundColor: "red",
        }}
      />
      <h2 style={{ marginLeft: "25px" }}>{heading}</h2>
      <br />
      <ScrollMenu
        LeftArrow={<Arrow text="<" className="arrow-prev" />}
        RightArrow={<Arrow text=">" className="arrow-next" />}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="menu-item">
            <SingleMovie movie={movie} />
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default List;
