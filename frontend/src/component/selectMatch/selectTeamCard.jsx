import Avatar from "@mui/material/Avatar";
import { useEffect, useState, useMemo } from "react";
import "./selectTeamCard.css";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASE_URL } from "../../constants";

// Helper function to render a team icon
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

// Helper function to render the selected team card
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

// Main Team Search Component
const TeamSearchCard = ({ setTeam, moveCard, id, remove, allTeams }) => {
  const [searchTeam, setSearchTeam] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamSet, setIsTeamSet] = useState(false);
  const [allFavTeams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorite teams from the server
  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/team/teams`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.status === "ok" && Array.isArray(data.data)) {
          setTeams(data.data.map(({ name, url }) => ({ name, url })));
        } else {
          throw new Error("Failed to fetch teams");
        }
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Filtered teams based on search input and removal list
  const filteredTeams = useMemo(() => {
    return searchTeam.length === 0
      ? []
      : allTeams.filter(
          ({ name }) =>
            name.toLowerCase().includes(searchTeam.toLowerCase()) &&
            !remove.includes(name)
        );
  }, [searchTeam, allTeams, remove]);

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
        key={team.name}
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
            placeholder={remove == "" ? `Select your team` : `${remove} vs`}
            onChange={(e) => setSearchTeam(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
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
            maxHeight: "60vh",
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isTeamSet ? (
        <>
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
