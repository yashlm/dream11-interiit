import { useDrop } from "react-dnd";
import styles from "../../css/DreamTeamGround.module.css";
import PlayerCard from "../playerCard";
import { ItemType } from "../../constants";
import { useState } from "react";

export default function DropZone({
  id,
  position,
  onDrop,
  currentPlayer,
  onRemove,
}) {
  const [isAnimating, setIsAnimating] = useState(false);

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
      style={{
        position: "absolute",
        left: `${position.x}vw`,
        top: `${position.y}vh`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentPlayer ? (
        // <PlayerCard
        //   {...currentPlayer}
        //   isDraggable={false}
        //   isInField={true}
        //   onRemove={() => onRemove(id)}
        //   styles={{

        //   }}
        // />
        <div
          className={`${styles.playerCardContainer} ${
            isOver ? styles.moveAsideAndFade : ""
          }`}
        >
          <PlayerCard
            {...currentPlayer}
            isDraggable={false}
            isInField={true}
            onRemove={() => onRemove(id)}
          />
        </div>
      ) : (
        <div className={styles.dropZone} style={{ textAlign: "center" }}>
          <p>Drop Player Here</p>
        </div>
      )}
    </div>
  );
}
