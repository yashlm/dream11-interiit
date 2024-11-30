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

export default function PlayerCard({
  name,
  points,
  bgImage,
  profileImage,
  onRemove,
  onAddToField,
  type,
  isInField,
  teamIconUrl,
  team,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const firstName = name
    .toUpperCase()
    .split(" ")
    .slice(0, -1)
    .join(" ");
  const lastName = name
    .toUpperCase()
    .split(" ")
    .slice(-1)
    .join(" ");

  return (
    <div>
      <Card
        sx={{
          width: "20vh",
          height: "20vh",
          position: "relative",
          wordWrap: "break-word",
          fontSize: "10px",
          backgroundColor: "#333",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: 3,
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
                color: "#fff",
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
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="p"
              sx={{
                color: "white",
                fontSize: "0.6rem",
                lineHeight: "0.2rem",
              }}
            >
              {`Dream Points: ${points || "89"}`}
            </Typography>
            <Box>
              {!isInField && (
                <IconButton
                  onClick={onAddToField}
                  sx={{ margin: 0, padding: 0, color: "#fff" }}
                >
                  <SportsCricketIcon />
                </IconButton>
              )}
            </Box>
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
        />
      )}
    </div>
  );
}
