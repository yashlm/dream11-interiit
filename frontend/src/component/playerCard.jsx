/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Tooltip from "@mui/material/Tooltip";
import PlayerPopOut from "./playerStats/popUp";

// Define a function to assign a consistent color to each word
const getWordColor = (word) => {
  const colors = [
    "#FF9AA2", // Medium Pink
    "#FFB07C", // Peach
    "#FFD97D", // Warm Yellow
    "#85E3B8", // Light Teal Green
    "#8EC6FF", // Light Sky Blue
    "#C4A3FF", // Soft Purple
    "#FFA3C1", // Rose Pink
    "#79D3FF", // Aqua Blue
    "#A0B9FF", // Light Cornflower Blue
    "#FFE29A", // Soft Gold
  ];
  const hash = word
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export default function PlayerCard({
  name,
  dreamPoints,
  bgImage,
  profileImage,
  onRemove,
  onAddToField,
  type,
  isInField,
  teamIconUrl,
  team,
  matchId,
  player_id,
  description,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(player_id ? !isVisible : false);
  };

  const firstName = name
    ?.toUpperCase()
    ?.split(" ")
    .slice(0, -1)
    .join(" ");
  const lastName = name
    ?.toUpperCase()
    ?.split(" ")
    .slice(-1)
    .join(" ");

  return (
    <div>
      <Card
        sx={{
          width: "20vh",
          minWidth: "100px",
          maxWidth: "200px",
          // height: "20vh",
          // minHeight: "150px",
          position: "relative",
          wordWrap: "break-word",
          fontSize: "10px",
          backgroundColor: "#DBD4D4",
          borderRadius: "10px",
          boxShadow: 3,
          cursor: onRemove ? "pointer" : null,
        }}
        onClick={handleClick}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 70, position: "relative" }}
            image={bgImage}
            title={name}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <Avatar
            alt={name}
            src={profileImage}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 50,
              height: 50,
              border: "2px solid white",
            }}
          />
          {isInField && (
            <IconButton
              onClick={onRemove}
              sx={{
                margin: 0,
                padding: 0,
                color: "#fff",
                position: "absolute",
                top: "-0.5%",
                left: "-0.5%",
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>
        <CardContent sx={{ textAlign: "left" }}>
          <Tooltip title={name} arrow>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                fontSize: "0.8rem",
                fontWeight: "800",
                // color: "#fff",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </Typography>
          </Tooltip>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "start",
                gap: "10px",
              }}
            >
              {dreamPoints && (
                <Typography
                  variant="p"
                  sx={{
                    // color: "white",
                    fontSize: "0.6rem",
                    lineHeight: "0.2rem",
                  }}
                >
                  Dream Points:
                  <span
                    style={{
                      fontSize: "1rem",
                      lineHeight: "0.2rem",
                      marginLeft: "5px",
                    }}
                  >
                    {dreamPoints}
                  </span>
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1px",
                  overflow: "hidden",
                }}
              >
                {type &&
                  type.
                    split(" ")
                    .filter((word) => word.toLowerCase() !== "order") // Exclude "order"
                    .map((word, index) => (
                      <Typography
                        key={index}
                        variant="p"
                        sx={{
                          backgroundColor: getWordColor(word), // Dynamically set the color for each word
                          display: "inline", // Ensure words are inline
                          marginRight: 1, // Add spacing between words
                          padding: 0.3,
                          border: `1px solid ${getWordColor(word)}`,
                          borderRadius: "5px",
                        }}
                      >
                        {word}
                      </Typography>
                    ))}
              </Box>
            </Box>
            <Tooltip title={"Add player to your squad"}>
              <Box>
                {!isInField && (
                  <IconButton
                    onClick={onAddToField}
                    sx={{ margin: 0, padding: 0, color: "" }}
                  >
                    <SportsCricketIcon />
                  </IconButton>
                )}
              </Box>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      {/* Use the PlayerPopOut component */}
      {isVisible && (
        <PlayerPopOut
          isVisible={isVisible}
          onClose={handleClick}
          name={name}
          bgImage={bgImage}
          profileImage={profileImage}
          teamIconUrl={teamIconUrl}
          team={team}
          firstName={firstName}
          lastName={lastName}
          matchId={matchId}
          playerId={player_id}
          description={description}
        />
      )}
    </div>
  );
}
