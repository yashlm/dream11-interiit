import { useState } from "react";
import MatchCard from "../movieslist/MatchCard.jsx";
import "./cardStack.css";
import HorizontalCalendar from "./horizontalCalendar.jsx";

const SelectMatchCard = () => {
  const [matchDate, setMatchDate] = useState(new Date());

  const matches = [
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },

    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },

    {
      stadium: "Wankhede Stadium",
      date: "2024-12-01",
      team1Name: "India",
      team1Logo: "https://flagcdn.com/in.svg",
      team2Name: "Pakistan",
      team2Logo: "https://flagcdn.com/pk.svg",
      matchType: "ODI 50",
    },
  ];

  return (
    <div className="calender-match-card-wrapper">
      <div className="calender">
        <h3>Select Match</h3>
        <HorizontalCalendar
          initialDate={matchDate}
          setMatchDate={setMatchDate}
        />
      </div>
      <div className="match-card-list">
        {matches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}
      </div>
    </div>
  );
};

export default SelectMatchCard;
