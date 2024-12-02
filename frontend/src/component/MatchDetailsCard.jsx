import { CalendarToday, LocationOn } from "@mui/icons-material";
import styles from "../css/MatchDetailsCard.module.css";

const MatchDetailsCard = ({ match }) => {
  const fixedVenue = match.venue.replace(/({|})/g, ""); // Remove curly braces
  const parsedVenue = fixedVenue.split(","); // Split the string into an array
  const venue = parsedVenue.join(" "); // Join with a space

  return (
    <div className={styles.container}>
  <div className={styles.matchCard}>
    <h2 className={styles.matchType}>{match.match_type}</h2>
    <div className={styles.logos}>
      <div className={styles.team}>
        <img
          src={match.teamAicon}
          alt={`${match.teams[0]} logo`}
          className={styles.teamLogo}
        />
        <p className={styles.teamName}>{match.teams[0]}</p>
      </div>
      <span className={styles.vs}>vs</span>
      <div className={styles.team}>
        <img
          src={match.teamBicon}
          alt={`${match.teams[1]} logo`}
          className={styles.teamLogo}
        />
        <p className={styles.teamName}>{match.teams[1]}</p>
      </div>
    </div>
    
    {/* Add Separator Line */}
    <div className={styles.separatorLine}></div>
    
    <div className={styles.matchDetails}>
      <p>
        <CalendarToday className={styles.icon} />
        {match.dates}
      </p>
      <p>
        <LocationOn className={styles.icon} />
        {venue}
      </p>
    </div>
  </div>
</div>

  );
};

export default MatchDetailsCard;
