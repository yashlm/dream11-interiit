import React from "react";
import "./MatchCard.css";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const MatchCard = ({ match }) => {
  const fixedVenue = match.venue.replace(/({|})/g, ""); // Remove curly braces
  const parsedVenue = fixedVenue.split(","); // Split the string into an array
  const venue = parsedVenue.join(" "); // Join with a space

  return (
    <div className="container">
      <div className="match-card">
        <h2 className="match-type">{match.match_type}</h2>
        <div className="logos">
          <div className="team">
            {/* team 1 image we are not getting the url */}
            <img
              // src={match.team1Logo}
              alt={`${match.teams[0]} logo`}
              className="team-logo"
            />
            <p className="team-name">{match.teams[0]}</p>
          </div>
          <span className="vs">vs</span>
          <div className="team">
            <img
              // src={match.team2Logo}
              alt={`${match.teams[1]} logo`}
              className="team-logo"
            />
            <p className="team-name">{match.teams[1]}</p>
          </div>
        </div>
        <div className="match-details">
          <p>
            <CalendarToday className="icon" />
            {match.dates[0]}
          </p>
          <p>
            <LocationOn className="icon" />
            {venue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
