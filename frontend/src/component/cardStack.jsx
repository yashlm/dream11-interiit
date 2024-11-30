import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../css/cardStack.module.css";
import TeamSearchCard from "./selectTeamCard";
import { GiAmericanFootballHelmet } from "react-icons/gi";
import { BiCricketBall } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import Loading from "./Loading";

import ProgressBar from "./progressBar";
import SelectMatchCard from "./selectMatchCard";

import { BASE_URL } from "../constants.jsx";

const CardStack = () => {
  const [firstCardMoved, setFirstCardMoved] = useState(false);
  const [secondCardMoved, setSecondCardMoved] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const [firstTeam, setFirstTeam] = useState(null);
  const [secondTeam, setSecondTeam] = useState(null);

  const [allTeams, setallTeams] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(`${BASE_URL}/team/teams/`, {
          method: "GET",
        });
        const data = await response.json(); // Parse the JSON response
        setallTeams(data.data); // Set the fetched data to state
      } catch (error) {
        alert("We encountered an issue. Please try again later.");
        console.error("Error fetching teams:", error);
        navigate("/home");
      }
    };

    dataFetch();
  }, []);

  const steps = [
    {
      label: "Team 1",
      icon: <GiAmericanFootballHelmet className={styles.progressBarIcons} />,
    },
    {
      label: "Team 2",
      icon: <GiAmericanFootballHelmet className={styles.progressBarIcons} />,
    },
    {
      label: "Match",
      icon: <BiCricketBall className={styles.progressBarIcons} />,
    },
  ];

  useEffect(() => {
    secondCardMoved && firstCardMoved
      ? setCurrentStep(1)
      : secondCardMoved || firstCardMoved
      ? setCurrentStep(0)
      : setCurrentStep(-1);
  }, [firstTeam, secondTeam]);

  return allTeams == null ? (
    <Loading />
  ) : (
  // return (
    <div className={styles.fullscreenBackground}>
      <div className={styles.backgroundCover}></div>
      <motion.div
        className={styles.cardStackContainer}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Progress Bar */}
        <div className={styles.progressBarWrapper}>
          <ProgressBar currentStep={currentStep} steps={steps} />
        </div>
        <div className={styles.cardContainer}>
          <motion.div className={styles.cardStack}>
            {firstCardMoved && secondCardMoved && (
              <SelectMatchCard teamA={firstTeam} teamB={secondTeam} />
            )}
          </motion.div>
          {/* Card 2 */}
          <motion.div
            className={styles.cardStack}
            style={{
              boxShadow: secondCardMoved
                ? "none"
                : "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            animate={{
              x: secondCardMoved
                ? `${Math.max(Math.max(window.innerWidth * 0.35, 200), 500)}px`
                : "0", // Move right by 50% of viewport width
              zIndex: secondCardMoved ? 2 : 1,
              // width: secondCardMoved ? "20%" : "45%", // Adjust width dynamically
              backgroundColor: secondCardMoved ? "transparent" : "white",
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <TeamSearchCard
              setTeam={setSecondTeam}
              moveCard={setSecondCardMoved}
              id="team-2-search-card"
              remove={[firstTeam?.name]}
              allTeams={allTeams}
            />
          </motion.div>

          {/* Card 1 */}
          <motion.div
            className={styles.cardStack}
            style={{
              boxShadow: firstCardMoved
                ? "none"
                : "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
            animate={{
              x: firstCardMoved
                ? `-${Math.max(Math.max(window.innerWidth * 0.35, 200), 500)}px`
                : "0", // Move left by 50% of viewport width
              zIndex: firstCardMoved ? 2 : 1,
              // width: firstCardMoved ? "20%" : "45", // Adjust width dynamically
              backgroundColor: firstCardMoved ? "transparent" : "white",
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <TeamSearchCard
              setTeam={setFirstTeam}
              moveCard={setFirstCardMoved}
              id="team-1-search-card"
              remove={[""]}
              allTeams={allTeams}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardStack;
