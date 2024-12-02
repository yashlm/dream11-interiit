
// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CircularProgress from "@mui/material/CircularProgress";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { BASE_URL } from "../../constants";
// function sleep(duration) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, duration);
//   });
// }

// export default function PlayerSearch({ teamA, teamB, onAddToTeam }) {
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);

//   const fetchPlayers = async (teamName) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/player/search_players/${teamName}`
//       );
//       const data = await response.json();
//       if (data.status === "ok") {
//         return data.players.map((player) => ({
//           name: player.full_name,
//           key: player.key_cricinfo,
//           dreamPoints: Math.floor(Math.random() * 100), // Random points for demonstration
//           type: player.playing_role,
//           profileImage: player.img_src_url,
//           bgImage: player.bg_image_url,
//         }));
//       }
//     } catch (error) {
//       console.error("Failed to fetch players:", error);
//       return [];
//     }
//   };

//   const handleOpen = () => {
//     setOpen(true);
//     (async () => {
//       setLoading(true);
//       await sleep(500); // Simulated loading
//       const playersTeamA = await fetchPlayers(teamA);
//       const playersTeamB = await fetchPlayers(teamB);
//       setOptions([...playersTeamA, ...playersTeamB]); // Combine players from both teams
//       setLoading(false);
//     })();
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setOptions([]);
//   };

//   return (
//     <Autocomplete
//       sx={{ width: 400 }}
//       open={open}
//       onOpen={handleOpen}
//       onClose={handleClose}
//       disableCloseOnSelect
//       isOptionEqualToValue={(option, value) => option.name === value.name}
//       getOptionLabel={(option) => option.name}
//       options={options}
//       loading={loading}
//       renderOption={(props, option) => (
//         <Box
//           component="li"
//           {...props}
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             py: 1,
//             px: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               src={option.profileImage}
//               alt={option.name}
//               sx={{ width: 40, height: 40, marginRight: 2 }}
//             />
//             <Box>
//               <div style={{ fontSize: "16px", fontWeight: "bold" }}>
//                 {option.name}
//               </div>
//               <div style={{ fontSize: "15px", color: "gray" }}>
//                 {option.type}
//               </div>
//               <div style={{ fontSize: "12px", color: "gray" }}>
//                 Dream Points: {option.dreamPoints}
//               </div>
//             </Box>
//           </Box>
//           <Box sx={{ display: "flex", gap: 1 }}>
//             <Button
//               variant="contained"
//               size="small"
//               sx={{ textTransform: "none" }}
//               onClick={(event) => {
//                 event.stopPropagation();
//                 onAddToTeam(option, "A");
//               }}
//             >
//               Add to Team A
//             </Button>
//             <Button
//               variant="contained"
//               size="small"
//               sx={{ textTransform: "none" }}
//               onClick={(event) => {
//                 event.stopPropagation();
//                 onAddToTeam(option, "B");
//               }}
//             >
//               Add to Team B
//             </Button>
//           </Box>
//         </Box>
//       )}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Search Players"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// }




import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { BASE_URL } from "../../constants";

export default function PlayerSearch({ teamA, teamB, onAddToTeam }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [buttonLoading, setButtonLoading] = React.useState(null);

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
    setButtonLoading({ ...buttonLoading, [team]: true });
    setTimeout(() => {
      onAddToTeam(player, team);
      setButtonLoading({ ...buttonLoading, [team]: false });
    }, 1000);
  };

  return (
    <Autocomplete
      sx={{ width: 400 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            px: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={(event) => {
                event.stopPropagation();
                handleAddToTeam(option, "A");
              }}
              disabled={buttonLoading?.A}
            >
              {buttonLoading?.A ? <CircularProgress color="inherit" size={20} /> : "Add to Team A"}
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={(event) => {
                event.stopPropagation();
                handleAddToTeam(option, "B");
              }}
              disabled={buttonLoading?.B}
            >
              {buttonLoading?.B ? <CircularProgress color="inherit" size={20} /> : "Add to Team B"}
            </Button>
          </Box>
        </Box>
      )}
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
