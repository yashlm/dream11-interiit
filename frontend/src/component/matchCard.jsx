import React from "react";
import "./matchCard.css"; // Create this file for custom styling

const MatchCard = ({ stadium, date, team1, team2 }) => {
  return (
    <div className="match-card">
      <div className="match-header">
        <div className="match-number">1</div>
        <div className="match-details">
          <h3>{stadium}</h3>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="match-body">
        <div className="team">
          <img src={team1.imageUrl} alt={`${team1.name} flag`} />
          <p>{team1.name}</p>
        </div>
        <div className="vs">VS</div>
        <div className="team">
          <img src={team2.imageUrl} alt={`${team2.name} flag`} />
          <p>{team2.name}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
