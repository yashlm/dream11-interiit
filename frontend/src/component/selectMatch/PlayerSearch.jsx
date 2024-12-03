import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BASE_URL } from "../../constants";

export default function PlayerSearch({ teamA, teamB, onAddToTeam, assignedPlayers }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState({});

  const parsePlayers = (playersData) => {
    return Object.values(playersData).map((player) => ({
      name: player.full_name,
      key: player.key_cricinfo,
      dreamPoints: Math.floor(Math.random() * 100), // Random points for demo
      type: player.playing_role,
      profileImage: player.img_src_url,
      bgImage: player.bg_image_url,
    }));
  };

  React.useEffect(() => {
    localStorage.removeItem("teamA");
    localStorage.removeItem("teamB");

    const fetchAndStorePlayersData = async () => {
      setLoading(true);
      try {
        const responseA = await fetch(`${BASE_URL}/player/search_players/${teamA}`);
        const dataA = await responseA.json();

        const responseB = await fetch(`${BASE_URL}/player/search_players/${teamB}`);
        const dataB = await responseB.json();

        if (dataA.status === "ok" && dataB.status === "ok") {
          const playersTeamA = parsePlayers(dataA.players);
          const playersTeamB = parsePlayers(dataB.players);

          localStorage.setItem("teamA", JSON.stringify(playersTeamA));
          localStorage.setItem("teamB", JSON.stringify(playersTeamB));

          setOptions([...playersTeamA, ...playersTeamB]);
        }
      } catch (error) {
        console.error("Failed to fetch player data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndStorePlayersData();
  }, [teamA, teamB]);

  const handleOpen = () => {
    setOpen(true);

    const storedPlayersTeamA = JSON.parse(localStorage.getItem("teamA"));
    const storedPlayersTeamB = JSON.parse(localStorage.getItem("teamB"));

    if (storedPlayersTeamA && storedPlayersTeamB) {
      setOptions([...storedPlayersTeamA, ...storedPlayersTeamB]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleAddToTeam = (player, team) => {
    setButtonLoading((prevState) => ({
      ...prevState,
      [player.key]: { ...prevState[player.key], [team]: true },
    }));

    setTimeout(() => {
      onAddToTeam(player, team);
      setButtonLoading((prevState) => ({
        ...prevState,
        [player.key]: { ...prevState[player.key], [team]: false },
      }));
    }, 1000);
  };

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderOption={(props, option) => {
        const isAssigned = assignedPlayers[option.key] || false;
        return (
          <Box
            component="li"
            {...props}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1,
              px: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", textWrap:"nowrap", color:"#173bb0"}}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToTeam(option, "A");
                  }}
                  disabled={isAssigned}
                >
                  Add to A
                </Button>
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", alignItems: "center", padding:0}}>
                <Avatar
                  src={option.profileImage}
                  alt={option.name}
                  sx={{ width: 40, height: 40, marginRight: 2 }}
                />
                <Box>
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {option.name}
                  </div>
                  <div style={{ fontSize: "15px", color: "gray" }}>
                    {option.type}
                  </div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    Dream Points: {option.dreamPoints}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end", padding: 0, textWrap:"nowrap", color: "#173bb0"}}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToTeam(option, "B");
                  }}
                  disabled={isAssigned}
                >
                  Add to B
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Players"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
