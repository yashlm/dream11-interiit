import { motion, AnimatePresence } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import PlayerStatsAccordion from "./accordian";
import { RxCross2 } from "react-icons/rx";

import styles from "./playerStats.module.css";
import { useEffect, useState } from "react";

import { BASE_URL } from "../../constants";
import Loading from "../Loading";
import CleanPlayerType from "../helper/cleanPlayerType";

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
  matchId,
  playerId,
  description,
}) {
  const [data, setData] = useState(null);
  const [sidePanelData, setSidePanelData] = useState(null);
  useEffect(() => {
    const dataFeatch = async () => {
      try {
        const payload = {
          match_id: matchId,
          player_id: playerId,
        };
        const response = await fetch(`${BASE_URL}/player/player_all_stats/`, {
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
  }, []);

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
                    src={teamIconUrl || "/assets/noTeamIcon.png"}
                    sx={{
                      height: "6vh",
                      width: "6vh",
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
            <div>
              <p>{sidePanelData ? sidePanelData.player_role : ""}</p>
              <p>{description ? description : ""}</p>
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
