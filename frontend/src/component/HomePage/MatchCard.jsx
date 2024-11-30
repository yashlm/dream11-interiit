import styles from "../../css/HomePage/MatchCard.module.css";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const MatchCard = ({ match }) => {
  const teams = match?.teams || [];
  const team1 = teams[0] || "Team 1";
  const team2 = teams[1] || "Team 2";

  const fixedVenue = match?.venue ? match.venue.replace(/({|})/g, "") : "";
  const parsedVenue = fixedVenue.split(",");
  const venue = parsedVenue.join(" ");

  const matchDate = match?.dates?.[0] || "Date not available";

  return (
    <div className={styles.container}>
      <div className={styles["match-card"]}>
        <h2 className={styles["match-type"]}>
          {match?.match_type || "Match Type Not Available"}
        </h2>
        <div className={styles.logos}>
          <div className={styles.team}>
            <img className={styles["team-logo"]} alt={`${team1} logo`} />
            <p className={styles["team-name"]}>{team1}</p>
          </div>
          <span className={styles.vs}>vs</span>
          <div className={styles.team}>
            <img className={styles["team-logo"]} alt={`${team2} logo`} />
            <p className={styles["team-name"]}>{team2}</p>
          </div>
        </div>
        <div className={styles["match-details"]}>
          <p>
            <CalendarToday className={styles.icon} />
            {matchDate}
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

export default MatchCard;
