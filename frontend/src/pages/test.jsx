import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import "./test.css";
import PlayerCard from "../component/playerCard";

import styles from "./DreamTeamGround.module.css";
const ItemType = {
  PLAYER: "player",
};

function DragPlayerCard({ id, name, type, points, image, bgImage, onRemove }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.PLAYER,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag} // Make the div itself draggable
      style={{
        opacity: isDragging ? 0.5 : 1, // Make the item semi-transparent when dragging
        cursor: "move", // Change cursor to indicate draggable item
      }}
    >
      {/* Pass down props to the PlayerCard */}
      <PlayerCard
        name={name}
        points={points}
        info={type}
        backgroundImageUrl={bgImage}
        profileUrl={image}
        onRemove={() => onRemove(id)}
      />
    </div>
  );
}

function DropZone({ id, position, onDrop, currentPlayer, onRemove }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.PLAYER,
    drop: (item) => onDrop(item.id, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`drop-zone ${!currentPlayer ? "empty" : ""} ${
        isOver ? "over" : ""
      }`}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "80px",
        height: "100px",
        transform: "translate(-50%, -50%)",
        border: !currentPlayer ? "2px dashed rgba(0, 0, 0, 0.5)" : "none",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver ? "rgba(0, 255, 0, 0.1)" : "transparent",
      }}
    >
      {currentPlayer ? (
        <DragPlayerCard
          {...currentPlayer}
          onRemove={(id) => onRemove(id, position)}
        />
      ) : (
        <div style={{ fontSize: "12px", color: "#777" }}>Drop Here</div>
      )}
    </div>
  );
}

