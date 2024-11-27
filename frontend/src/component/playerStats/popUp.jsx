import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import CardMedia from "@mui/material/CardMedia";
import "../playerCard.css";
import Avatar from "@mui/material/Avatar";

export default function PlayerStasPopUp(
  matchId,
  playerId,
  profileImage,
  bgImage,
  name,
  closeFunction,
  team,
  teamIconUrl
) {
  const firstName = name
    .toUpperCase()
    .split(" ")
    .slice(0, -1)
    .join(" ");
  const lastName = name
    .toUpperCase()
    .split(" ")
    .slice(-1)
    .join(" ");
  const data = {
    player_id: 1,
    match_id: 101,
    name: "Virat Sharma",
    player_type: "Batter",
    predicted_dream_points: 75,
    description:
      "An aggressive top-order batter known for his consistency and ability to chase big targets.",
    odi: {
      SR: 92.5,
      "4s": 240,
      "6s": 50,
      centuries: 15,
      "50s": 30,
      total_runs: 5400,
      experience: 120,
      avg_of_last_10_matches: {
        runs: 65,
        SR: 95.0,
      },
      economy: 4.5,
      wickets: 140,
      five_wicket_hauls: 8,
      best_figures: "6/23",
      experience: 100,
      avg_of_last_10_matches: {
        wickets: 2,
        economy: 4.3,
      },
    },
    test: {
      SR: 56.0,
      "4s": 400,
      "6s": 20,
      centuries: 18,
      "50s": 25,
      total_runs: 7200,
      experience: 80,
      avg_of_last_10_matches: {
        runs: 70,
        SR: 60.0,
      },
      economy: 2.8,
      wickets: 200,
      five_wicket_hauls: 15,
      best_figures: "7/50",
      experience: 60,
      avg_of_last_10_matches: {
        wickets: 4,
        economy: 3.0,
      },
    },
    t20: {
      SR: 145.0,
      "4s": 150,
      "6s": 85,
      centuries: 2,
      "50s": 12,
      total_runs: 2200,
      experience: 60,
      avg_of_last_10_matches: {
        runs: 35,
        SR: 150.0,
      },
      economy: 6.8,
      wickets: 65,
      five_wicket_hauls: 2,
      best_figures: "5/12",
      experience: 45,
      avg_of_last_10_matches: {
        wickets: 1,
        economy: 6.5,
      },
    },
    chart: {
      consistency: 85,
      form: 90,
      adaptability: 88,
      influence: 92,
      game_reading: 87,
      conversion_rate: 75,
    },
  };

  return (
    <h1>hi</h1>
    // <motion.div
    //   className="player-stat-card"
    //   initial={{ y: "100%", opacity: 0 }} // Start off-screen at the bottom
    //   animate={{ y: "0%", opacity: 1 }} // Slide up to cover 90% of the page
    //   exit={{ y: "100%", opacity: 0 }} // Slide back down
    //   transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
    //   style={{
    //     position: "fixed",
    //     bottom: 0,
    //     left: 0,
    //     width: "100%", // Full width to cover the screen
    //     height: "90vh", // Covers 90% of the viewport height
    //     backgroundColor: "white",
    //     boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
    //     borderRadius: "20px 20px 0 0", // Rounded corners at the top
    //     textAlign: "center",
    //     padding: "20px",
    //     zIndex: 1000, // Ensure it appears above other content
    //   }}
    // >
    //   <div className="left-panel-profile">
    //     <div className="image-card-profile">
    //       <CardMedia className="bg-image-profile" image={bgImage} title={name}>
    //         <div className="black-cover">
    //           <CardMedia
    //             className="player-image-profile"
    //             image={profileImage}
    //           />
    //           <Avatar
    //             alt={team}
    //             src={
    //               teamIconUrl ||
    //               "https://e1.pngegg.com/pngimages/534/366/png-clipart-cricket-icons-india-board-of-control-for-cricket-in-india-logo-thumbnail.png"
    //             }
    //             sx={{
    //               height: "20vh",
    //               width: "20vh",
    //               color: "black",
    //               position: "relative",
    //               top: "5%",
    //               left: "25%",
    //             }}
    //           ></Avatar>
    //         </div>
    //       </CardMedia>
    //     </div>
    //     <div className="chart-profile"></div>
    //   </div>
    //   <div className="right-panel-profile">
    //     <h1 className="profile-name">
    //       {firstName} <br />
    //       <span className="last-name">{lastName}</span>
    //     </h1>
    //     <button onClick={closeFunction} className="remove-btn">
    //       <RxCross2 />
    //     </button>
    //   </div>
    // </motion.div>
  );
}
