import { motion, AnimatePresence } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import RadarChart from "../charts/radarChart";
import PlayerStatsAccordion from "./accordian";

import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import styles from "./playerStats.module.css";

export default function PlayerPopOut({
  isVisible,
  onClose,
  name,
  bgImage,
  profileImage,
  teamIconUrl,
  team,
  firstName,
  lastName,
}) {
  const data = {
    player_id: 1,
    match_id: 101,
    name: "Virat Sharma",
    player_type: "Batter",
    predicted_dream_points: 75,
    description:
      "An aggressive top-order batter known for his consistency and ability to chase big targets.",
    odi_bat: {
      SR: 92.5,
      "4s": 240,
      "6s": 50,
      centuries: 15,
      "50s": 30,
      total_runs: 5400,
      experience: 120,
      avg_of_last_10_matches_runs: 65,
      avg_of_last_10_matches_SR: 95.0,
      chart: {
        consistency: 85,
        form: 90,
        adaptability: 88,
        influence: 92,
        game_reading: 87,
        conversion_rate: 75,
      },
    },
    odi_ball: {
      economy: 4.5,
      wickets: 140,
      five_wicket_hauls: 8,
      best_figures: "6/23",
      experience: 100,
      avg_of_last_10_matches_wickets: 2,
      avg_of_last_10_matcheseconomy: 4.3,
      chart: {
        consistency: 85,
        form: 90,
        adaptability: 88,
        influence: 92,
        game_reading: 87,
        conversion_rate: 75,
      },
    },
    test_bat: {
      SR: 56.0,
      "4s": 400,
      "6s": 20,
      centuries: 18,
      "50s": 25,
      total_runs: 7200,
      experience: 80,
      avg_of_last_10_matches_wickets: 2,
      avg_of_last_10_matcheseconomy: 4.3,
      chart: {
        consistency: 85,
        form: 90,
        adaptability: 88,
        influence: 92,
        game_reading: 87,
        conversion_rate: 75,
      },
    },
    test_ball: {
      economy: 2.8,
      wickets: 200,
      five_wicket_hauls: 15,
      best_figures: "7/50",
      experience: 60,
      avg_of_last_10_matches_wickets: 2,
      avg_of_last_10_matcheseconomy: 4.3,
      chart: {
        consistency: 85,
        form: 90,
        adaptability: 88,
        influence: 92,
        game_reading: 87,
        conversion_rate: 75,
      },
    },
    t20_bat: {
      SR: 145.0,
      "4s": 150,
      "6s": 85,
      centuries: 2,
      "50s": 12,
      total_runs: 2200,
      experience: 60,
      avg_of_last_10_matches_runs: 65,
      avg_of_last_10_matches_SR: 95.0,
      chart: {
        consistency: 85,
        form: 90,
        adaptability: 88,
        influence: 92,
        game_reading: 87,
        conversion_rate: 75,
      },
    },
    t20_ball: {
      economy: 6.8,
      wickets: 65,
      five_wicket_hauls: 2,
      best_figures: "5/12",
      experience: 45,
      avg_of_last_10_matches_wickets: 2,
      avg_of_last_10_matcheseconomy: 4.3,
      chart: {
        consistency: 85,
        form: 90,
        adaptability: 88,
        influence: 92,
        game_reading: 87,
        conversion_rate: 75,
      },
    },
  };
  const [category, setCategory] = useState("odi_");
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.playerStatCard}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "90vh",
            backgroundColor: "white",
            boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px 20px 0 0",
            textAlign: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >
          <div className={styles.leftPanelProfile}>
            <div className={styles.imageCardProfile}>
              <CardMedia
                className={styles.bgImageProfile}
                image={bgImage}
                title={name}
              >
                <div className={styles.blackCover}>
                  <CardMedia
                    className={styles.playerImageProfile}
                    image={profileImage}
                  />
                  <Avatar
                    alt={team}
                    src={
                      teamIconUrl ||
                      "https://e1.pngegg.com/pngimages/534/366/png-clipart-cricket-icons-india-board-of-control-for-cricket-in-india-logo-thumbnail.png"
                    }
                    sx={{
                      height: "20vh",
                      width: "20vh",
                      color: "black",
                      position: "absolute",
                      top: "5%",
                      left: "65%",
                    }}
                  />
                </div>
              </CardMedia>
            </div>
            <div className={styles.chartProfile}>
              <RadarChart data={data} />
            </div>
          </div>
          <div className={styles.rightPanelProfile}>
            <h1 className={styles.profileName}>
              {firstName} <br />
              <span className={styles.lastName}>{lastName}</span>
            </h1>
            <button onClick={onClose} className={styles.removeBtn}>
              <RxCross2 />
            </button>
            <PlayerStatsAccordion
              data={data}
              type={"Batting"}
              setType={setCategory}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
