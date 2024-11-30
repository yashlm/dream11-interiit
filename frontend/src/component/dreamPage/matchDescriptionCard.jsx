import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "@mui/material";
import {
  BsFillVolumeUpFill,
  BsArrowsExpand,
  BsArrowsCollapse,
} from "react-icons/bs";
import { FaUndo, FaShareAlt, FaSave, FaInfoCircle } from "react-icons/fa";
import styles from "../../css/DescriptionCard.module.css";

export default function DescriptionCard({ onUndo, onMatchDetails, onSave }) {
  const [expanded, setExpanded] = useState(false); // Controls the expanded state for ShowMoreText
  const [isOverflowing, setIsOverflowing] = useState(false);
  const infoRef = useRef(null);

  const handleVoiceClick = () => {
    console.log("Voice button clicked"); // Backend logic here
  };

  const handleExpandToggle = () => {
    setExpanded((prev) => !prev); // Toggle the expanded state when the icon is clicked
  };

  // Effect to run whenever 'expanded' changes
  useEffect(() => {
    console.log("The expanded state has changed:", expanded);
    // Additional logic when expanded changes can go here
  }, [expanded]); // Dependency array ensures this effect runs on 'expanded' change

  return (
    <div className={`${styles.descriptionCard}`}>
      <div className={styles.bgBlur}>
        <div className={styles.cardHeader}>
          <p>Info Section</p>
          <div className="flex flex-row justify-end">
            <Tooltip title="Listen" placement="top">
              <button className={styles.iconButton} onClick={handleVoiceClick}>
                <BsFillVolumeUpFill />
              </button>
            </Tooltip>
            <Tooltip title={expanded ? "Minimize" : "Expand"} placement="top">
              <button
                className={styles.iconButton}
                onClick={handleExpandToggle}
              >
                {expanded ? <BsArrowsCollapse /> : <BsArrowsExpand />}{" "}
                {/* Toggle between arrow down and fullscreen */}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Info Section */}
        <div
          ref={infoRef}
          className={`${styles.infoSection} ${expanded ? styles.expanded : ""}`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          efficitur turpis a interdum vehicula. Proin tincidunt risus non odio
          pulvinar, quis pharetra neque vestibulum. Lorem ipsum dolor sit amet,
          consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit.
          Fusce efficitur turpis a interdum vehicula. Proin tincidunt risus non
          odio pulvinar, quis pharetra neque vestibulum. Lorem ipsum dolor sit
          amet, consecteturLorem ipsum dolor sit amet, consectetur adipiscing
          elit. Fusce efficitur turpis a interdum vehicula. Proin tincidunt
          risus non odio pulvinar, quis pharetra neque vestibulum. Lorem ipsum
          dolor sit amet, consectetur efficitur turpis a interdum vehicula.
          Proin tincidunt risus non odio pulvinar, quis pharetra neque
          vestibulum. Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor
          sit amet, consectetur adipiscing elit. Fusce efficitur turpis a
          interdum vehicula. Proin tincidunt risus non odio pulvinar, quis
          pharetra neque vestibulum. Lorem ipsum dolor sit amet,
          consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit.
          Fusce efficitur turpis a interdum vehicula. Proin tincidunt risus non
          odio pulvinar, quis pharetra neque vestibulum. Lorem ipsum dolor sit
          amet, consectetur efficitur turpis a interdum vehicula. Proin
          tincidunt risus non odio pulvinar, quis pharetra neque vestibulum.
          Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet,
          consectetur adipiscing elit. Fusce efficitur turpis a interdum
          vehicula. Proin tincidunt risus non odio pulvinar, quis pharetra neque
          vestibulum. Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor
          sit amet, consectetur adipiscing elit. Fusce efficitur turpis a
          interdum vehicula. Proin tincidunt risus non odio pulvinar, quis
          pharetra neque vestibulum. Lorem ipsum dolor sit amet, consectetur
          efficitur turpis a interdum vehicula. Proin tincidunt risus non odio
          pulvinar, quis pharetra neque vestibulum. Lorem ipsum dolor sit amet,
          consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit.
          Fusce efficitur turpis a interdum vehicula. Proin tincidunt risus non
          odio pulvinar, quis pharetra neque vestibulum. Lorem ipsum dolor sit
          amet, consecteturLorem ipsum dolor sit amet, consectetur adipiscing
          elit. Fusce efficitur turpis a interdum vehicula. Proin tincidunt
          risus non odio pulvinar, quis pharetra neque vestibulum. Lorem ipsum
          dolor sit amet, consectetur efficitur turpis a interdum vehicula.
          Proin tincidunt risus non odio pulvinar, quis pharetra neque
          vestibulum. Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor
          sit amet, consectetur adipiscing elit. Fusce efficitur turpis a
          interdum vehicula. Proin tincidunt risus non odio pulvinar, quis
          pharetra neque vestibulum. Lorem ipsum dolor sit amet,
          consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit.
          Fusce efficitur turpis a interdum vehicula. Proin tincidunt risus non
          odio pulvinar, quis pharetra neque vestibulum. Lorem ipsum dolor sit
          amet, consectetur
        </div>
      </div>
      {/* Header Icons */}

      <div className={styles.buttonRow}>
        <Tooltip title="Undo" placement="top">
          <button className={styles.actionButton} onClick={onUndo}>
            <FaUndo />
          </button>
        </Tooltip>
        <Tooltip title="Share" placement="top">
          <button className={styles.actionButton}>
            <FaShareAlt />
          </button>
        </Tooltip>
        <Tooltip title="Match Details" placement="top">
          <button className={styles.actionButton} onClick={onMatchDetails}>
            <FaInfoCircle />
          </button>
        </Tooltip>
        <Tooltip title="Save" placement="top">
          <button className={styles.actionButton} onClick={onSave}>
            <FaSave />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