function PlayerList() {
  const initialFieldPlayers = [
    {
      id: 1,
      x: 526,
      y: 101,
      name: "Virat Kohli",
      type: "Batsman",
      points: 120,
      image: "/images/virat.png",
    },
    {
      id: 2,
      x: 750,
      y: 101,
      name: "Rohit Sharma",
      type: "Batsman",
      points: 115,
      image: "/images/rohit.png",
    },

    {
      id: 3,
      x: 300,
      y: 132,
      name: "KL Rahul",
      type: "Batsman",
      points: 98,
      image: "/images/klrahul.png",
    },
    {
      id: 4,
      x: 960,
      y: 132,
      name: "Shreyas Iyer",
      type: "All-Rounder",
      points: 105,
      image: "/images/shreyas.png",
    },
    {
      id: 5,
      x: 112,
      y: 200,
      name: "Hardik Pandya",
      type: "All-Rounder",
      points: 110,
      image: "/images/hardik.png",
    },
    {
      id: 6,
      x: 1140,
      y: 200,
      name: "Rishabh Pant",
      type: "Wicket-Keeper",
      points: 90,
      image: "/images/pant.png",
    },
    {
      id: 7,
      x: 200,
      y: 340,
      name: "Ravindra Jadeja",
      type: "Bowler",
      points: 95,
      image: "/images/jadeja.png",
    },
    {
      id: 8,
      x: 1130,
      y: 340,
      name: "Jasprit Bumrah",
      type: "Bowler",
      points: 99,
      image: "/images/bumrah.png",
    },
    {
      id: 9,
      x: 407,
      y: 430,
      name: "Mohammed Shami",
      type: "Bowler",
      points: 85,
      image: "/images/shami.png",
    },
    {
      id: 10,
      x: 903,
      y: 350,
      name: "Yuzvendra Chahal",
      type: "Bowler",
      points: 92,
      image: "/images/chahal.png",
    },
    {
      id: 11,
      x: 650,
      y: 375,
      name: "Bhuvneshwar Kumar",
      type: "Bowler",
      points: 88,
      image: "/images/bhuvi.png",
    },
  ];
  const initialDockPlayers = [
    {
      id: 12,
      name: "Shubman Gill",
      type: "Batsman",
      points: 102,
      image: "/images/gill.png",
    },
    {
      id: 13,
      name: "Sanju Samson",
      type: "Wicket-Keeper",
      points: 89,
      image: "/images/sanju.png",
    },
    {
      id: 14,
      name: "Axar Patel",
      type: "All-Rounder",
      points: 95,
      image: "/images/axar.png",
    },
    {
      id: 15,
      name: "Kuldeep Yadav",
      type: "Bowler",
      points: 90,
      image: "/images/kuldeep.png",
    },
    {
      id: 16,
      name: "Deepak Chahar",
      type: "Bowler",
      points: 85,
      image: "/images/chahar.png",
    },
    {
      id: 17,
      name: "Washington Sundar",
      type: "All-Rounder",
      points: 88,
      image: "/images/sundar.png",
    },
    {
      id: 18,
      name: "Ishan Kishan",
      type: "Wicket-Keeper",
      points: 92,
      image: "/images/ishan.png",
    },
    {
      id: 19,
      name: "Shardul Thakur",
      type: "Bowler",
      points: 91,
      image: "/images/shardul.png",
    },
    {
      id: 20,
      name: "Rahul Tewatia",
      type: "All-Rounder",
      points: 87,
      image: "/images/tewatia.png",
    },
    {
      id: 21,
      name: "Prithvi Shaw",
      type: "Batsman",
      points: 100,
      image: "/images/shaw.png",
    },
    {
      id: 22,
      name: "Suryakumar Yadav",
      type: "Batsman",
      points: 110,
      image: "/images/surya.png",
    },
  ];

  const [fieldPlayers, setFieldPlayers] = useState(initialFieldPlayers);
  const [dockPlayers, setDockPlayers] = useState(initialDockPlayers);

  const handleDrop = (playerId, zoneId) => {
    const droppedPlayer = dockPlayers.find((p) => p.id === playerId);
    const fieldPlayer = fieldPlayers.find((p) => p.id === zoneId);

    if (droppedPlayer) {
      const updatedDockPlayers = dockPlayers.filter((p) => p.id !== playerId);
      if (fieldPlayer) {
        updatedDockPlayers.push({ id: fieldPlayer.id, ...fieldPlayer });
      }

      setDockPlayers(updatedDockPlayers);
      setFieldPlayers(
        fieldPlayers.map((p) =>
          p.id === zoneId
            ? { id: playerId, x: p.x, y: p.y, ...droppedPlayer }
            : p
        )
      );
    }
  };

  //   const handleRemovePlayer = (playerId, position) => {
  //     const updatedFieldPlayers = fieldPlayers.filter((p) => p.id !== playerId);
  //     const removedPlayer = fieldPlayers.find((p) => p.id === playerId);

  //     setFieldPlayers(updatedFieldPlayers);
  //     if (removedPlayer) {
  //       setDockPlayers([...dockPlayers, removedPlayer]);
  //     }
  //   };

  const handleRemovePlayer = (playerId) => {
    const updatedFieldPlayers = fieldPlayers.map((p) =>
      p.id === playerId
        ? { ...p, id: null, name: "", type: "", points: "", image: "" }
        : p
    );
    const removedPlayer = fieldPlayers.find((p) => p.id === playerId);

    setFieldPlayers(updatedFieldPlayers);
    if (removedPlayer) {
      setDockPlayers([...dockPlayers, removedPlayer]);
    }
  };

  const clearField = () => {
    setDockPlayers([...dockPlayers, ...fieldPlayers]);
    setFieldPlayers([]);
  };

  return (
    <div className={styles.bgImageHolder}>
      <DndProvider backend={HTML5Backend}>
        <button
          onClick={clearField}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear Field
        </button>

        {/* Cricket Field */}
        <div style={{ position: "relative", width: "800px", height: "600px" }}>
          {/* <img
            src="https://static.vecteezy.com/system/resources/previews/036/099/444/non_2x/ai-generated-lush-green-lawn-at-football-soccer-sports-stadium-professionalgraphy-photo.jpg"
            // src="https://images.augustman.com/wp-content/uploads/sites/6/2023/04/16072649/Untitled-design-2023-04-16T071319.214.jpg?tr=w-1920"

            alt="Cricket Field"
            style={{ width: "100%", height: "100%" }}
          /> */}
          {/* Drop Zones */}
          {fieldPlayers.map((pos) => (
            <DropZone
              key={pos.id}
              id={pos.id}
              position={{ x: pos.x, y: pos.y }}
              onDrop={handleDrop}
              currentPlayer={pos}
              onRemove={handleRemovePlayer}
            />
          ))}
        </div>

        {/* Horizontal Dock */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            gap: "10px",
            padding: "10px",
            background: "#f0f0f0",
          }}
        >
          {dockPlayers.map((player) => (
            <DragPlayerCard {...player} />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}

export default PlayerList;



// import React, { useState } from "react";
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import styles from "./DreamTeamGround.module.css";
// import PlayerCard from "../component/playerCard";
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

// const ItemType = {
//   PLAYER: "PLAYER",
// };

// // Initial positions for players on the field
// const initialFieldPositions = [
//   { id: 1, x: 526, y: 101, isFilled: false, player: null },
//   { id: 2, x: 750, y: 101, isFilled: false, player: null },
//   { id: 3, x: 300, y: 132, isFilled: false, player: null },
//   { id: 4, x: 960, y: 132, isFilled: false, player: null },
//   { id: 5, x: 112, y: 200, isFilled: false, player: null },
//   { id: 6, x: 1140, y: 200, isFilled: false, player: null },
//   { id: 7, x: 200, y: 340, isFilled: false, player: null },
//   { id: 8, x: 1130, y: 340, isFilled: false, player: null },
//   { id: 9, x: 407, y: 430, isFilled: false, player: null },
//   { id: 10, x: 903, y: 360, isFilled: false, player: null },
//   { id: 11, x: 650, y: 375, isFilled: false, player: null },
// ];
// const allPlayers = [
//   {
//     name: "Virat Kohli",
//     key: 1,
//     dreamPoints: 120,
//     type: "Batsman",
//     profileImage: "/images/virat.png",
//     bgImage: "/images/virat.png",
//   },
//   {
//     name: "Rohit Sharma",
//     key: 2,
//     dreamPoints: 115,
//     type: "Batsman",
//     profileImage: "/images/rohit.png",
//     bgImage: "/images/rohit.png",
//   },
//   {
//     name: "KL Rahul",
//     key: 3,
//     dreamPoints: 98,
//     type: "Batsman",
//     profileImage: "/images/klrahul.png",
//     bgImage: "/images/klrahul.png",
//   },
//   {
//     name: "Shreyas Iyer",
//     key: 4,
//     dreamPoints: 105,
//     type: "All-Rounder",
//     profileImage: "/images/shreyas.png",
//     bgImage: "/images/shreyas.png",
//   },
//   {
//     name: "Hardik Pandya",
//     key: 5,
//     dreamPoints: 110,
//     type: "All-Rounder",
//     profileImage: "/images/hardik.png",
//     bgImage: "/images/hardik.png",
//   },
//   {
//     name: "Rishabh Pant",
//     key: 6,
//     dreamPoints: 90,
//     type: "Wicket-Keeper",
//     profileImage: "/images/pant.png",
//     bgImage: "/images/pant.png",
//   },
//   {
//     name: "Ravindra Jadeja",
//     key: 7,
//     dreamPoints: 95,
//     type: "Bowler",
//     profileImage: "/images/jadeja.png",
//     bgImage: "/images/jadeja.png",
//   },
//   {
//     name: "Jasprit Bumrah",
//     key: 8,
//     dreamPoints: 99,
//     type: "Bowler",
//     profileImage: "/images/bumrah.png",
//     bgImage: "/images/bumrah.png",
//   },
//   {
//     name: "Mohammed Shami",
//     key: 9,
//     dreamPoints: 85,
//     type: "Bowler",
//     profileImage: "/images/shami.png",
//     bgImage: "/images/shami.png",
//   },
//   {
//     name: "Yuzvendra Chahal",
//     key: 10,
//     dreamPoints: 92,
//     type: "Bowler",
//     profileImage: "/images/chahal.png",
//     bgImage: "/images/chahal.png",
//   },
//   {
//     name: "Bhuvneshwar Kumar",
//     key: 11,
//     dreamPoints: 88,
//     type: "Bowler",
//     profileImage: "/images/bhuvi.png",
//     bgImage: "/images/bhuvi.png",
//   },
//   {
//     name: "Shubman Gill",
//     key: 12,
//     dreamPoints: 102,
//     type: "Batsman",
//     profileImage: "/images/gill.png",
//     bgImage: "/images/gill.png",
//   },
//   {
//     name: "Sanju Samson",
//     key: 13,
//     dreamPoints: 89,
//     type: "Wicket-Keeper",
//     profileImage: "/images/sanju.png",
//     bgImage: "/images/sanju.png",
//   },
//   {
//     name: "Axar Patel",
//     key: 14,
//     dreamPoints: 95,
//     type: "All-Rounder",
//     profileImage: "/images/axar.png",
//     bgImage: "/images/axar.png",
//   },
//   {
//     name: "Kuldeep Yadav",
//     key: 15,
//     dreamPoints: 90,
//     type: "Bowler",
//     profileImage: "/images/kuldeep.png",
//     bgImage: "/images/kuldeep.png",
//   },
//   {
//     name: "Deepak Chahar",
//     key: 16,
//     dreamPoints: 85,
//     type: "Bowler",
//     profileImage: "/images/chahar.png",
//     bgImage: "/images/chahar.png",
//   },
//   {
//     name: "Washington Sundar",
//     key: 17,
//     dreamPoints: 88,
//     type: "All-Rounder",
//     profileImage: "/images/sundar.png",
//     bgImage: "/images/sundar.png",
//   },
//   {
//     name: "Ishan Kishan",
//     key: 18,
//     dreamPoints: 92,
//     type: "Wicket-Keeper",
//     profileImage: "/images/ishan.png",
//     bgImage: "/images/ishan.png",
//   },
//   {
//     name: "Shardul Thakur",
//     key: 19,
//     dreamPoints: 91,
//     type: "Bowler",
//     profileImage: "/images/shardul.png",
//     bgImage: "/images/shardul.png",
//   },
//   {
//     name: "Rahul Tewatia",
//     key: 20,
//     dreamPoints: 87,
//     type: "All-Rounder",
//     profileImage: "/images/tewatia.png",
//     bgImage: "/images/tewatia.png",
//   },
//   {
//     name: "Prithvi Shaw",
//     key: 21,
//     dreamPoints: 100,
//     type: "Batsman",
//     profileImage: "/images/shaw.png",
//     bgImage: "/images/shaw.png",
//   },
//   {
//     name: "Suryakumar Yadav",
//     key: 22,
//     dreamPoints: 110,
//     type: "Batsman",
//     profileImage: "/images/surya.png",
//     bgImage: "/images/surya.png",
//   },
// ];

// const sortedPlayers = [...allPlayers].sort(
//   (a, b) => b.dreamPoints - a.dreamPoints
// );

// const initialOnFieldPlayers = sortedPlayers.slice(0, 11);
// const initialOffFieldPlayers = sortedPlayers.slice(11);

// const initialPositions = initialFieldPositions.map((position, index) => ({
//   ...position,
//   isFilled: index < initialOnFieldPlayers.length,
//   player: initialOnFieldPlayers[index] || null,
// }));

// function DragPlayerCard({ player, isDraggable = true }) {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemType.PLAYER,
//     item: player,
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={isDraggable ? drag : null}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: isDraggable ? "move" : "default",
//       }}
//     >
//       <PlayerCard {...player} />
//     </div>
//   );
// }

// function DropZone({ id, position, onDrop, currentPlayer, onRemove }) {
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: ItemType.PLAYER,
//     drop: (droppedPlayer) => onDrop(droppedPlayer, id),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className={`${styles.dropZone} ${isOver ? styles.over : ""}`}
//       style={{
//         position: "absolute",
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: "100px",
//         height: "100px",
//         border: "1px solid #ccc",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: currentPlayer ? "#f9f9f9" : "transparent",
//       }}
//     >
//       {currentPlayer ? (
//         <PlayerCard
//           {...currentPlayer}
//           isDraggable={false}
//           onRemove={() => onRemove(id)}
//         />
//       ) : (
//         <div style={{ textAlign: "center", lineHeight: "100px" }}>
//           Drop Player Here
//         </div>
//       )}
//     </div>
//   );
// }

// export default function DreamTeamGround() {
//   const [positions, setPositions] = useState(initialPositions);
//   const [offFieldPlayers, setOffFieldPlayers] = useState(
//     initialOffFieldPlayers
//   );

//   const handleDrop = (droppedPlayer, targetPositionId) => {
//     setPositions((prevPositions) =>
//       prevPositions.map((position) => {
//         if (position.id === targetPositionId) {
//           if (position.isFilled) {
//             // Swap current player with dropped player
//             setOffFieldPlayers((prev) => [...prev, position.player]);
//           }
//           return { ...position, isFilled: true, player: droppedPlayer };
//         }
//         return position;
//       })
//     );

//     setOffFieldPlayers((prev) =>
//       prev.filter((player) => player.key !== droppedPlayer.key)
//     );
//   };

//   const handleRemovePlayer = (positionId) => {
//     setPositions((prevPositions) =>
//       prevPositions.map((position) => {
//         if (position.id === positionId && position.player) {
//           setOffFieldPlayers((prev) => [...prev, position.player]);
//           return { ...position, isFilled: false, player: null };
//         }
//         return position;
//       })
//     );
//   };

//   return (
//     <div className={styles.bgImageHolder}>
//       <DndProvider backend={HTML5Backend}>
//         {positions.map((position) => (
//           <DropZone
//             key={position.id}
//             id={position.id}
//             position={{ x: position.x, y: position.y }}
//             currentPlayer={position.player}
//             onDrop={handleDrop}
//             onRemove={handleRemovePlayer}
//           />
//         ))}

//         <div className={styles.dockList}>
//           {offFieldPlayers.map((player) => (
//             <DragPlayerCard key={player.key} player={player} />
//           ))}
//         </div>
//       </DndProvider>
//     </div>
//   );
// }
