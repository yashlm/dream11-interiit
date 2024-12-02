import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { Tooltip } from "@mui/material";
import {
  BsFillVolumeUpFill,
  BsArrowsExpand,
  BsArrowsCollapse,
} from "react-icons/bs";
import { FaUndo, FaShareAlt, FaSave, FaInfoCircle } from "react-icons/fa";
import styles from "../../css/DescriptionCard.module.css";
import { BASE_URL } from "../../constants";
import ClipLoader from "react-spinners/ClipLoader";

export default function DescriptionCard({
  onUndo,
  onMatchDetails,
  onSave,
  info,
}) {
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const [audioLoading, setAudioLoading] = useState(false);

  // const fetchAudio = async () => {
  //   const text = document.getElementById("infoSectionText").textContent;
  //   console.log("Text to be converted to audio:", text);
  //   try {
  //     const response = await fetch(`${BASE_URL}/ai/audio`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: text }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch audio");
  //     }
  //     // Create a blob URL from the audio data
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     setAudioUrl(url);
  //   } catch (err) {
  //     console.log("Error in fetching audio:", err);
  //   } finally {
  //     setAudioLoading(false);
  //   }
  // };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audioUrl]);

  const [expanded, setExpanded] = useState(false); // Controls the expanded state for ShowMoreText
  const [isOverflowing, setIsOverflowing] = useState(false);
  const infoRef = useRef(null);

  const fetchAudio = async () => {
    setAudioLoading(true); // Show the loader while fetching
    const text = document.getElementById("infoSectionText").textContent;
    console.log("Text to be converted to audio:", text);
    try {
      const response = await fetch(`${BASE_URL}/ai/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }
      // Create a blob URL from the audio data
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Play audio after URL is set
      if (audioRef.current) {
        audioRef.current.src = url; // Set the audio source
        await audioRef.current.play(); // Play the audio
      }
    } catch (err) {
      console.log("Error in fetching audio:", err);
    } finally {
      setAudioLoading(false); // Hide the loader
    }
  };

  const handleVoiceClick = async () => {
    console.log("Voice button clicked");
    await fetchAudio(); // Ensure fetchAudio is awaited
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
      <audio ref={audioRef} style={{ display: "none" }} />
      <div className={styles.bgBlur}>
        <div className={styles.cardHeader}>
          <p>Info Section</p>
          <div className="flex flex-row justify-end">
            <Tooltip title="Listen" placement="top">
              <button className={styles.iconButton} onClick={handleVoiceClick}>
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
            <Tooltip title={expanded ? "Minimize" : "Expand"} placement="top">
              <button
                className={styles.iconButton}
                onClick={handleExpandToggle}
              >
                {expanded ? <BsArrowsCollapse /> : <BsArrowsExpand />}{" "}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Info Section */}
        <div
          ref={infoRef}
          className={`${styles.infoSection} ${expanded ? styles.expanded : ""}`}
          id="infoSectionText"
        >
          <h3>Weather Effect</h3>
          <p>{info}</p>
        </div>
      </div>
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
