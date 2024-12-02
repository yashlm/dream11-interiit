import Avatar from "@mui/material/Avatar";
// import Fuse from "fuse.js";
import { useState } from "react";
import "./selectTeamCard.css";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const allFavTeams = [
  {
    name: "India",
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Cricket_India_Crest.svg/800px-Cricket_India_Crest.svg.png",
  },
  {
    name: "Australia",
    url: "https://upload.wikimedia.org/wikipedia/en/4/4f/Western_Australia_Women_Badge.png",
  },
  {
    name: "England",
    url: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/England_cricket_team_logo.svg/1200px-England_cricket_team_logo.svg.png",
  },
  {
    name: "New Zealand",
    url: "https://upload.wikimedia.org/wikipedia/en/1/19/Logo_of_cricket_New_zealand_Team.png",
  },
  {
    name: "Pakistan",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Pakistan_cricket_team_logo.png",
  },
  {
    name: "West Indies",
    url: "https://upload.wikimedia.org/wikipedia/en/9/9b/Cricket_West_Indies_Logo_2017.png",
  },
  {
    name: "Sri Lanka",
    url: "https://upload.wikimedia.org/wikipedia/en/3/32/Sri_Lanka_Cricket_Logo.jpg",
  },
  {
    name: "South Africa",
    url: "https://upload.wikimedia.org/wikipedia/en/2/29/Cricket_South_Africa_logo.png",
  },
  {
    name: "Bangladesh",
    url: "https://upload.wikimedia.org/wikipedia/en/e/ea/Bangladesh_Cricket_Board_logo.svg",
  },
  {
    name: "Afghanistan",
    url: "https://upload.wikimedia.org/wikipedia/en/5/5d/Afghanistan_cricket_team_logo.png",
  },
  {
    name: "Ireland",
    url: "https://upload.wikimedia.org/wikipedia/en/e/eb/Cricket_Ireland_logo.png",
  },
  {
    name: "Zimbabwe",
    url: "https://upload.wikimedia.org/wikipedia/en/f/fd/Zimbabwe_Cricket_Logo.png",
  },
  {
    name: "Scotland",
    url: "https://upload.wikimedia.org/wikipedia/en/a/a6/Scotland_Cricket_Team_logo.png",
  },
  {
    name: "Netherlands",
    url: "https://upload.wikimedia.org/wikipedia/en/a/a3/KNCB_Cricket_Logo.png",
  },
];  


const teamIcon = (url, name) => {
  return (
    <div key={name} className="team-icon">
      <Avatar
        alt={name}
        src={url}
        sx={{
          height: "auto",
          width: "75px",
          variant: "square",
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

        <img
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
            aria-label="Search Teams"
            //  (Loose Equality) required do not change to strict equality
            placeholder={remove == "" ? `Select your team` : `${remove} vs`}
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
            scrollBehavior:"smooth",
            maxHeight: "45vh", 
            overflowY: "auto", 
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
