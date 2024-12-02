import { useEffect, useState } from "react";
import MatchCard from "../HomePage/MatchCard.jsx";
import styles from "../../css/cardStack.module.css";
import HorizontalCalendar from "./horizontalCalendar.jsx";
import Loading from "../Loading.jsx";
import { BASE_URL } from "../../constants.jsx";
import { useNavigate } from "react-router-dom";
import NewMatchCard from "./newMatchCard.jsx";

const SelectMatchCard = ({ teamA, teamB }) => {
  const [matchDate, setMatchDate] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [allMatches, setAllMatches] = useState(null);
  const [filteredMatches, setFilteredMatches] = useState(null);

  const navigate = useNavigate();

  const customMatch = () => {
    const formattedDate = matchDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    navigate(`/custommatch/${formattedDate}`, {
      state: {
        teamAdata: { name: teamA.name, imageUrl: teamA.imageUrl },
        teamBdata: { name: teamB.name, imageUrl: teamB.imageUrl },
      },
    });
  };

  const formDreamTeam = (match_id) => {
    navigate(`/dreamTeam/${match_id}`);
  };

  // Fetch matches when teamA and teamB change
  useEffect(() => {
    const dataFeatch = async () => {
      try {
        const payload = {
          team_name2: teamA.name,
          team_name1: teamB.name,
        };
        const response = await fetch(`${BASE_URL}/match/team/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`
          );
        }
        const data = await response.json();
        // const data = {
        //   status: "ok",
        //   message: "Teams retrieved successfully",
        //   data: [
        //     {
        //       match_id: "1432439",
        //       innings: 1,
        //       batting_team: "Australia",
        //       city: "Sharjah",
        //       dates: ["2024-10-13"],
        //       event_name: "ICC Women's T20 World Cup",
        //       match_number: "18",
        //       gender: "female",
        //       match_type: "T20",
        //       match_referees: "SA Fritz",
        //       tv_umpires: "JM Williams",
        //       umpires: ["Kim Cotton", "S Redfern"],
        //       team_type: "international",
        //       teams: ["Australia", "India"],
        //       venue: "Sharjah Cricket Stadium",
        //       players:
        //         '{"GM Harris","BL Mooney","G Wareham","TM McGrath","EA Perry","A Gardner","P Litchfield","A Sutherland","S Molineux","ML Schutt","D Brown"}',
        //       season: "2024/25",
        //     },
        //     {
        //       match_id: "1432439",
        //       innings: 2,
        //       batting_team: "India",
        //       city: "Sharjah",
        //       dates: ["2024-10-13"],
        //       event_name: "ICC Women's T20 World Cup",
        //       match_number: "18",
        //       gender: "female",
        //       match_type: "T20",
        //       match_referees: "SA Fritz",
        //       tv_umpires: "JM Williams",
        //       umpires: ["Kim Cotton", "S Redfern"],
        //       team_type: "international",
        //       teams: ["Australia", "India"],
        //       venue: "Sharjah Cricket Stadium",
        //       players:
        //         '{"Shafali Verma","S Mandhana","JI Rodrigues","H Kaur","DB Sharma","RM Ghosh","P Vastrakar","A Reddy","SR Patil","RP Yadav","Renuka Singh"}',
        //       season: "2024/25",
        //     },
        //     {
        //       match_id: "14325",
        //       innings: 2,
        //       batting_team: "India",
        //       city: "Sharjah",
        //       dates: ["2024-10-13"],
        //       event_name: "ICC Women's T20 World Cup",
        //       match_number: "18",
        //       gender: "female",
        //       match_type: "T20",
        //       match_referees: "SA Fritz",
        //       tv_umpires: "JM Williams",
        //       umpires: ["Kim Cotton", "S Redfern"],
        //       team_type: "international",
        //       teams: ["Australia", "India"],
        //       venue: "Sharjah Cricket Stadium",
        //       players:
        //         '{"Shafali Verma","S Mandhana","JI Rodrigues","H Kaur","DB Sharma","RM Ghosh","P Vastrakar","A Reddy","SR Patil","RP Yadav","Renuka Singh"}',
        //       season: "2024/25",
        //     },
        //     {
        //       match_id: "325",
        //       innings: 2,
        //       batting_team: "India",
        //       city: "Sharjah",
        //       dates: ["2024-10-13"],
        //       event_name: "ICC Women's T20 World Cup",
        //       match_number: "18",
        //       gender: "female",
        //       match_type: "T20",
        //       match_referees: "SA Fritz",
        //       tv_umpires: "JM Williams",
        //       umpires: ["Kim Cotton", "S Redfern"],
        //       team_type: "international",
        //       teams: ["Australia", "India"],
        //       venue: "Sharjah Cricket Stadium",
        //       players:
        //         '{"Shafali Verma","S Mandhana","JI Rodrigues","H Kaur","DB Sharma","RM Ghosh","P Vastrakar","A Reddy","SR Patil","RP Yadav","Renuka Singh"}',
        //       season: "2024/25",
        //     },
        //   ],
        //   team_info: [
        //     {
        //       final_colors: "None",
        //       colors_used: [
        //         "(35, 115, 51)",
        //         "(215, 218, 120)",
        //         "(141, 172, 78)",
        //         "(107, 178, 214)",
        //         "(170, 196, 63)",
        //       ],
        //       name: "Australia",
        //       id: 14,
        //       url:
        //         "https://upload.wikimedia.org/wikipedia/en/3/3f/Cricket_Australia.png",
        //     },
        //     {
        //       final_colors: "None",
        //       colors_used: [
        //         "(218, 178, 108)",
        //         "(37, 60, 147)",
        //         "(195, 227, 251)",
        //         "(116, 108, 132)",
        //         "(100, 132, 188)",
        //       ],
        //       name: "India",
        //       id: 130,
        //       url:
        //         "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/800px-Cricket_India_Crest.svg.png",
        //     },
        //   ],
        // };
        const dist = data.data.filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.match_id === obj.match_id)
        );
        setAllMatches(dist);
        setTeamInfo(data.team_info);
      } catch (error) {
        alert("We encountered an issue. Please try again later.");
        console.error("Error fetching teams:", error);
      }
    };
    dataFeatch();
  }, [teamA.name, teamB.name]);

  useEffect(() => {
    if (allMatches && matchDate) {
      const filtered = allMatches.filter((match) => {
        // Loop through each date in the 'dates' array and check if any matches the selected date
        const matchHasSelectedDate = match.dates.some((date) => {
          const matchDateString = new Date(date).toLocaleDateString();
          const selectedDateString = matchDate.toLocaleDateString();
          return matchDateString === selectedDateString;
        });
        return matchHasSelectedDate;
      });
      setFilteredMatches(filtered);
    }
  }, [matchDate, allMatches]);

  return allMatches === null ? (
    <Loading />
  ) : (
    <div
      className={styles.calenderMatchCardWrapper}
      style={{ height: "300px" }}
    >
      <div className={styles.calender}>
        <h3>SELECT MATCH</h3>
        <HorizontalCalendar
          initialDate={new Date()}
          setMatchDate={setMatchDate}
        />
        <div className={styles.scrollAllMatches}>
          {/* If a date is selected, show matches for that date */}
          {matchDate && filteredMatches && filteredMatches.length > 0 ? (
            <div className={styles.scrollAllMatches}>
              <h4>Matches on Selected Date</h4>
              {filteredMatches.map((match) => (
                <NewMatchCard
                  key={match.match_id}
                  match={match}
                  formDreamTeam={formDreamTeam}
                  team_info={teamInfo}
                />
              ))}
            </div>
          ) : matchDate ? (
            // Show a custom message if no matches are found for the selected date
            <div className={styles.customMatchDiv}>
              <p>No matches available for the selected date.</p>
              <button className={styles.customMatchBtn} onClick={customMatch}>
                Create Custom Match
              </button>
            </div>
          ) : null}

          {matchDate ? <h4>Other Matches</h4> : <h4>ALl Matches</h4>}
          {allMatches.map((match) => (
            <NewMatchCard
              key={match.match_id}
              match={match}
              formDreamTeam={formDreamTeam}
              team_info={teamInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectMatchCard;
