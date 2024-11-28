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
