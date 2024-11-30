import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function PlayerSearch({ onAddToTeam }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1000); // Simulated loading
      setLoading(false);
      setOptions([...players]); 
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Autocomplete
      sx={{ width: 400 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      disableCloseOnSelect // Prevent closing on selection
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
                event.stopPropagation(); // Prevent closing the dropdown
                onAddToTeam(option, "A");
              }}
            >
              Add to Team A
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={(event) => {
                event.stopPropagation(); 
                onAddToTeam(option, "B");
              }}
            >
              Add to Team B
            </Button>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Players"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

const players = [
    {
      name: "Virat Kohli",
      key: 1,
      dreamPoints: 120,
      type: "Batsman",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Rohit Sharma",
      key: 2,
      dreamPoints: 115,
      type: "Batsman",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "KL Rahul",
      key: 3,
      dreamPoints: 98,
      type: "Batsman",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Shreyas Iyer",
      key: 4,
      dreamPoints: 105,
      type: "All-Rounder",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Hardik Pandya",
      key: 5,
      dreamPoints: 110,
      type: "All-Rounder",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Rishabh Pant",
      key: 6,
      dreamPoints: 90,
      type: "Wicket-Keeper",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Ravindra Jadeja",
      key: 7,
      dreamPoints: 95,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Jasprit Bumrah",
      key: 8,
      dreamPoints: 99,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Mohammed Shami",
      key: 9,
      dreamPoints: 85,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Yuzvendra Chahal",
      key: 10,
      dreamPoints: 92,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Bhuvneshwar Kumar",
      key: 11,
      dreamPoints: 88,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Shubman Gill",
      key: 12,
      dreamPoints: 102,
      type: "Batsman",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Sanju Samson",
      key: 13,
      dreamPoints: 89,
      type: "Wicket-Keeper",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Axar Patel",
      key: 14,
      dreamPoints: 95,
      type: "All-Rounder",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Kuldeep Yadav",
      key: 15,
      dreamPoints: 90,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Deepak Chahar",
      key: 16,
      dreamPoints: 85,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Washington Sundar",
      key: 17,
      dreamPoints: 88,
      type: "All-Rounder",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Ishan Kishan",
      key: 18,
      dreamPoints: 92,
      type: "Wicket-Keeper",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Shardul Thakur",
      key: 19,
      dreamPoints: 91,
      type: "Bowler",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Rahul Tewatia",
      key: 20,
      dreamPoints: 87,
      type: "All-Rounder",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Prithvi Shaw",
      key: 21,
      dreamPoints: 100,
      type: "Batsman",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
    {
      name: "Suryakumar Yadav",
      key: 22,
      dreamPoints: 110,
      type: "Batsman",
      profileImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
      bgImage:
        "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_720/lsci/db/PICTURES/CMS/240800/240853.jpg",
    },
  ];