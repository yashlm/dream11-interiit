import { useEffect, useState } from "react";
import MatchCard from "../matchlist/MatchCard.jsx";
import styles from "../css/cardStack.module.css";
import HorizontalCalendar from "./horizontalCalendar.jsx";
import Loading from "./Loading.jsx";
import { BASE_URL } from "../constants.jsx";
import { useNavigate } from "react-router-dom";

const SelectMatchCard = ({ teamA, teamB }) => {
  const [matchDate, setMatchDate] = useState(new Date());
  const [allMatches, setAllMatches] = useState(null);
  const [filteredMatches, setFilteredMatches] = useState(null);

  const navigate = useNavigate();

  const customMatch = () => {
    const formattedDate = matchDate.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    navigate(`/custommatch/${formattedDate}`);
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
        const data = await response.json();
        const dist = data.data.filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.match_id === obj.match_id)
        );
        setAllMatches(dist);
      } catch (error) {
        alert("We encountered an issue. Please try again later.");
        console.error("Error fetching teams:", error);
      }
    };
    dataFeatch();
  }, [teamA.name, teamB.name]);

  useEffect(() => {
    if (allMatches) {
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
    <div className={styles.calenderMatchCardWrapper}>
      <div className={styles.calender}>
        <h3>SELECT MATCH</h3>
        <HorizontalCalendar
          initialDate={matchDate}
          setMatchDate={setMatchDate}
        />
      </div>
      <div className={styles.matchCardListWrapper}>
        {filteredMatches && filteredMatches.length === 0 ? (
          <div className={styles.customMatchDiv}>
            <p>No matches available for the selected date.</p>
            <button className={styles.customMatchBtn} onClick={customMatch}>
              Create Custom Match
            </button>
          </div>
        ) : null}
        <div className={styles.matchCardList}>
          {filteredMatches && filteredMatches.length > 0
            ? filteredMatches.map((match, index) => (
                <MatchCard
                  key={index}
                  match={match}
                  onClick={() => {
                    formDreamTeam(match.match_id);
                  }}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SelectMatchCard;
