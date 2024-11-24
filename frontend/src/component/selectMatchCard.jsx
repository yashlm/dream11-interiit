import { useState } from "react";
import Calendar from "./calender";
import MatchCard from "./matchCard";

const SelectMatchCard = () => {
  const [matchDate, setMatchDate] = useState(null);

  const matches = [
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1: { name: "India", imageUrl: "https://path-to-india-flag.jpg" },
      team2: {
        name: "Pakistan",
        imageUrl: "https://path-to-pakistan-flag.jpg",
      },
    },
    {
      stadium: "Melbourne Cricket Ground",
      date: "2024-12-02",
      team1: {
        name: "Australia",
        imageUrl: "https://path-to-australia-flag.jpg",
      },
      team2: { name: "New Zealand", imageUrl: "https://path-to-nz-flag.jpg" },
    },
  ];

  const MatchList = () => {
    return (
      <div className="match-card-list">
        {matches.map((match, index) => (
          <MatchCard
            key={index}
            stadium={match.stadium}
            date={match.date}
            team1={match.team1}
            team2={match.team2}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <h2>Select Match</h2>
      <Calendar setDate={setMatchDate} />
      <MatchList />
    </div>
  );
};

export default SelectMatchCard;
