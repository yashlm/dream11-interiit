import { motion, AnimatePresence } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import PlayerStatsAccordion from "./accordian";
import { RxCross2 } from "react-icons/rx";

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
  const batData = {
    bat: {
      test: {
        totalRuns: 3500,
        totalMatches: 50,
        highestScore: 180,
        careerStrikeRate: 75.5,
        careerAvg: 45.6,
        last10Avg: 42.3,
        last10StrikeRate: 72.0,
        fifty: 8,
        hundred: 5,
        fours: 240,
        sixes: 45,
        stumpings: 1,
        catches: 42,
        adaptability: 8,
        battingConsistency: 7,
        battingForm: 8,
        fieldingPerformance: 7.5,
        match: 5,
      },
      odi: {
        totalRuns: 1200,
        totalMatches: 40,
        highestScore: 130,
        careerStrikeRate: 85.5,
        careerAvg: 38.7,
        last10Avg: 36.8,
        last10StrikeRate: 83.4,
        fifty: 10,
        hundred: 2,
        fours: 150,
        sixes: 20,
        stumpings: 0,
        catches: 30,
        adaptability: 7,
        battingConsistency: 6.8,
        battingForm: 7,
        fieldingPerformance: 7.2,
        match: 5,
      },
      mdm: {
        totalRuns: 550,
        totalMatches: 30,
        highestScore: 95,
        careerStrikeRate: 72.3,
        careerAvg: 32.4,
        last10Avg: 30.0,
        last10StrikeRate: 70.5,
        fifty: 4,
        hundred: 1,
        fours: 85,
        sixes: 15,
        stumpings: 1,
        catches: 25,
        adaptability: 6,
        battingConsistency: 6.2,
        battingForm: 6.5,
        fieldingPerformance: 6.0,
        match: 5,
      },
      it20: {
        totalRuns: 750,
        totalMatches: 18,
        highestScore: 120,
        careerStrikeRate: 140.1,
        careerAvg: 48.9,
        last10Avg: 45.0,
        last10StrikeRate: 145.3,
        fifty: 5,
        hundred: 1,
        fours: 90,
        sixes: 25,
        stumpings: 0,
        catches: 10,
        adaptability: 8.5,
        battingConsistency: 7.9,
        battingForm: 8,
        fieldingPerformance: 7.0,
        match: 5,
      },
      t20: {
        totalRuns: 950,
        totalMatches: 25,
        highestScore: 160,
        careerStrikeRate: 138.7,
        careerAvg: 41.5,
        last10Avg: 40.8,
        last10StrikeRate: 142.6,
        fifty: 7,
        hundred: 3,
        fours: 110,
        sixes: 35,
        stumpings: 2,
        catches: 15,
        adaptability: 7.8,
        battingConsistency: 8.5,
        battingForm: 8.0,
        fieldingPerformance: 7.3,
        match: 5,
      },
      odm: {
        totalRuns: 1150,
        totalMatches: 22,
        highestScore: 145,
        careerStrikeRate: 130.0,
        careerAvg: 40.1,
        last10Avg: 39.2,
        last10StrikeRate: 132.1,
        fifty: 9,
        hundred: 3,
        fours: 130,
        sixes: 28,
        stumpings: 0,
        catches: 22,
        adaptability: 7.4,
        battingConsistency: 7.0,
        battingForm: 7.5,
        fieldingPerformance: 7.8,
        match: 5,
      },
    },
    ball: {
      test: {
        totalMatches: 75,
        totalWickets: 300,
        careerEconomyRate: 3.25,
        careerAvg: 25.4,
        careerSR: 55.0,
        last10Avg: 30.1,
        last10SR: 57.0,
        last10EconomyRate: 3.5,
        fourWicketHauls: "8 / 7/45",
        fiveWicketHauls: 4,
        catches: 15,
        maidenOvers: 18,
        adaptability: 80,
        bowlingConsistency: 75,
        bowlingForm: 70,
        fieldingPerformance: 60,
        match: 90,
      },
      odi: {
        totalMatches: 150,
        totalWickets: 400,
        careerEconomyRate: 4.85,
        careerAvg: 28.9,
        careerSR: 50.4,
        last10Avg: 31.2,
        last10SR: 52.5,
        last10EconomyRate: 4.7,
        fourWicketHauls: "10 / 6/50",
        fiveWicketHauls: 6,
        catches: 35,
        maidenOvers: 25,
        adaptability: 85,
        bowlingConsistency: 80,
        bowlingForm: 75,
        fieldingPerformance: 65,
        match: 92,
      },
      mdm: {
        totalMatches: 200,
        totalWickets: 500,
        careerEconomyRate: 4.25,
        careerAvg: 26.1,
        careerSR: 48.0,
        last10Avg: 27.5,
        last10SR: 49.0,
        last10EconomyRate: 4.3,
        fourWicketHauls: "12 / 5/40",
        fiveWicketHauls: 10,
        catches: 50,
        maidenOvers: 40,
        adaptability: 78,
        bowlingConsistency: 83,
        bowlingForm: 72,
        fieldingPerformance: 70,
        match: 95,
      },
    },
  };
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
            height: "80%",
            backgroundColor: "white",
            boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px 20px 0 0",
            textAlign: "center",
            padding: "20px",
            zIndex: 1000,
            overflow: "scroll",
          }}
        >
          <button onClick={onClose} className={styles.removeBtn}>
            <RxCross2 />
          </button>
          <div className={styles.topPanel}>
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
                    height: "5vh",
                    width: "5vh",
                    color: "black",
                    position: "absolute",
                    top: "5%",
                    right: "5%",
                  }}
                />
              </div>
            </CardMedia>
            <p className={styles.profileName}>
              {firstName} <br />
              <span className={styles.lastName}>{lastName}</span>
            </p>
          </div>
          <div className={styles.bottomPanel}>
            <PlayerStatsAccordion playerType={"batting"} data={batData} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
