import styles from "../../css/HomePage/MatchCard.module.css";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MatchCard = ({ match }) => {
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
    <div className={styles.container}>
      <div className={styles["match-card"]} onClick={handleCardClick}>
        <h2 className={styles["match-type"]}>
          {match?.event_name || "Match Type Not Available"}
        </h2>
        <div className={styles.logos}>
          <div className={styles.team}>
            <img className={styles["team-logo"]} alt={`${team1} logo`} src={match?.team_info.teamAinfo.url} />
            <p className={styles["team-name"]}>{team1}</p>
          </div>
          <span className={styles.vs}>vs</span>
          <div className={styles.team}>
            <img className={styles["team-logo"]} alt={`${team2} logo`} src={match?.team_info.teamBinfo.url} />
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


const t = {
  status: "ok",
  message: "Teams retrieved successfully",
  data: [
    {
      match_id: "1432439",
      innings: 1,
      batting_team: "Australia",
      city: "Sharjah",
      dates: ["2024-10-13"],
      event_name: "ICC Women's T20 World Cup",
      match_number: "18",
      gender: "female",
      match_type: "T20",
      match_referees: "SA Fritz",
      tv_umpires: "JM Williams",
      umpires: ["Kim Cotton", "S Redfern"],
      team_type: "international",
      teams: ["Australia", "India"],
      venue: "Sharjah Cricket Stadium",
      players:
        '{"GM Harris","BL Mooney","G Wareham","TM McGrath","EA Perry","A Gardner","P Litchfield","A Sutherland","S Molineux","ML Schutt","D Brown"}',
      season: "2024/25",
    },
    {
      match_id: "1432439",
      innings: 2,
      batting_team: "India",
      city: "Sharjah",
      dates: ["2024-10-13"],
      event_name: "ICC Women's T20 World Cup",
      match_number: "18",
      gender: "female",
      match_type: "T20",
      match_referees: "SA Fritz",
      tv_umpires: "JM Williams",
      umpires: ["Kim Cotton", "S Redfern"],
      team_type: "international",
      teams: ["Australia", "India"],
      venue: "Sharjah Cricket Stadium",
      players:
        '{"Shafali Verma","S Mandhana","JI Rodrigues","H Kaur","DB Sharma","RM Ghosh","P Vastrakar","A Reddy","SR Patil","RP Yadav","Renuka Singh"}',
      season: "2024/25",
    },
  ],
  team_info: [
    {
      final_colors: "None",
      colors_used: [
        "(35, 115, 51)",
        "(215, 218, 120)",
        "(141, 172, 78)",
        "(107, 178, 214)",
        "(170, 196, 63)",
      ],
      name: "Australia",
      id: 14,
      url:
        "https://upload.wikimedia.org/wikipedia/en/3/3f/Cricket_Australia.png",
    },
    {
      final_colors: "None",
      colors_used: [
        "(218, 178, 108)",
        "(37, 60, 147)",
        "(195, 227, 251)",
        "(116, 108, 132)",
        "(100, 132, 188)",
      ],
      name: "India",
      id: 130,
      url:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/800px-Cricket_India_Crest.svg.png",
    },
  ],
};
