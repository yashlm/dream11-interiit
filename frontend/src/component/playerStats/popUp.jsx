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
            height: "100%",
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
            <PlayerStatsAccordion />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
