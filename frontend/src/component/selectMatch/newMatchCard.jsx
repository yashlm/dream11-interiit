import styles from "../../css/HomePage/NewMatchCard.module.css";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NewMatchCard = ({ match }) => {
  const navigate = useNavigate();
  const teams = match?.teams || [];
  const team1 = teams[0] || "Team 1";
  const team2 = teams[1] || "Team 2";

  const fixedVenue = match?.venue ? match.venue.replace(/({|})/g, "") : "";
  const parsedVenue = fixedVenue.split(",");
  const venue = parsedVenue.join(" ");

  const matchDate = match?.dates?.[0] || "Date not available";

  const handleCardClick = () => {
    // Pass the necessary data as state when navigating to the match details page
    navigate(`/matchdetails/${match.match_id}`, {
      state: {
        matchDate,
        team1Logo: match?.team1_logo,
        team2Logo: match?.team2_logo,
      },
    });
  };

  return (
    <div className={styles["match-card"]}>
      <h2 className={styles["match-type"]}>
        {match?.match_type || "Match Type Not Available"}
      </h2>
      <div className={styles.logos}>
        <div className={styles.team}>
          <img
            className={styles["team-logo"]}
            alt={`${team1} logo`}
            src={match?.team1_logo}
          />
          {/* <p className={styles["team-name"]}>{team1}</p> */}
        </div>
        <span className={styles.vs}>vs</span>
        <div className={styles.team}>
          <img
            className={styles["team-logo"]}
            alt={`${team2} logo`}
            src={match?.team2_logo}
          />
          {/* <p className={styles["team-name"]}>{team2}</p> */}
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
      <div className={styles.buttonDiv}>
        <button
          onClick={() => {
            navigate(`/matchdetails/${match.match_id}`);
          }}
        >
          View Details
        </button>
        <button
          onClick={() => {
            navigate(`/dreamTeam/${match.match_id}`);
          }}
        >
          Create Team
        </button>
      </div>
    </div>
  );
};

export default NewMatchCard;