/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
// import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import PlayerStatsAccordion from "./accordian";
import { RxCross2 } from "react-icons/rx";

import styles from "./playerStats.module.css";
import { useEffect, useState } from "react";

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
        console.log(rawData);
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
                    <p style={{ color: "#333", fontSize: "24px" }}>
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
                <div className={styles.bottomTop} style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "5%",
                }}>

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
                    {description && (
                      <div className={styles.playerdesc}>
                        <h3>Player Description:</h3>
                        <p className={styles.typing}>{description}</p>
                        {/* <p className={styles.typing}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur saepe doloribus cum. Dolores mollitia distinctio fugiat assumenda necessitatibus facere expedita optio vitae ipsa asperiores perferendis pariatur doloribus debitis, dignissimos explicabo? </p> */}
                      </div>
                    )}
                  </div>
                  <img
                    src="/assets/playerStats.png"
                    style={{ marginTop: "5%" }}
                    className={styles.statspng}
                  ></img>
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
