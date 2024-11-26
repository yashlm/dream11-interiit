import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./cardStack.css";
import TeamSearchCard from "./cardStackTeamCard";
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
  // const [MatchDate, setMatchDate] = useState(null);

  // Define steps with labels and icons
  const steps = [
    {
      label: "First Team",
      icon: <GiAmericanFootballHelmet className="progress-bar-icons" />,
    },
    {
      label: "Second Team",
      icon: <GiAmericanFootballHelmet className="progress-bar-icons" />,
    },
    { label: "Match", icon: <BiCricketBall className="progress-bar-icons" /> },
  ];
  useEffect(() => {
    secondCardMoved
      ? setCurrentStep(1)
      : firstCardMoved
      ? setCurrentStep(0)
      : setCurrentStep(-1);
  }, [firstTeam, secondTeam]);

  return (
    <div className="fullscreen-background">
      <div className="background-cover"></div>
      <div className="card-stack-container">
        {/* Progress Bar */}
        <div className="progress-bar-wrapper">
          <ProgressBar currentStep={currentStep} steps={steps} />
        </div>
        <div className="card-container">
          <motion.div
            className="card"
            animate={{
              opacity: secondCardMoved & firstCardMoved ? 0.8 : 1,
            }}
          >
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
                ? `${Math.min(window.innerWidth * 0.35, 400)}px`
                : "0", // Move right by 50% of viewport width
              zIndex: secondCardMoved ? 2 : 1,
              width: secondCardMoved ? "20%" : "45%", // Adjust width dynamically
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
                ? `-${Math.min(window.innerWidth * 0.35, 400)}px`
                : "0", // Move left by 50% of viewport width
              zIndex: firstCardMoved ? 2 : 1,
              width: firstCardMoved ? "20%" : "45", // Adjust width dynamically
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
      </div>
    </div>
  );
};

export default CardStack;
