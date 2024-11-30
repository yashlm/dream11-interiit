import React, { useState, useRef, useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../css/DreamTeamGround.module.css";
import { FaArrowRight } from "react-icons/fa";
import WeatherCard from "../component/common/weatherCard";
import DreamPointsCard from "../component/common/dreamPoints";
import DescriptionCard from "../component/matchDescriptionCard";
import Loading from "../component/Loading";
import DragPlayerCard from "../component/dreamPage/dragPlayerCard";
import DropZone from "../component/dreamPage/dropZone";
import { useNavigate } from "react-router-dom";
import {
  BASE_URL,
  fieldPositionsInPx,
  referenceX,
  referenceY,
} from "../constants";
import { useParams } from "react-router-dom";

const initialFieldPositions = fieldPositionsInPx.map((position) => ({
  ...position,
  x: (position.x / referenceX) * 100,
  y: (position.y / referenceY) * 100,
}));

export default function DreamTeamGround() {
  const { match_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);
  const [initialOnFieldPlayers, setInitialOnFieldPlayers] = useState([]);
  // const [initialPositions, setInitialPositions] = useState(
  //   initialFieldPositions
  // );
  const [positions, setPositions] = useState(initialFieldPositions);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const dockListRef = useRef(null);
  const navigate = useNavigate();

  const handleDrop = (droppedPlayer, targetPositionId) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) => {
        if (position.id === targetPositionId) {
          if (position.isFilled) {
            // Swap current player with dropped player
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

    // Add player to the field (find the first empty position)
    const firstEmptyPosition = positions.find((position) => !position.isFilled);
    if (firstEmptyPosition) {
      setPositions(() =>
        positions.map((position) =>
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
      const isEnd =
        dockListRef.current.scrollLeft + dockListRef.current.clientWidth ===
        dockListRef.current.scrollWidth;
      setIsAtEnd(isEnd);
    }
  };
  const scrollRight = () => {
    if (dockListRef.current) {
      dockListRef.current.scrollLeft += 200; // Adjust scroll amount as needed
      handleScroll();
    }
  };

  useEffect(() => {
    const FetchDreamTeam = async (match_id) => {
      try {
        setIsLoading(true);
        const url = `${BASE_URL}/match/dreamTeam/${match_id}`;
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`
          );
        }
        const allPlayers = data.data.map((player) => {
          return {
            name: player.full_name || "loading...",
            key: player.player_id || null,
            dreamPoints: player.fantasy_score_total || 110,
            type: player.playing_role || "Batsman",
            profileImage: player.img_src_url,
            bgImage: player.bg_image_url,
          };
        });
        if (allPlayers.length < 22) {
          alert("Less Number of Plyers fetched, some error");
          // throw new Error("Not enough players");
        }
        const sortedPlayers = [...allPlayers].sort(
          (a, b) => b.dreamPoints - a.dreamPoints
        );
        setOffFieldPlayers(sortedPlayers.slice(11));
        const initialOnFieldPlayers = sortedPlayers.slice(0, 11);
        // setInitialOnFieldPlayers(sortedPlayers.slice(0, 11));
        // Error //
        // issue likely arises due to the timing of state updates in your useEffect.
        // When FetchDreamTeam updates positions after setting initialOnFieldPlayers,
        // the state might not yet reflect the updated initialOnFieldPlayers because
        // React batches state updates asynchronously.
        setPositions((prevPositions) =>
          prevPositions.map((position, index) => ({
            ...position,
            isFilled: index < initialOnFieldPlayers.length,
            player: initialOnFieldPlayers[index] || null,
          }))
        );
        console.log(positions);
      } catch (error) {
        alert("We encountered an issue. Please try again later.");
        console.error("Error fetching teams:", error);
        navigate("/home");
      } finally {
        setIsLoading(false);
      }
    };
    FetchDreamTeam(match_id);
  }, [match_id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.bgImageHolder}>
      <div className={styles.weatherCardContainer}>
        <WeatherCard
          time={"13:50"}
          place={"place"}
          temp={13}
          weatherType={"stormy"}
          humidity={"96%"}
          windSpeed={"98kmph"}
        />
      </div>
      <div className={styles.dreamPointsCard}>
        <DreamPointsCard points={180} />
      </div>

      <h1 className={styles.centerH1}>YOUR DREAM TEAM</h1>

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
            <FaArrowRight
              className={`${styles.arrowButton} ${
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
                  onAddToField={() => {
                    console.log("add to filed cliced");
                    handleAddToField(player);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </DndProvider>
      <DescriptionCard />
    </div>
  );
}
