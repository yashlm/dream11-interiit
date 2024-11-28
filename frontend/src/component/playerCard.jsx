import * as React from "react";
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

export default function PlayerCard({
  name,
  points,
  bgImage,
  profileImage,
  onRemove, // Adding onRemove prop for delete functionality
  onAddToField, // Adding onAddToField prop for adding to the field
  isInField, // Determines if the player is already on the field
}) {
  return (
    <Card
      sx={{
        width: "20vh",
        position: "relative",
        wordWrap: "break-word",
        fontSize: "10px",
        height: "20vh",
        backgroundColor: "black", // Dark background color for the card
        color: "#fff", // White text for dark theme
        borderRadius: "10px", // Rounded corners for a softer look
        boxShadow: 3, // Slight shadow for depth
      }}
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
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for the image
          }}
        />
        {/* Avatar at the bottom-right */}
        <Avatar
          alt={name}
          src={profileImage}
          sx={{
            position: "absolute",
            bottom: 10,
            // Center the Avatar when in the field
            left: "auto", // Center when in the field
            right: 10, // Reset right position when in the field
            width: 50,
            height: 50,
            border: "2px solid white", // White border for the avatar
            transform: "none", // Horizontally center when in the field
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
  );
}
