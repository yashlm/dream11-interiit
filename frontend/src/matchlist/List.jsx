// export default List;
import React, { useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import MatchCard from "./MatchCard.jsx";
import "react-horizontal-scrolling-menu/dist/styles.css";
import cricketicon from "../assets/cricket.png";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Arrow = ({ text, className }) => <div className={className}>{text}</div>;

const dummyMatches = [
  {
    match_id: "1385697",
    innings: 1,
    batting_team: "Australia",
    city: "Southampton",
    dates: ["2024-09-11"],
    event_name: "Australia tour of England",
    match_number: "1",
    gender: "male",
    match_type: "T20",
    match_referees: "AJ Pycroft",
    tv_umpires: "MJ Saggers",
    umpires: '{"AG Wharf","RJ Warren"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: '{"The Rose Bowl",Southampton}',
    players:
      '{"MW Short","TM Head","MR Marsh","JP Inglis","MP Stoinis","TH David","C Green","SA Abbott","XC Bartlett","A Zampa","JR Hazlewood"}',
    season: "2024",
  },
  {
    match_id: "1385697",
    innings: 2,
    batting_team: "England",
    city: "Southampton",
    dates: ["2024-09-11"],
    event_name: "Australia tour of England",
    match_number: "1",
    gender: "male",
    match_type: "T20",
    match_referees: "AJ Pycroft",
    tv_umpires: "MJ Saggers",
    umpires: '{"AG Wharf","RJ Warren"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: '{"The Rose Bowl",Southampton}',
    players:
      '{"PD Salt","WG Jacks","JM Cox","LS Livingstone","JG Bethell","SM Curran","J Overton","JC Archer","AU Rashid","S Mahmood","RJW Topley"}',
    season: "2024",
  },
  {
    match_id: "1385698",
    innings: 1,
    batting_team: "Australia",
    city: "Cardiff",
    dates: ["2024-09-13"],
    event_name: "Australia tour of England",
    match_number: "2",
    gender: "male",
    match_type: "T20",
    match_referees: "AJ Pycroft",
    tv_umpires: "RJ Warren",
    umpires: '{"AG Wharf","M Burns"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: '{"Sophia Gardens",Cardiff}',
    players:
      '{"MW Short","TM Head","J Fraser-McGurk","JP Inglis","MP Stoinis","TH David","C Green","AM Hardie","C Connolly","SA Abbott","A Zampa"}',
    season: "2024",
  },
  {
    match_id: "1385698",
    innings: 2,
    batting_team: "England",
    city: "Cardiff",
    dates: ["2024-09-13"],
    event_name: "Australia tour of England",
    match_number: "2",
    gender: "male",
    match_type: "T20",
    match_referees: "AJ Pycroft",
    tv_umpires: "RJ Warren",
    umpires: '{"AG Wharf","M Burns"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: '{"Sophia Gardens",Cardiff}',
    players:
      '{"PD Salt","WG Jacks","JM Cox","LS Livingstone","JG Bethell","SM Curran","J Overton","BA Carse","AU Rashid","S Mahmood","RJW Topley"}',
    season: "2024",
  },
  {
    match_id: "1385700",
    innings: 1,
    batting_team: "England",
    city: "Nottingham",
    dates: ["2024-09-19"],
    event_name: "Australia tour of England",
    match_number: "1",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "JS Wilson",
    umpires: '{"AG Wharf","HDPK Dharmasena"}',
    team_type: "international",
    teams: ["England", "Australia"],
    venue: '{"Trent Bridge",Nottingham}',
    players:
      '{"PD Salt","BM Duckett","WG Jacks","HC Brook","JL Smith","LS Livingstone","JG Bethell","BA Carse","JC Archer","MJ Potts","AU Rashid"}',
    season: "2024",
  },
  {
    match_id: "1385700",
    innings: 2,
    batting_team: "Australia",
    city: "Nottingham",
    dates: ["2024-09-19"],
    event_name: "Australia tour of England",
    match_number: "1",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "JS Wilson",
    umpires: '{"AG Wharf","HDPK Dharmasena"}',
    team_type: "international",
    teams: ["England", "Australia"],
    venue: '{"Trent Bridge",Nottingham}',
    players:
      '{"MR Marsh","TM Head","SPD Smith","C Green","M Labuschagne","AT Carey","MW Short","AM Hardie","SA Abbott","BJ Dwarshuis","A Zampa"}',
    season: "2024",
  },
  {
    match_id: "1385701",
    innings: 1,
    batting_team: "Australia",
    city: "Leeds",
    dates: ["2024-09-21"],
    event_name: "Australia tour of England",
    match_number: "2",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "HDPK Dharmasena",
    umpires: '{"JS Wilson","RJ Warren"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: "{Headingley,Leeds}",
    players:
      '{"MW Short","TM Head","MR Marsh","SPD Smith","M Labuschagne","AT Carey","GJ Maxwell","AM Hardie","MA Starc","A Zampa","JR Hazlewood"}',
    season: "2024",
  },
  {
    match_id: "1385701",
    innings: 2,
    batting_team: "England",
    city: "Leeds",
    dates: ["2024-09-21"],
    event_name: "Australia tour of England",
    match_number: "2",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "HDPK Dharmasena",
    umpires: '{"JS Wilson","RJ Warren"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: "{Headingley,Leeds}",
    players:
      '{"PD Salt","BM Duckett","WG Jacks","HC Brook","JL Smith","LS Livingstone","JG Bethell","BA Carse","AU Rashid","MJ Potts","OP Stone"}',
    season: "2024",
  },
  {
    match_id: "1385702",
    innings: 1,
    batting_team: "Australia",
    city: "{Chester-le-Street}",
    dates: ["2024-09-24"],
    event_name: "Australia tour of England",
    match_number: "3",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "JS Wilson",
    umpires: '{"AG Wharf","HDPK Dharmasena"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: '{"Riverside Ground",Chester-le-Street}',
    players:
      '{"MW Short","MR Marsh","SPD Smith","C Green","M Labuschagne","AT Carey","GJ Maxwell","AM Hardie","SA Abbott","MA Starc","JR Hazlewood"}',
    season: "2024",
  },
  {
    match_id: "1385702",
    innings: 2,
    batting_team: "England",
    city: "{Chester-le-Street}",
    dates: ["2024-09-24"],
    event_name: "Australia tour of England",
    match_number: "3",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "JS Wilson",
    umpires: '{"AG Wharf","HDPK Dharmasena"}',
    team_type: "international",
    teams: ["Australia", "England"],
    venue: '{"Riverside Ground",Chester-le-Street}',
    players:
      '{"PD Salt","BM Duckett","WG Jacks","HC Brook","JL Smith","LS Livingstone","JG Bethell","BA Carse","AU Rashid","MJ Potts","JC Archer"}',
    season: "2024",
  },
  {
    match_id: "1385703",
    innings: 1,
    batting_team: "England",
    city: "London",
    dates: ["2024-09-27"],
    event_name: "Australia tour of England",
    match_number: "4",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "HDPK Dharmasena",
    umpires: '{"JS Wilson","MJ Saggers"}',
    team_type: "international",
    teams: ["England", "Australia"],
    venue: "{Lord's,London}",
    players:
      '{"PD Salt","BM Duckett","WG Jacks","HC Brook","JL Smith","LS Livingstone","JG Bethell","BA Carse","AU Rashid","MJ Potts","JC Archer"}',
    season: "2024",
  },
  {
    match_id: "1385703",
    innings: 2,
    batting_team: "Australia",
    city: "London",
    dates: ["2024-09-27"],
    event_name: "Australia tour of England",
    match_number: "4",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "HDPK Dharmasena",
    umpires: '{"JS Wilson","MJ Saggers"}',
    team_type: "international",
    teams: ["England", "Australia"],
    venue: "{Lord's,London}",
    players:
      '{"MR Marsh","TM Head","SPD Smith","JP Inglis","M Labuschagne","AT Carey","GJ Maxwell","SA Abbott","MA Starc","A Zampa","JR Hazlewood"}',
    season: "2024",
  },
  {
    match_id: "1385704",
    innings: 1,
    batting_team: "England",
    city: "Bristol",
    dates: ["2024-09-29"],
    event_name: "Australia tour of England",
    match_number: "5",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "JS Wilson",
    umpires: '{"HDPK Dharmasena","M Burns"}',
    team_type: "international",
    teams: ["England", "Australia"],
    venue: '{"County Ground",Bristol}',
    players:
      '{"PD Salt","BM Duckett","WG Jacks","HC Brook","JL Smith","LS Livingstone","JG Bethell","BA Carse","AU Rashid","MJ Potts","OP Stone"}',
    season: "2024",
  },
  {
    match_id: "1385704",
    innings: 2,
    batting_team: "Australia",
    city: "Bristol",
    dates: ["2024-09-29"],
    event_name: "Australia tour of England",
    match_number: "5",
    gender: "male",
    match_type: "ODI",
    match_referees: "AJ Pycroft",
    tv_umpires: "JS Wilson",
    umpires: '{"HDPK Dharmasena","M Burns"}',
    team_type: "international",
    teams: ["England", "Australia"],
    venue: '{"County Ground",Bristol}',
    players:
      '{"MW Short","TM Head","SPD Smith","JP Inglis","M Labuschagne","GJ Maxwell","AM Hardie","C Connolly","MA Starc","A Zampa","JR Hazlewood"}',
    season: "2024",
  },
];

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = React.useContext(
    VisibilityContext
  );

  return (
    <button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      className="left-arrow"
      style={{
        background: "none",
        border: "none",
        outline: "none",
        cursor: isFirstItemVisible ? "not-allowed" : "pointer",
        opacity: isFirstItemVisible ? 0.5 : 1,
      }}
    >
      <FaChevronLeft size={24} color={isFirstItemVisible ? "gray" : "black"} />
    </button>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      className="right-arrow"
      style={{
        background: "none",
        border: "none",
        outline: "none",
        cursor: isLastItemVisible ? "not-allowed" : "pointer",
        opacity: isLastItemVisible ? 0.5 : 1,
      }}
    >
      <FaChevronRight size={24} color={isLastItemVisible ? "gray" : "black"} />
    </button>
  );
};

const List = ({ heading }) => {
  const [matches] = useState(dummyMatches);

  const redirectMatchDetails = (match_id) => {
    console.log(`redirect to match details of match id ${match_id}`);
  };

  return (
    <div className="lists" style={{ width: "70vw" }}>
      <img
        src={cricketicon}
        alt="cricket Icon"
        style={{
          marginLeft: "20px",
          marginBottom: "-50px",
          width: "40px",
          height: "40px",
        }}
      />
      <h2 style={{ marginLeft: "70px" }}>{heading}</h2>
      <br />
      <div className="scrollcontainer">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {matches.map((match) => (
            <div key={match.id} className="menu-item">
              <MatchCard
                match={match}
                onClick={() => {
                  redirectMatchDetails(match.id);
                }}
              />
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default List;
