import "../../css/HomePage/MatchCard.css";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const MatchCard = ({ match }) => {
  // Log the match object to see its structure
  console.log(match);

  // Check if match is defined and if match.teams exists and has elements
  const teams = match?.teams || []; // Use optional chaining and fallback to an empty array
  const team1 = teams[0] || "Team 1"; // Fallback to "Team 1" if undefined
  const team2 = teams[1] || "Team 2"; // Fallback to "Team 2" if undefined

  // Process venue data
  const fixedVenue = match?.venue ? match.venue.replace(/({|})/g, "") : ""; // Handle if venue is undefined
  const parsedVenue = fixedVenue.split(","); // Split the string into an array
  const venue = parsedVenue.join(" "); // Join with a space

  // Ensure dates array exists and has at least one element
  const matchDate = match?.date?.[0] || "Date not available"; // Fallback if dates is undefined or empty

  return (
    <div className="container">
      <div className="match-card">
        <h2 className="match-type">{match?.match_type || "Match Type Not Available"}</h2>
        <div className="logos">
          <div className="team">
            <img
              // Check if logo data exists
              alt={`${team1} logo`}
              className="team-logo"
            />
            <p className="team-name">{team1}</p>
          </div>
          <span className="vs">vs</span>
          <div className="team">
            <img
              // Check if logo data exists
              alt={`${team2} logo`}
              className="team-logo"
            />
            <p className="team-name">{team2}</p>
          </div>
        </div>
        <div className="match-details">
          <p>
            <CalendarToday className="icon" />
            {matchDate}
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
