import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import Tooltip from "@mui/material/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import RadarChart from "./charts/radarChart";
import "./playerCard.css";
import PlayerStatsAccordion from "./playerStats/accordian";

export default function PlayerCard({
  name,
  points,
  bgImage,
  profileImage,
  onRemove, // Adding onRemove prop for delete functionality
  onAddToField,
  type,
  isInField,
  teamIconUrl,
  team, // Determines if the player is already on the field
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
          position: "relative",
          wordWrap: "break-word",
          fontSize: "10px",
          height: "20vh",
          backgroundColor: "#333", // Dark background color for the card
          color: "#fff", // White text for dark theme
          borderRadius: "10px", // Rounded corners for a softer look
          boxShadow: 3, // Slight shadow for depth
        }}
        onClick={handleClick}
      >
        <Box sx={{ position: "relative" }}>
          {/* Card image with overlay */}
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
          {/* Avatar at the bottom-right */}
          <Avatar
            alt={name}
            src={profileImage}
            sx={{
              position: "absolute",
              bottom: 10,

              left: "auto",
              right: 10,
              width: 50,
              height: 50,
              border: "2px solid white",
              transform: "none",
            }}
          />
        </Box>
        {/* Content */}
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
                overflow: "hidden", // Hide text overflow
                whiteSpace: "nowrap", // Prevent text from wrapping
                textOverflow: "ellipsis", // Truncate text with ellipsis
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
                color: "white", // Light gray text for the points
                fontSize: "0.6rem",
                lineHeight: "0.2rem",
              }}
            >
              {points && `Dream Points: ${points}`}
            </Typography>
            <Box>
              {/* Conditionally render icons based on whether player is in the field */}
              {!isInField && (
                <IconButton
                  onClick={onAddToField}
                  sx={{ margin: 0, padding: 0, color: "#fff" }}
                >
                  <SportsCricketIcon />
                </IconButton>
              )}
              {isInField && (
                <IconButton
                  onClick={onRemove}
                  sx={{ margin: 0, padding: 0, color: "#fff" }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="player-stat-card"
            initial={{ y: "100%", opacity: 0 }} // Start off-screen at the bottom
            animate={{ y: "0%", opacity: 1 }} // Slide up to cover 90% of the page
            exit={{ y: "100%", opacity: 0 }} // Slide back down
            transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%", // Full width to cover the screen
              height: "90vh", // Covers 90% of the viewport height
              backgroundColor: "white",
              boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px 20px 0 0", // Rounded corners at the top
              textAlign: "center",
              padding: "20px",

              zIndex: 1000,
            }}
          >
            <div className="left-panel-profile">
              <div className="image-card-profile">
                <CardMedia
                  className="bg-image-profile"
                  image={bgImage}
                  title={name}
                >
                  <div className="black-cover">
                    <CardMedia
                      className="player-image-profile"
                      image={profileImage}
                    />
                    <Avatar
                      alt={team}
                      src={
                        teamIconUrl ||
                        "https://e1.pngegg.com/pngimages/534/366/png-clipart-cricket-icons-india-board-of-control-for-cricket-in-india-logo-thumbnail.png"
                      }
                      sx={{
                        height: "20vh",
                        width: "20vh",
                        color: "black",
                        position: "relative",
                        top: "5%",
                        left: "25%",
                      }}
                    ></Avatar>
                  </div>
                </CardMedia>
              </div>
              <div className="chart-profile">
                <RadarChart></RadarChart>
              </div>
            </div>
            <div className="right-panel-profile">
              <h1 className="profile-name">
                {firstName} <br />
                <span className="last-name">{lastName}</span>
              </h1>
              <button onClick={handleClick} className="remove-btn">
                <RxCross2 />
              </button>
              <PlayerStatsAccordion type={"BAtting"} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
