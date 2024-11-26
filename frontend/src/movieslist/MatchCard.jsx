
// import React from "react";
// import "./MatchCard.css";

// const MatchCard = ({ match }) => {
//   return (
//     <div className="container">
//       <div className="match-card">
//         <div className="logos">
//           <div className="team">
//             <p className="team-name">{match.team1Name}</p>
//             <img
//               src={match.team1Logo}
//               alt={`${match.team1Name} logo`}
//               className="team-logo"
//             />
//           </div>
//           <span className="vs">vs</span>
//           <div className="team">
//             <p className="team-name">{match.team2Name}</p>
//             <img
//               src={match.team2Logo}
//               alt={`${match.team2Name} logo`}
//               className="team-logo"
//             />
//           </div>
//         </div>
//         <div className="match-details">
//           <p>{match.date}</p>
//           <p>{match.stadium}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchCard;


// import React from "react";
// import "./MatchCard.css";
// import { CalendarToday, LocationOn } from "@mui/icons-material";

// const MatchCard = ({ match }) => {
//   return (
//     <div className="container">
//       <div className="match-card">
//         <div className="logos">
//           <div className="team">
//             <img
//               src={match.team1Logo}
//               alt={`${match.team1Name} logo`}
//               className="team-logo"
//             />
//             <p className="team-name">{match.team1Name}</p>
//           </div>
//           <span className="vs">vs</span>
//           <div className="team">
//             <img
//               src={match.team2Logo}
//               alt={`${match.team2Name} logo`}
//               className="team-logo"
//             />
//             <p className="team-name">{match.team2Name}</p>
//           </div>
//         </div>
//         <div className="match-details">
//           <p>
//             <CalendarToday className="icon" />
//             {match.date}
//           </p>
//           <p>
//             <LocationOn className="icon" />
//             {match.stadium}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchCard;


import React from "react";
import "./MatchCard.css";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const MatchCard = ({ match }) => {
  return (
    <div className="container">
      <div className="match-card">
        <h2 className="match-type">{match.matchType}</h2>
        <div className="logos">
          <div className="team">
            <img
              src={match.team1Logo}
              alt={`${match.team1Name} logo`}
              className="team-logo"
            />
            <p className="team-name">{match.team1Name}</p>
          </div>
          <span className="vs">vs</span>
          <div className="team">
            <img
              src={match.team2Logo}
              alt={`${match.team2Name} logo`}
              className="team-logo"
            />
            <p className="team-name">{match.team2Name}</p>
          </div>
        </div>
        <div className="match-details">
           <p>
            <CalendarToday className="icon" />
             {match.date}
           </p>
           <p>
             <LocationOn className="icon" />
             {match.stadium}
           </p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
