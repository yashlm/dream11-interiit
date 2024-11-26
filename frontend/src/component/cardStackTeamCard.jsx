import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { useState } from "react";
import "./cardStackTeamCard.css";
import { motion } from "framer-motion";

const teamIcon = (url, name) => {
  return (
    <div key={name} className="team-icon">
      <Avatar alt={name} src={url} />
      <p>{name}</p>
    </div>
  );
};

const selectedTeamCard = (imageUrl, teamName) => {
  return (
    <div
      className="selected-team-card"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="glass-overlay">
        <Avatar
          alt={teamName}
          src={imageUrl}
          style={{
            width: "120px",
            height: "120px",
            border: "4px solid white",
          }}
        />
        <h2 className="team-name-title">{teamName}</h2>
      </div>
    </div>
  );
};

const allTeams = [
  {
    name: "India",
    imageUrl: "https://example.com/india-logo.png",
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
    name: "South Africa",
    imageUrl: "https://example.com/southafrica-logo.png",
  },
  {
    name: "Pakistan",
    imageUrl: "https://example.com/pakistan-logo.png",
  },
  {
    name: "Sri Lanka",
    imageUrl: "https://example.com/srilanka-logo.png",
  },
  {
    name: "West Indies",
    imageUrl: "https://example.com/windies-logo.png",
  },
  {
    name: "Bangladesh",
    imageUrl: "https://example.com/bangladesh-logo.png",
  },
  {
    name: "Afghanistan",
    imageUrl: "https://example.com/afghanistan-logo.png",
  },
  {
    name: "Zimbabwe",
    imageUrl: "https://example.com/zimbabwe-logo.png",
  },
  {
    name: "Ireland",
    imageUrl: "https://example.com/ireland-logo.png",
  },
  {
    name: "Nepal",
    imageUrl: "https://example.com/nepal-logo.png",
  },
  {
    name: "United Arab Emirates",
    imageUrl: "https://example.com/uae-logo.png",
  },
  {
    name: "Netherlands",
    imageUrl: "https://example.com/netherlands-logo.png",
  },
  {
    name: "Scotland",
    imageUrl: "https://example.com/scotland-logo.png",
  },
  {
    name: "Kenya",
    imageUrl: "https://example.com/kenya-logo.png",
  },
  {
    name: "Canada",
    imageUrl: "https://example.com/canada-logo.png",
  },
  {
    name: "Bermuda",
    imageUrl: "https://example.com/bermuda-logo.png",
  },
  {
    name: "Namibia",
    imageUrl: "https://example.com/namibia-logo.png",
  },
];

const allFavTeams = [
  {
    name: "India",
    imageUrl:
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_160,q_50/lsci/db/PICTURES/CMS/381800/381895.png",
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

const TeamSearchCard = ({ setTeam, moveCard, id, remove }) => {
  const [searchTeam, setSearchTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamSet, setIsTeamSet] = useState(false);

  const teams = allTeams.filter((item) => !remove.includes(item.name));
  const favTeams = allFavTeams.filter((item) => !remove.includes(item.name));

  const selectTeamIcon = (url, name) => {
    return (
      <div
        key={name}
        onClick={() => {
          setTeam(name);
          moveCard(true);
          setIsTeamSet(true);
          setSelectedTeam({ name: name, imageUrl: url });
        }}
      >
        {teamIcon(url, name)}
      </div>
    );
  };

  const searchDiv = () => {
    return (
      <div className="search-card" id={id}>
        <div className="search-bar">
          <TextField
            label="Search Teams"
            variant="outlined"
            fullWidth
            value={searchTeam}
            onChange={(e) => setSearchTeam(e.target.value)}
          />
        </div>
        {/* Show the error message only when the filtered list is empty */}
        {filteredTeams.length === 0 && searchTeam.length > 0 && (
          <p className="no-teams-error">
            No teams found, here are your favourite teams:
          </p>
        )}
        {/* Show "My Teams" title if filteredTeams is empty or no search is made */}
        {filteredTeams.length === 0 && searchTeam.length === 0 && (
          <p className="fav-teams-title">My Teams</p>
        )}
        <div className="teams-grid">
          {/* Show filtered teams if available, else show favourite teams */}
          {filteredTeams.length > 0
            ? filteredTeams.map((team) =>
                selectTeamIcon(team.imageUrl, team.name)
              )
            : favTeams.map((team) => selectTeamIcon(team.imageUrl, team.name))}
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
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {selectedTeamCard(selectedTeam.imageUrl, selectedTeam.name)}
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
