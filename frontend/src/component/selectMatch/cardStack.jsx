import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../../css/cardStack.module.css";
import TeamSearchCard from "./selectTeamCard.jsx";
import { GiAmericanFootballHelmet } from "react-icons/gi";
import { BiCricketBall } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading.jsx";
import ProgressBar from "./progressBar.jsx";
import SelectMatchCard from "./selectMatchCard.jsx";
import { BASE_URL } from "../../constants.jsx";
import Navbar from "../Navbar.jsx";

const CardStack = () => {
  const [firstCardMoved, setFirstCardMoved] = useState(false);
  const [secondCardMoved, setSecondCardMoved] = useState(false);
  // const [firstCardMoved, setFirstCardMoved] = useState(true);
  // const [secondCardMoved, setSecondCardMoved] = useState(true);

  const [currentStep, setCurrentStep] = useState(-1);

  const [firstTeam, setFirstTeam] = useState(null);
  const [secondTeam, setSecondTeam] = useState(null);

  // const [firstTeam, setFirstTeam] = useState({
  //   name: "India",
  //   url:
  //     "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/800px-Cricket_India_Crest.svg.png",
  // });
  // const [secondTeam, setSecondTeam] = useState({
  //   name: "Australia",
  //   url:
  //     "https://upload.wikimedia.org/wikipedia/en/4/4f/Western_Australia_Women_Badge.png",
  // });

  const [allTeams, setallTeams] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(`${BASE_URL}/team/teams/`, {
          method: "GET",
        });
        const data = await response.json();
        setallTeams(data.data);
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
    <div className={styles.fullscreenBackground}>
      <Navbar />
      {/* <div className={styles.backgroundCover}></div> */}
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
        <p className="w-full m-auto mt-4 text-center text-cyan-300 text-xl">
          Lets find a match
        </p>
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
                : "0",
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
