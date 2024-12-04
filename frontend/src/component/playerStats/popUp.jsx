import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardMedia from "@mui/material/CardMedia";
import PlayerStatsAccordion from "./accordian";
import { RxCross2 } from "react-icons/rx";
import { Tooltip } from "@mui/material";
import { BsFillVolumeUpFill } from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./playerStats.module.css";
import { BASE_URL } from "../../constants";
import Loading from "../common/Loading";
import CleanPlayerType from "../helper/cleanPlayerType";

export default function PlayerPopOut({
  isVisible,
  onClose,
  name,
  bgImage,
  profileImage,
  firstName,
  lastName,
  matchId,
  playerId,
  description,
}) {
  const [data, setData] = useState(null);
  const [sidePanelData, setSidePanelData] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const noDescriptionMessages = [
    "Although the player is skilled, our model has not selected them to play in this match under the current conditions.",
    "Despite their talent, the player wasn't picked by our model for this match given the circumstances.",
    "The player might be talented, but they haven't been chosen by our model for this match due to specific conditions.",
    "Even though the player shows great potential, they were not selected by our model for this match at this time.",
    "Although skilled, our model has not considered the player for this match based on the current analysis.",
    "The player is certainly capable, but under these match conditions, our model did not select them to play.",
    "The player possesses notable skill, but was not picked by our model for the current match conditions.",
    "Despite showing promise, the player wasn't selected by our model for this match.",
    "Although the player demonstrates talent, our model didn't pick them for this particular match.",
    "The player is undoubtedly skilled, but under the current conditions, our model did not deem them a fit for this match.",
    "While the player has potential, they weren't selected by our model for this match due to the specific conditions.",
    "The player has the skills, but based on our model's analysis, they haven't been selected for this match.",
    "Although the player has proven abilities, they were not picked by our model for this match given the current conditions.",
    "Despite their abilities, the player was not selected for this match by our model due to the current analysis.",
    "The player shows talent, but wasn't selected by our model for this match under the present conditions.",
  ];

  const randomMessage =
    noDescriptionMessages[
      Math.floor(Math.random() * noDescriptionMessages.length)
    ];

  // Fetch player stats data on load
  useEffect(() => {
    const dataFeatch = async () => {
      try {
        const payload = {
          match_id: matchId,
          player_id: playerId,
        };
        const response = await fetch(`${BASE_URL}/player/player_all_stats2/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`
          );
        }
        const rawData = await response.json();
        const responseData = rawData.data;
        setData({ bat: responseData.bat, bowl: responseData.bowl });
        setSidePanelData(rawData.data.cricketer_data);
      } catch (error) {
        onClose();
        alert("We encountered an issue. Please try again later.");
        console.error("Error fetching teams:", error);
      }
    };
    dataFeatch();
  }, [matchId, playerId]);

  // Fetch audio description logic
  const fetchAudio = async () => {
    setAudioLoading(true); // Show loader
    const text = description || randomMessage; // Use description or random message if unavailable
    try {
      const body = {
        target_language_code: localStorage.getItem("lang") || "en",
        message: text,
      };
      const response = await fetch(`${BASE_URL}/ai/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Play audio after URL is set
      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
      }
    } catch (err) {
      console.log("Error in fetching audio:", err);
    } finally {
      setAudioLoading(false); // Hide loader
    }
  };

  const handleVoiceClick = async () => {
    await fetchAudio(); // Ensure fetchAudio is awaited
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
        >
          <button onClick={onClose} className={styles.removeBtn}>
            <RxCross2 size={20} />
          </button>
          <div className={styles.topPanel}>
            <div style={{ width: "100%", alignItems: "center" }}>
              <div className={styles.nameTypeData}>
                <p className={styles.profileName}>
                  {firstName} <br />
                  <span className={styles.lastName}>{lastName}</span>
                </p>
                <div className={styles.profiledata}>
                  {sidePanelData && (
                    <div className={styles.cricketerData}>
                      <p>
                        <strong>Batting Style: </strong>{" "}
                        {sidePanelData.batting_style}
                      </p>
                      <p>
                        <strong>Bowling Style: </strong>{" "}
                        {sidePanelData.bowling_style}
                      </p>
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        color: "var(--calendar)",
                        fontSize: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      {sidePanelData ? sidePanelData.player_role : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "-4rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: "2%",
                  width: "100%",
                }}
              >
                <div
                  className={styles.bottomTop}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: "5%",
                  }}
                >
                  <div className={styles.imgplusdesc}>
                    <div>
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
                        </div>
                      </CardMedia>
                    </div>
                    <div className={styles.playerdesc}>
                      <div className={styles.audio}>
                        <h3>Model Insights:</h3>
                        <Tooltip title="Listen" placement="top">
                          <button
                            className={styles.iconButton}
                            onClick={handleVoiceClick}
                          >
                            {audioLoading ? (
                              <ClipLoader
                                color={"white"}
                                className={styles.loader}
                                loading={audioLoading}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              <BsFillVolumeUpFill />
                            )}
                          </button>
                        </Tooltip>
                        <audio ref={audioRef} hidden />
                      </div>
                      {description ? (
                        <p id="infoSectionText" className={styles.typing}>
                          {description}
                        </p>
                      ) : (
                        <p id="infoSectionText" className={styles.typing}>
                          {randomMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <img
                    src="/assets/playerStats.png"
                    style={{ marginTop: "5%" }}
                    className={styles.statspng}
                  />
                </div>
              </div>
            </div>
          </div>
          {data ? (
            <div className={styles.bottomPanel}>
              <PlayerStatsAccordion
                playerType={CleanPlayerType(sidePanelData.player_role)}
                data={data}
              />
            </div>
          ) : (
            <Loading />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
