import React, { useState, useRef, useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../css/DreamTeamGround.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import WeatherCard from "../component/common/weatherCard";
import DreamPointsCard from "../component/common/dreamPoints";
import DescriptionCard from "../component/dreamPage/matchDescriptionCard";
import Loading from "../component/Loading";
import DragPlayerCard from "../component/dreamPage/dragPlayerCard";
import DropZone from "../component/dreamPage/dropZone";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { match_id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [offFieldPlayers, setOffFieldPlayers] = useState([]);

  const [initialOnFieldPlayers, setInitialOnFieldPlayers] = useState([]);

  const [modelOuput, setModelOutput] = useState([]);
  const [positions, setPositions] = useState(initialFieldPositions);
  const [isAtEnd, setIsAtEnd] = useState(null);
  const [isAtStart, setIsAtStart] = useState(null);
  const [dreamPoints, setDreamPoints] = useState(0);
  const [info, setInfo] = useState("");
  const dockListRef = useRef(null);

  const redo = () => {
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
      // const isEnd =
      //   dockListRef.current.scrollLeft + dockListRef.current.clientWidth ===
      //   dockListRef.current.scrollWidth;
      const canScrollRight =
        dockListRef.current.scrollLeft + dockListRef.current.clientWidth <
        dockListRef.current.scrollWidth;
      setIsAtEnd(!canScrollRight);
      const isStart = dockListRef.current.scrollLeft === 0;
      setIsAtStart(isStart);
    }
  };
  const scrollRight = () => {
    if (dockListRef.current) {
      dockListRef.current.scrollLeft += 200; // Adjust scroll amount as needed
      handleScroll();
    }
  };
  const scrollLeft = () => {
    if (dockListRef.current) {
      dockListRef.current.scrollLeft -= 200; // Adjust scroll amount as needed
      handleScroll();
    }
  };

  useEffect(() => {
    handleScroll();
  });

  useEffect(() => {
    const total = positions.reduce((sum, position) => {
      if (position.player) {
        return sum + (position.player.dreamPoints || 0);
      }
      return sum;
    }, 0);

    setDreamPoints(total);
  }, [positions]);

  useEffect(() => {
    const isValidState = (state) =>
      state?.teamA &&
      state?.teamB &&
      state.teamA.length > 0 &&
      state.teamB.length > 0;

    const processData = (data) => {
      const allPlayers = data.players.map((player) => {
        return {
          name: player.full_name || "loading...",
          key: player.player_id || null,
          dreamPoints: player.predicted_score || null,
          type: player.playing_role || null,
          profileImage: player.img_src_url,
          bgImage: player.bg_image_url,
          player_id: player.player_id,
        };
      });
      // console.log(allPlayers);
      if (allPlayers.length < 22) {
        // alert("Less Number of Plyers fetched, some error");
        // throw new Error("Not enough players");
      }
      const sortedPlayers = [...allPlayers].sort(
        (a, b) => b.dreamPoints - a.dreamPoints
      );
      setModelOutput(sortedPlayers);
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
    };
    const fetchDataByMatchId = async (match_id) => {
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
        processData(data);
        // const allPlayers = data.data.map((player) => {
        //   return {
        //     name: player.full_name || "loading...",
        //     key: player.player_id || null,
        //     dreamPoints: player.fantasy_score_total || null,
        //     type: player.playing_role || null,
        //     profileImage: player.img_src_url,
        //     bgImage: player.bg_image_url,
        //     player_id: player.player_id,
        //   };
        // });
        // // console.log(allPlayers);
        // if (allPlayers.length < 22) {
        //   // alert("Less Number of Plyers fetched, some error");
        //   // throw new Error("Not enough players");
        // }
        // const sortedPlayers = [...allPlayers].sort(
        //   (a, b) => b.dreamPoints - a.dreamPoints
        // );
        // setModelOutput(sortedPlayers);
        // setOffFieldPlayers(sortedPlayers.slice(11));
        // const initialOnFieldPlayers = sortedPlayers.slice(0, 11);
        // // setInitialOnFieldPlayers(sortedPlayers.slice(0, 11));
        // // Error //
        // // issue likely arises due to the timing of state updates in your useEffect.
        // // When FetchDreamTeam updates positions after setting initialOnFieldPlayers,
        // // the state might not yet reflect the updated initialOnFieldPlayers because
        // // React batches state updates asynchronously.
        // setPositions((prevPositions) =>
        //   prevPositions.map((position, index) => ({
        //     ...position,
        //     isFilled: index < initialOnFieldPlayers.length,
        //     player: initialOnFieldPlayers[index] || null,
        //   }))
        // );
      } catch (error) {
        alert("We encountered an issue. Please try again later.");
        console.error("Error fetching teams:", error);
        navigate("/home");
      } finally {
        setIsLoading(false);
      }
    };
    const fetchDataByState = async (state) => {
      console.log("fetching data by state");
      try {
        setIsLoading(true);
        const url = `${BASE_URL}/match/dreamTeam`;
        const body = {
          match_date: state.match_date,
          match_type: state.match_type,
          player_ids: state.teamA
            .concat(state.teamB)
            .map((player) => player.player_id),
        };
        console.log(body);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} - ${response.statusText}`
          );
        }
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
      setIsLoading(true);
      if (match_id) {
        await fetchDataByMatchId(match_id);
      } else if (location.state) {
        await fetchDataByState(location.state);
      } else {
        alert("No match found");
        navigate("/home");
      }
      setIsLoading(false);
    };
    if (match_id || isValidState(location.state)) {
      fetchData();
    }
  }, [match_id, location.state]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.bgImageHolder}>
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

      <h1
        className={`${styles.centerH1} className=" font-bold bg-gradient-to-r from-amber-500 to-pink-500 inline-block text-transparent bg-clip-text`}
      >
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
              onClick={scrollLeft} // Handle scrolling left
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
      <DescriptionCard onUndo={redo} info={info} match_id={match_id} />
    </div>
  );
}
