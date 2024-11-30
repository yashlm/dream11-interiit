//code for api endpoint 
// import React, { useEffect, useState } from "react";
// import Playerlist from "../component/Playerlist";
// import { BASE_URL } from "../constants.jsx";
//import styles from '../css/MatchDetails.module.css';

// const MatchDetails = () => {
//   const [teamAPlayers, setTeamAPlayers] = useState([]);
//   const [teamBPlayers, setTeamBPlayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch match details from the API
//   const fetchMatchDetails = async (teamA, teamB, matchDate) => {
//     try {
//       const response = await fetch(`${BASE_URL}/matchdetails`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           teamA,
//           teamB,
//           matchDate,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Assuming the match data comes as an array in the 'match' property
//         const match = data.match[0]; // Assuming the match array has at least one item
//         setTeamAPlayers(match.teamA_players);
//         setTeamBPlayers(match.teamB_players);
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       setError("Failed to fetch match details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UseEffect to fetch match details on component mount
//   useEffect(() => {
//     const teamA = "Team A"; // Replace with actual team name
//     const teamB = "Team B"; // Replace with actual team name
//     const matchDate = "2024-11-29"; // Replace with actual match date
    

//     fetchMatchDetails(teamA, teamB, matchDate);
//   }, []);

//   if (loading) {
//     return <div>Loading match details...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//     
//     </div>
//   );
// };

// export default MatchDetails;

import React, { useEffect, useState } from "react";
import Playerlist from "../component/Playerlist";
import Navbar from "../component/Navbar";
import MatchDetailsCard from "../component/MatchDetailsCard";
import styles from '../css/MatchDetails.module.css';
import batsman_img from '../assets/matchdetails.png'; 

const MatchDetails = () => {
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [carddata, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use dummy data to mimic API response
    const dummyData = {
      match: [
        {
          match_id: "12345",
          venue: '{"Trent Bridge",Nottingham}',
          teamAicon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdh_ZyGzoBpNnaoBmGf9kCkveAH52Cf-KH4g&s",
          teamBicon: "https://cdn-icons-png.flaticon.com/512/9906/9906443.png",
          match_type: "ODI",
          series_name: "Series ABC",
          teamA_players: [
            {
              type: "Batsman",
              name: "Player A1",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A1",
            },
            {
              type: "Bowler",
              name: "Player A2",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A2",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
          ],
          teamB_players: [
            {
              type: "Batsman",
              name: "Player B1",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "B1",
            },
            {
              type: "Bowler",
              name: "Player B2",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "B2",
            },
            {
              type: "All-Rounder",
              name: "Player B3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "B3",
            },
            {
              type: "Batsman",
              name: "Player A1",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A1",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "All-Rounder",
              name: "Player A3",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A3",
            },
            {
              type: "Batsman",
              name: "Player A1",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A1",
            },
            {
              type: "Batsman",
              name: "Player A1",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A1",
            },
            {
              type: "Batsman",
              name: "Player A1",
              prurl: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
              playerId: "A1",
            },
          ],
          match_description:
            "This is a thrilling ODI match between Team A and Team B.",
        },
      ],
    };
    const carddata={
      venue: dummyData.match[0].venue,
      teamAicon: dummyData.match[0].teamAicon,
      teamBicon: dummyData.match[0].teamBicon,
      match_type: dummyData.match[0].match_type,
      teams:[
        "India", "Australia"
      ],
      dates: ["2024-09-21"],
};

    
    const match = dummyData.match[0];
    setTeamAPlayers(match.teamA_players);
    setTeamBPlayers(match.teamB_players);
    setCardData(carddata);
    setLoading(false);
  }, []);


  if (loading) {
    return <div>Loading match details...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className={styles.matchDetailsContainer}>
        <div className={styles.teamCard}>
          {/* Team A Header Card */}
          <div className={styles.teamHeader}>
            <div className={styles.team}>
              <img
                src={carddata.teamAicon}
                alt="Team A Logo"
                className={styles.teamLogo}
              />
              <span className={styles.teamName}>{carddata.teams[0]}</span>
            </div>
          </div>
          <Playerlist playerdata={teamAPlayers} />
        </div>
        <div className={styles.matchDetailsCardwithimg}>
          <MatchDetailsCard
            match={carddata}
            className={styles.matchDetailsCard}
          />
          <img src={batsman_img} alt="Batsman" className={styles.batsmanImg} />
        </div>
        <div className={styles.teamCard}>
          {/* Team B Header Card */}
          <div className={styles.teamHeader}>
            <div className={styles.team}>
              <img
                src={carddata.teamBicon}
                alt="Team B Logo"
                className={styles.teamLogo}
              />
              <span className={styles.teamName}>{carddata.teams[1]}</span>
            </div>
          </div>
          <Playerlist playerdata={teamBPlayers} />
        </div>
      </div>
    </div>

  );
};

export default MatchDetails;