import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./DreamTeamGround.module.css";
import PlayerCard from "../component/playerCard";
import { FaArrowRight } from "react-icons/fa";
import { Avatar } from "@mui/material";
const ItemType = {
  PLAYER: "PLAYER",
};

const referenceX = 1278;
const referenceY = 754;

const fieldPositionsWithRatios = [
  { id: 1, x: 506, y: 91, isFilled: false, player: null },
  { id: 2, x: 730, y: 91, isFilled: false, player: null },
  { id: 3, x: 280, y: 122, isFilled: false, player: null },
  { id: 4, x: 940, y: 122, isFilled: false, player: null },
  { id: 5, x: 92, y: 190, isFilled: false, player: null },
  { id: 6, x: 1120, y: 190, isFilled: false, player: null },
  { id: 7, x: 210, y: 330, isFilled: false, player: null },
  { id: 8, x: 1010, y: 330, isFilled: false, player: null },
  { id: 9, x: 380, y: 390, isFilled: false, player: null },
  { id: 10, x: 830, y: 390, isFilled: false, player: null },
  { id: 11, x: 630, y: 400, isFilled: false, player: null },
];

const initialFieldPositions = fieldPositionsWithRatios.map((position) => ({
  ...position,
  x: ((position.x - 60) / referenceX) * 100,
  y: ((position.y - 45) / referenceY) * 100,
}));

const allPlayers = [
  {
    name: "Virat Kohli",
    key: 1,
    dreamPoints: 120,
    type: "Batsman",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Rohit Sharma",
    key: 2,
    dreamPoints: 115,
    type: "Batsman",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "KL Rahul",
    key: 3,
    dreamPoints: 98,
    type: "Batsman",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Shreyas Iyer",
    key: 4,
    dreamPoints: 105,
    type: "All-Rounder",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Hardik Pandya",
    key: 5,
    dreamPoints: 110,
    type: "All-Rounder",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Rishabh Pant",
    key: 6,
    dreamPoints: 90,
    type: "Wicket-Keeper",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Ravindra Jadeja",
    key: 7,
    dreamPoints: 95,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Jasprit Bumrah",
    key: 8,
    dreamPoints: 99,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Mohammed Shami",
    key: 9,
    dreamPoints: 85,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Yuzvendra Chahal",
    key: 10,
    dreamPoints: 92,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Bhuvneshwar Kumar",
    key: 11,
    dreamPoints: 88,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Shubman Gill",
    key: 12,
    dreamPoints: 102,
    type: "Batsman",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Sanju Samson",
    key: 13,
    dreamPoints: 89,
    type: "Wicket-Keeper",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Axar Patel",
    key: 14,
    dreamPoints: 95,
    type: "All-Rounder",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Kuldeep Yadav",
    key: 15,
    dreamPoints: 90,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Deepak Chahar",
    key: 16,
    dreamPoints: 85,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Washington Sundar",
    key: 17,
    dreamPoints: 88,
    type: "All-Rounder",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Ishan Kishan",
    key: 18,
    dreamPoints: 92,
    type: "Wicket-Keeper",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Shardul Thakur",
    key: 19,
    dreamPoints: 91,
    type: "Bowler",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Rahul Tewatia",
    key: 20,
    dreamPoints: 87,
    type: "All-Rounder",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Prithvi Shaw",
    key: 21,
    dreamPoints: 100,
    type: "Batsman",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
  {
    name: "Suryakumar Yadav",
    key: 22,
    dreamPoints: 110,
    type: "Batsman",
    profileImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
    bgImage:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
  },
];

const sortedPlayers = [...allPlayers].sort(
  (a, b) => b.dreamPoints - a.dreamPoints
);

const initialOnFieldPlayers = sortedPlayers.slice(0, 11);
const initialOffFieldPlayers = sortedPlayers.slice(11);

const initialPositions = initialFieldPositions.map((position, index) => ({
  ...position,
  isFilled: index < initialOnFieldPlayers.length,
  player: initialOnFieldPlayers[index] || null,
}));

function DragPlayerCard({ player, isDraggable = true, onAddToField }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PLAYER,
    item: player,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={isDraggable ? drag : null}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDraggable ? "move" : "default",
      }}
    >
      <PlayerCard {...player} onAddToField={onAddToField} />
    </div>
  );
}

function DropZone({ id, position, onDrop, currentPlayer, onRemove }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.PLAYER,
    drop: (droppedPlayer) => onDrop(droppedPlayer, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`${styles.dropZone} ${isOver ? styles.over : ""}`}
      style={{
        position: "absolute",
        left: `${position.x}vw`,
        top: `${position.y}vh`,
        // width: "100px",
        // height: "100px",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: currentPlayer ? "#f9f9f9" : "transparent",
      }}
    >
      {currentPlayer ? (
        <PlayerCard
          {...currentPlayer}
          isDraggable={false}
          isInField={true}
          onRemove={() => onRemove(id)}
        />
      ) : (
        <div style={{ textAlign: "center", lineHeight: "100px" }}>
          Drop Player Here
        </div>
      )}
    </div>
  );
}

export default function DreamTeamGround() {
  const [positions, setPositions] = useState(initialPositions);
  const [offFieldPlayers, setOffFieldPlayers] = useState(
    initialOffFieldPlayers
  );

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
  const [isAtEnd, setIsAtEnd] = useState(false);
  const dockListRef = useRef(null);

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

  return (
    <div className={styles.bgImageHolder}>
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
              {offFieldPlayers.map((player) => (
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
    </div>
  );
}