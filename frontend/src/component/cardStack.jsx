import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./cardStack.css";
import TeamSearchCard from "./selectTeamCard";
import { GiAmericanFootballHelmet } from "react-icons/gi";
import { BiCricketBall } from "react-icons/bi";

import ProgressBar from "./progressBar";
import SelectMatchCard from "./selectMatchCard";

const CardStack = () => {
  const [firstCardMoved, setFirstCardMoved] = useState(false);
  const [secondCardMoved, setSecondCardMoved] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const [firstTeam, setFirstTeam] = useState(null);
  const [secondTeam, setSecondTeam] = useState(null);
  const [MatchDate, setMatchDate] = useState(null);

  // Define steps with labels and icons
  const steps = [
    {
      label: "Team 1",
      icon: <GiAmericanFootballHelmet className="progress-bar-icons" />,
    },
    {
      label: "Team 2",
      icon: <GiAmericanFootballHelmet className="progress-bar-icons" />,
    },
    { label: "Match", icon: <BiCricketBall className="progress-bar-icons" /> },
  ];

  useEffect(() => {
    secondCardMoved && firstCardMoved
      ? setCurrentStep(1)
      : secondCardMoved || firstCardMoved
      ? setCurrentStep(0)
      : setCurrentStep(-1);
  }, [firstTeam, secondTeam]);

  return (
    <div className="fullscreen-background">
      <div className="background-cover"></div>
      <motion.div
        className="card-stack-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Progress Bar */}
        <div className="progress-bar-wrapper">
          <ProgressBar currentStep={currentStep} steps={steps} />
        </div>
        <div className="card-container">
          <motion.div className="card">
            <SelectMatchCard />
          </motion.div>
          {/* Card 2 */}
          <motion.div
            className="card"
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
              remove={[firstTeam]}
            />
          </motion.div>

          {/* Card 1 */}
          <motion.div
            className="card"
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
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardStack;
