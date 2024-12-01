import Avatar from "@mui/material/Avatar";
// import Fuse from "fuse.js";
import { useState } from "react";
import "./selectTeamCard.css";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const teamIcon = (url, name) => {
  return (
    <div key={name} className="team-icon">
      <Avatar
        alt={name}
        src={url}
        sx={{
          height: "auto", // Fix the height
          width: "75px", // Allow natural width
          variant: "square", // Prevent circular shape
        }}
      />
      <p>{name}</p>
    </div>
  );
};


const selectedTeamCard = (imageUrl, teamName, onClose) => {
  return (
    <div
      className="selected-team-card"
      style={{
        width: "70%",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="glass-overlay">
        <div
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <FaTimes size={20} color="black" />
        </div>

        <Avatar
          alt={teamName}
          src={imageUrl}
          style={{
            height: "auto",
            width: "250px", 
            variant: "rectangle", 
          }}
        />
        <h2 className="team-name-title">{teamName}</h2>
      </div>
    </div>
  );
};


const allFavTeams = [
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
  {
    name: "India",
    imageUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "Australia",
    imageUrl: "https://example.com/australia-logo.png",
  },
  {
    name: "England",
    imageUrl: "https://example.com/england-logo.png",
  },
  {
    name: "New Zealand",
    imageUrl: "https://example.com/nz-logo.png",
  },
];

const TeamSearchCard = ({ setTeam, moveCard, id, remove, allTeams }) => {
  const [searchTeam, setSearchTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamSet, setIsTeamSet] = useState(false);

  const teams = allTeams.filter((item) => !remove.includes(item.name));
  const favTeams = allFavTeams.filter((item) => !remove.includes(item.name));

  const deselectTeam = () => {
    setTeam("");
    moveCard(false);
    setIsTeamSet(false);
    setSelectedTeam(null);
  };

  const selectTeamIcon = (team) => {
    return (
      <div
        key={name}
        onClick={() => {
          setTeam(team);
          moveCard(true);
          setIsTeamSet(true);
          setSelectedTeam(team);
        }}
      >
        {teamIcon(team.url, team.name)}
      </div>
    );
  };

  const searchDiv = () => {
    return (
      <div className="search-card" id={id}>
        <div className="search-bar">
          <TextField
            variant="outlined"
            fullWidth
            value={searchTeam}
            placeholder={remove === "" ? `Select your team` : `${remove} vs`}
            onChange={(e) => setSearchTeam(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        {filteredTeams.length === 0 && searchTeam.length > 0 && (
          <p className="no-teams-error">
            No teams found, here are your favourite teams:
          </p>
        )}
        {filteredTeams.length === 0 && searchTeam.length === 0 && (
          <p className="fav-teams-title">My Teams</p>
        )}
        <div
          className="teams-grid"
          style={{
            maxHeight: "60vh", // Limits the height to 60% of the viewport
            overflowY: "auto", // Enables scrolling
          }}
        >
          {filteredTeams.length > 0
            ? filteredTeams.map((team) => selectTeamIcon(team))
            : favTeams.map((team) => selectTeamIcon(team))}
        </div>
      </div>
    );
  };


  const filteredTeams =
    searchTeam.length == 0
      ? []
      : teams.filter((team) =>
        team.name.toLowerCase().includes(searchTeam.toLowerCase())
      );

  return (
    <div>
      {isTeamSet ? (
        <>
          {/* Fade-out Search Div */}
          <motion.div
            key="searchDiv"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, visibility: "hidden", scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {searchDiv()}
          </motion.div>

          {/* Fade-in Selected Team Card */}
          <motion.div
            key="selectedTeamCard"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {selectedTeamCard(
              selectedTeam.url,
              selectedTeam.name,
              deselectTeam
            )}
          </motion.div>
        </>
      ) : (
        <motion.div
          key="searchDiv"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          {searchDiv()}
        </motion.div>
      )}
    </div>
  );
};

export default TeamSearchCard;
