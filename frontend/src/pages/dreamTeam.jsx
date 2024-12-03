import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toPng } from 'html-to-image';
import styles from "../css/DreamTeamGround.module.css";
import { FaArrowRight, FaArrowLeft, FaTimes } from "react-icons/fa";
import WeatherCard from "../component/common/weatherCard";
import DreamPointsCard from "../component/common/dreamPoints";
import DescriptionCard from "../component/dreamPage/matchDescriptionCard";
import Loading from "../component/Loading";
import DragPlayerCard from "../component/dreamPage/dragPlayerCard";
import DropZone from "../component/dreamPage/dropZone";
import html2canvas from 'html2canvas';
import { motion } from "framer-motion";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import {
  BASE_URL,
  fieldPositionsInPx,
  referenceX,
  referenceY,
} from "../constants";

// Constants
const initialFieldPositions = fieldPositionsInPx.map((position) => ({
  ...position,
  x: (position.x / referenceX) * 100,
  y: (position.y / referenceY) * 100,
}));

const getLocalStorageData = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  }
  return defaultValue;
};

export default function DreamTeamGround() {
  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { match_id } = useParams();

  // Refs
  const dockListRef = useRef(null);
  const screenshotRef = useRef(null);
  const firstUpdate = useRef(true);

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [isAtEnd, setIsAtEnd] = useState(null);
  const [isAtStart, setIsAtStart] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [screeanshot, setScreenshot] = useState(false);

  // Game state
  const [offFieldPlayers, setOffFieldPlayers] = useState(() =>
    getLocalStorageData("offFieldPlayers", [])
  );
  const [positions, setPositions] = useState(() =>
    getLocalStorageData("positions", initialFieldPositions)
  );
  const [modelOuput, setModelOutput] = useState(() =>
    getLocalStorageData("modelOutput", [])
  );
  const [dreamPoints, setDreamPoints] = useState(() =>
    getLocalStorageData("dreamPoints", 0)
  );

  // Effects
  useEffect(() => {
    // Sync state with localStorage after refresh
    setOffFieldPlayers(getLocalStorageData("offFieldPlayers", []));
    setPositions(getLocalStorageData("positions", initialFieldPositions));
    setModelOutput(getLocalStorageData("modelOutput", []));
    setDreamPoints(getLocalStorageData("dreamPoints", 0));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("modelOutput", JSON.stringify(modelOuput));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [modelOuput]);

  useEffect(() => {
    const total = positions.reduce((sum, position) => {
      if (position.player) {
        return sum + (position.player.dreamPoints || 0);
      }
      return sum;
    }, 0);
    setDreamPoints(total);
  }, [positions]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // Only fetch if we don't have data in localStorage
    const hasStoredData = localStorage.getItem("positions") && 
                         localStorage.getItem("offFieldPlayers") && 
                         localStorage.getItem("modelOutput") &&
                         localStorage.getItem("dreamPoints");
    
    if (!hasStoredData) {
      fetchData();
    }
  }, [match_id]);

  // Helper functions
  const isValidState = (state) =>
    state?.teamA &&
    state?.teamB &&
    state.teamA.length > 0 &&
    state.teamB.length > 0;

  const processData = (data) => {
    const allPlayers = data.players.map((player) => ({
      name: player.full_name || "loading...",
      key: player.player_id || null,
      dreamPoints: player.predicted_score || null,
      type: player.playing_role || null,
      profileImage: player.img_src_url,
      bgImage: player.bg_image_url,
      player_id: player.player_id,
    }));

    const sortedPlayers = [...allPlayers].sort(
      (a, b) => b.dreamPoints - a.dreamPoints
    );
    
    setModelOutput(sortedPlayers);
    setOffFieldPlayers(sortedPlayers.slice(11));
    
    const initialOnFieldPlayers = sortedPlayers.slice(0, 11);
    setPositions((prevPositions) =>
      prevPositions.map((position, index) => ({
        ...position,
        isFilled: index < initialOnFieldPlayers.length,
        player: initialOnFieldPlayers[index] || null,
      }))
    );
  };

  // API calls
  const fetchDataByMatchId = async (match_id) => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}/match/dreamTeam/${match_id}`;
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      processData(data);
    } catch (error) {
      alert("We encountered an issue. Please try again later.");
      console.error("Error fetching teams:", error);
      navigate("/home");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataByState = async (state) => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}/match/dreamTeam`;
      const body = {
        match_date: state.match_date,
        match_type: state.match_type,
        player_ids: state.teamA.concat(state.teamB).map((player) => player.player_id),
      };
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      processData(data);
    } catch (error) {
      alert("We encountered an issue. Please try again later.");
      console.error("Error fetching teams:", error);
      navigate("/home");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    if (match_id) {
      await fetchDataByMatchId(match_id);
    } else if (location.state && isValidState(location.state)) {
      await fetchDataByState(location.state);
    } else {
      alert("No match found");
      navigate("/home");
    }
  };

  // Event handlers
  const handleDrop = (droppedPlayer, targetPositionId) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) => {
        if (position.id === targetPositionId) {
          if (position.isFilled) {
            setOffFieldPlayers((prev) => [...prev, position.player]);
          }
          return { ...position, isFilled: true, player: droppedPlayer };
        }
        return position;
      })
    );
    setOffFieldPlayers((prev) =>
      prev.filter((player) => player.key !== droppedPlayer.key)
    );
  };

  const handleRemovePlayer = (positionId) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) => {
        if (position.id === positionId && position.player) {
          setOffFieldPlayers((prev) => [...prev, position.player]);
          return { ...position, isFilled: false, player: null };
        }
        return position;
      })
    );
  };

  const handleAddToField = (player) => {
    if (positions.filter((position) => position.isFilled).length >= 11) {
      alert("No space left on the field");
      return;
    }

    const firstEmptyPosition = positions.find((position) => !position.isFilled);
    if (firstEmptyPosition) {
      setPositions((prevPositions) =>
        prevPositions.map((position) =>
          position.id === firstEmptyPosition.id
            ? { ...position, isFilled: true, player }
            : position
        )
      );
      setOffFieldPlayers((prev) => prev.filter((p) => p.key !== player.key));
    }
  };

  const handleScroll = () => {
    if (dockListRef.current) {
      const canScrollRight =
        dockListRef.current.scrollLeft + dockListRef.current.clientWidth <
        dockListRef.current.scrollWidth;
      setIsAtEnd(!canScrollRight);
      setIsAtStart(dockListRef.current.scrollLeft === 0);
    }
  };

  const scrollRight = () => {
    if (dockListRef.current) {
      dockListRef.current.scrollLeft += 200;
      handleScroll();
    }
  };

  const scrollLeft = () => {
    if (dockListRef.current) {
      dockListRef.current.scrollLeft -= 200;
      handleScroll();
    }
  };
  
  const [screenshotUrl, setScreenshotUrl] = useState(null);  

  const handleTakeScreenshot = async () => {
    setExpanded(false);
    setScreenshot(true);

    if (screenshotRef.current) {
      try {
        // Capture the screenshot using html2canvas
        const canvas = await html2canvas(screenshotRef.current, {
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL();

        // Set the screenshot URL in the state
        setScreenshotUrl(dataUrl);

        canvas.toBlob((blob) => {
          if (blob) {
            // Create a valid URL from the Blob
            const url = URL.createObjectURL(blob);
            setScreenshotUrl(url); // Set the URL as the screenshot URL
          }
        });

      } catch (error) {
        console.error("Error taking screenshot:", error);
      }
    }
  };

  

  const handleExpandToggle = () => {
    setExpanded((prev) => !prev); // Toggle the expanded state when the icon is clicked
  };


  const handleSave = () => {
    try {
      localStorage.setItem("positions", JSON.stringify(positions));
      localStorage.setItem("offFieldPlayers", JSON.stringify(offFieldPlayers));
      localStorage.setItem("dreamPoints", JSON.stringify(dreamPoints));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleRedo = () => {
    setOffFieldPlayers(modelOuput.slice(11));
    setPositions((prevPositions) => {
      const initialOnFieldPlayers = modelOuput.slice(0, 11);
      return prevPositions.map((position, index) => ({
        ...position,
        isFilled: index < initialOnFieldPlayers.length,
        player: initialOnFieldPlayers[index] || null,
      }));
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className={styles.bgImageHolder} ref={screenshotRef}>
      {match_id && (
        <div className={styles.weatherCardContainer}>
          <WeatherCard
            matchId={match_id}
            time={"13:50"}
            place={"place"}
            temp={13}
            weatherType={"stormy"}
            humidity={"96%"}
            windSpeed={"98kmph"}
            setEffect={setInfo}
          />
        </div>
      )}
      
      <div className={styles.dreamPointsCard}>
        <DreamPointsCard points={dreamPoints} />
      </div>

      <h1 className={`${styles.centerH1} font-bold bg-gradient-to-r from-amber-500 to-pink-500 inline-block text-transparent bg-clip-text`}>
        YOUR DREAM TEAM
      </h1>

      <DndProvider backend={HTML5Backend}>
        {positions.map((position) => (
          <DropZone
            key={position.id}
            id={position.id}
            position={{ x: position.x, y: position.y }}
            currentPlayer={position.player}
            onDrop={handleDrop}
            onRemove={handleRemovePlayer}
          />
        ))}
        
        <div className={styles.bottomDock}>
          <h2>Other Players</h2>
          <div className={styles.dockListWrapper}>
            <FaArrowLeft
              className={`${styles.arrowButton} ${styles.leftArrow} ${
                isAtStart ? styles.hidden : ""
              }`}
              onClick={scrollLeft}
            />
            <FaArrowRight
              className={`${styles.arrowButton} ${styles.rightArrow} ${
                isAtEnd ? styles.hidden : ""
              }`}
              onClick={scrollRight}
            />

            <div
              className={styles.dockList}
              ref={dockListRef}
              onScroll={handleScroll}
            >
              {offFieldPlayers?.map((player) => (
                <DragPlayerCard
                  key={player.key}
                  player={player}
                  onAddToField={() => handleAddToField(player)}
                />
              ))}
            </div>
          </div>
        </div>
      </DndProvider>
      
      <DescriptionCard
        onUndo={handleRedo}
        info={info}
        match_id={match_id}
        onSave={handleSave}
        onSS={handleTakeScreenshot}
        expanded={expanded}
        handleExpandToggle={handleExpandToggle}
      />
      {screeanshot && (
        <motion.div
          id="screenshot-container"
          className={styles.screenshotContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative" }}
        >
          <motion.img
            src={screenshotUrl}
            alt="Screenshot Preview"
            style={{
              position: "absolute",
              top: "4%",
              left: "10%",
              width: "80vw",
              height: "80vh",
              objectFit: "cover",
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className={styles.shareButtonsContainer}
            style={{
              position: "absolute",
              top: "86%",
              left: "36%",
              transform: "translateX(-50%)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <FacebookShareButton url={screenshotUrl} quote="Check out my Dream11 team!">
                <FacebookIcon size={52} round />
              </FacebookShareButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <TwitterShareButton url={screenshotUrl} title="Check out my Dream11 team!">
                <TwitterIcon size={52} round />
              </TwitterShareButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <WhatsappShareButton url={screenshotUrl} title="Check out my Dream11 team!">
                <WhatsappIcon size={52} round />
              </WhatsappShareButton>
            </motion.div>
          </motion.div>
          
          <motion.div
            className={styles.closeButton}
            onClick={() => setScreenshot(false)}
            style={{
              position: "absolute",
              top: "4%",
              right: "4%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaTimes />
          </motion.div>
        </motion.div>
      )}
    </div>

    
  );
}
