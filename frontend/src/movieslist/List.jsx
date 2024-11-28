//code  for api endpoint
// import React, { useState, useEffect } from "react";
// import { ScrollMenu } from "react-horizontal-scrolling-menu";
// import MatchCard from "./MatchCard.jsx";
// import "react-horizontal-scrolling-menu/dist/styles.css";

// const Arrow = ({ text, className }) => <div className={className}>{text}</div>;

// const List = ({ apiEndpoint, heading }) => {
//   const [matches, setMatches] = useState([]);

//   useEffect(() => {
//     fetch(apiEndpoint)
//       .then((response) => response.json())
//       .then((data) => setMatches(data || []))
//       .catch((err) => console.error("Error fetching matches:", err));
//   }, [apiEndpoint]);

//   return (
//     <div className="lists" style={{ width: "70vw" }}>
//       <br />
//       <div
//         style={{
//           marginLeft: "20px",
//           marginBottom: "-50px",
//           width: "4px",
//           height: "40px",
//           backgroundColor: "var(--red)",
//         }}
//       />
//       <h2 style={{ marginLeft: "5px" }}>{heading}</h2>
//       <br />
//       <ScrollMenu
//         LeftArrow={<Arrow text="<" className="arrow-prev" />}
//         RightArrow={<Arrow text=">" className="arrow-next" />}
//       >
//         {matches.map((match) => (
//           <div key={match.id} className="menu-item">
//             <MatchCard match={match} />
//           </div>
//         ))}
//       </ScrollMenu>
//     </div>
//   );
// };

// export default List;
import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import MatchCard from "./MatchCard.jsx";
import "react-horizontal-scrolling-menu/dist/styles.css";
import cricketicon from "../assets/cricket.png";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Arrow = ({ text, className }) => <div className={className}>{text}</div>;

const dummyMatches = [
  {
    id: 1,
    team1Name: "India",
    team2Name: "Australia",
    team1Logo: "https://flagcdn.com/in.svg",
    team2Logo: "https://flagcdn.com/au.svg",
    matchType: "US Premier League T20 Series",
    date: "2024-12-01",
    stadium: "National Stadium",
  },
  {
    id: 2,
    team1Name: "England",
    team2Name: "South Africa",
    team1Logo: "https://flagcdn.com/gb.svg",
    team2Logo: "https://flagcdn.com/za.svg",
    matchType: "US Premier League T20 Series",
    date: "2024-12-02",
    stadium: "City Arena",
  },
  {
    id: 3,
    team1Name: "New Zealand",
    team2Name: "Pakistan",
    team1Logo: "https://flagcdn.com/nz.svg",
    team2Logo: "https://flagcdn.com/pk.svg",
    matchType: "US Premier League T20 Series",
    date: "2024-12-03",
    stadium: "Mega Sports Complex",
  },
  {
    id: 4,
    team1Name: "Sri Lanka",
    team2Name: "Bangladesh",
    team1Logo: "https://flagcdn.com/lk.svg",
    team2Logo: "https://flagcdn.com/bd.svg",
    matchType: "US Premier League T20 Series",
    date: "2024-12-04",
    stadium: "Stadium X",
  },
  {
    id: 5,
    team1Name: "West Indies",
    team2Name: "Afghanistan",
    team1Logo: "https://flagcdn.com/jm.svg",
    team2Logo: "https://flagcdn.com/af.svg",
    matchType: "US Premier League T20 Series",
    date: "2024-12-05",
    stadium: "Stadium Y",
  },
];

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = React.useContext(
    VisibilityContext
  );

  return (
    <button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      className="left-arrow"
      style={{
        background: "none",
        margin: 0,
        padding: 0,
        border: "none",
        outline: "none",
        cursor: isFirstItemVisible ? "not-allowed" : "pointer",
        opacity: isFirstItemVisible ? 0.5 : 1,
      }}
    >
      <FaChevronLeft size={24} color={isFirstItemVisible ? "gray" : "black"} />
    </button>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      className="right-arrow"
      style={{
        margin: 0,
        padding: 0,
        background: "none",
        border: "none",
        outline: "none",
        cursor: isLastItemVisible ? "not-allowed" : "pointer",
        opacity: isLastItemVisible ? 0.5 : 1,
      }}
    >
      <FaChevronRight size={24} color={isLastItemVisible ? "gray" : "black"} />
    </button>
  );
};

const List = ({ heading }) => {
  const [matches] = useState(dummyMatches);

  return (
    <div className="lists" style={{ width: "70vw" }}>
      <img
        src={cricketicon}
        alt="cricket Icon"
        style={{
          marginLeft: "20px",
          marginBottom: "-50px",
          width: "40px",
          height: "40px",
        }}
      />
      <h2 style={{ marginLeft: "70px" }}>{heading}</h2>
      <br />
      <div className="scrollcontainer">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {matches.map((match) => (
            <div key={match.id} className="menu-item">
              <MatchCard match={match} />
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default List;
