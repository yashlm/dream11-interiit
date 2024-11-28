import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import PlayerSearch from "../component/PlayerSearch";
import PlayerCard from "../component/playerCard";
import Navbar from "../header/Navbar";
import bgImage from '../assets/image1.png';

export default function CustomMatch() {
  const [teamA, setTeamA] = useState(Array(11).fill(null));
  const [teamB, setTeamB] = useState(Array(11).fill(null));
  const [alert, setAlert] = useState({ message: "", severity: "", show: false }); 

  const handleAddToTeam = (player, team) => {
    const isPlayerInTeamA = teamA.some((p) => p && p.key === player.key);
    const isPlayerInTeamB = teamB.some((p) => p && p.key === player.key);

    if (isPlayerInTeamA || isPlayerInTeamB) {
      setAlert({ message: "This player is already in a team!", severity: "info", show: true });
      return;
    }

    const updateTeam = team === "A" ? [...teamA] : [...teamB];
    const emptyIndex = updateTeam.findIndex((p) => p === null);

    if (emptyIndex !== -1) {
      updateTeam[emptyIndex] = player;
      team === "A" ? setTeamA(updateTeam) : setTeamB(updateTeam);
    } else {
      setAlert({ message: `Team ${team} is already full!`, severity: "info", show: true });
    }
  };

  const handleRemoveFromTeam = (playerKey, team) => {
    const updateTeam = team === "A" ? [...teamA] : [...teamB];
    const playerIndex = updateTeam.findIndex((p) => p && p.key === playerKey);

    if (playerIndex !== -1) {
      updateTeam[playerIndex] = null;
      team === "A" ? setTeamA(updateTeam) : setTeamB(updateTeam);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <div>
      <Navbar />

      <Box sx={{
          display: "flex",
          position: "relative", 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center", 
          
        }}>
        
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
            zIndex: 1, // Ensure the overlay is above the background
          }}
        />

        {/* Left Section */}
        <Box
          sx={{
            width: "30vw",
            background: "rgba( 255, 255, 255, 0.7 )",
            boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 19px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            marginRight: "2vw",
            marginTop: "64px",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            zIndex: 2, // Ensure this section is above the overlay
          }}
        >
          <Typography variant="h3" color="white" sx={{
              mb: 2,
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", 
              padding: "8px",
             
            }}>
            SELECT PLAYERS
          </Typography>
 <Typography variant="h6"  color="white" sx={{ mb: 2 }}>
            Select Match Type
          </Typography>
          <Select
            defaultValue=""
            variant="outlined"
            sx={{ width: "80%", marginBottom: 3 }}
          >
            <MenuItem value="Test">Test</MenuItem>
            <MenuItem value="ODI">ODI</MenuItem>
            <MenuItem value="T20">T20</MenuItem>
          </Select>

          {/* Search Component */}
          <Typography variant="h6" color="white" sx={{ mb: 1 }}>
            Search for Player
          </Typography>
          <PlayerSearch onAddToTeam={handleAddToTeam} />
          <Typography color="white" sx={{ mt: 2, mb: 2 }}>OR</Typography>
          <Button variant="contained" color="error">
            Import from CSV
          </Button>
        </Box>
        
        {/* Right Section */}
        <Box sx={{ width: "70%", padding: 3, marginTop: "64px", zIndex: 2 }}>
          {alert.show && (
            <Alert severity={alert.severity} onClose={handleCloseAlert}>
              {alert.message}
            </Alert>
          )}
          <Grid container spacing={3}>
            {/* Team A Section */}
            <Grid item xs={12}>
              <Typography variant="h5" align="center" color="white" gutterBottom>
                TEAM A
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {teamA.map((player, index) => (
                <Grid item xs={2} key={`teamA-${index}`}>
                  {player ? (
                    <PlayerCard
                      key={player.key}
                      name={player.name}
                      points={player.dreamPoints}
                      bgImage={player.bgImage}
                      profileImage={player.profileImage}
                      isInField={true}
                      onRemove={() => handleRemoveFromTeam(player.key, "A")}
                    />
                  ) : (
                    <Card
                      sx={{
                        height: "20vh",
                        width: "20vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba( 255, 255, 255, 0.45 )",
                        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                        borderRadius: "10px",
                        border: "1px solid rgba( 255, 255, 255, 0.18 )",
                      }}
                    >
                      <Typography variant="caption" color="white">
                        Player {index + 1}
                      </Typography>
                    </Card>
                  )}
                </Grid>
              ))}
            </Grid>

            {/* Team B Section */}
            <Grid item xs={12} sx={{ mt: 5 }}>
              <Typography variant="h5" align="center" color="white" gutterBottom>
                TEAM B
              </Typography>
            </Grid>
            <Grid container spacing={2}>
              {teamB.map((player, index) => (
                <Grid item xs={2} key={`teamB-${index}`}>
                  {player ? (
                    <PlayerCard
                      key={player.key}
                      name={player.name}
                      points={player.dreamPoints}
                      bgImage={player.bgImage}
                      profileImage={player.profileImage}
                      isInField={true}
                      onRemove={() => handleRemoveFromTeam(player.key, "B")}
                    />
                  ) : (
                    <Card
                      sx={{
                        height: "20vh",
                        width: "20vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba( 255, 255, 255, 0.45 )",
                        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                        borderRadius: "10px",
                        border: "1px solid rgba( 255, 255, 255, 0.18 )",
                      }}
                    >
                      <Typography variant="caption" color="white">
                        Player {index + 1}
                      </Typography>
                    </Card>
                  )}
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="error" size="large">
                Generate Team
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}