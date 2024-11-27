import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const data = {
  batting: {
    t20: {
      Runs: 1500,
      Avg: 45.5,
      "Strike Rate": 135,
    },
    odi: {
      Runs: 3000,
      Avg: 42.0,
      "Strike Rate": 120,
    },
    test: {
      Runs: 5000,
      Avg: 38.5,
      "Strike Rate": 75,
    },
  },
  bowling: {
    t20: {
      Wickets: 50,
      Economy: 7.2,
      "Best Bowling": "4/25",
    },
    odi: {
      Wickets: 120,
      Economy: 5.8,
      "Best Bowling": "5/30",
    },
    test: {
      Wickets: 200,
      Economy: 3.4,
      "Best Bowling": "6/40",
    },
  },
};

const PlayerStatsAccordion = ({ type }) => {
  const [selectedMode, setSelectedMode] = useState("t20"); // Default is T20
  const [selectedCategory, setSelectedCategory] = useState("batting"); // Default is Batting
  const [expanded, setExpanded] = useState(type.toLowerCase());

  const handleAccordionChange = (panel) => {
    setExpanded(expanded === panel ? null : panel); // Toggle expansion
  };

  const handleButtonClick = (category, mode) => {
    setSelectedCategory(category);
    setSelectedMode(mode);
  };

  // Function to render key-value pairs
  const renderData = (category, mode) => {
    const categoryData = data[category][mode];
    return Object.entries(categoryData).map(([key, value]) => (
      <Grid item xs={4} key={key}>
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {key}
          </Typography>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Grid>
    ));
  };

  return (
    <div className="accordion-div">
      <Accordion
        expanded={expanded === "batting"}
        onChange={() => handleAccordionChange("batting")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Batting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box mb={2}>
              <Button
                variant="contained"
                color={selectedMode === "t20" ? "primary" : "default"}
                onClick={() => handleButtonClick("batting", "t20")}
              >
                T20s
              </Button>
              <Button
                variant="contained"
                color={selectedMode === "odi" ? "primary" : "default"}
                onClick={() => handleButtonClick("batting", "odi")}
              >
                ODIs
              </Button>
              <Button
                variant="contained"
                color={selectedMode === "test" ? "primary" : "default"}
                onClick={() => handleButtonClick("batting", "test")}
              >
                Tests
              </Button>
            </Box>
            <Grid container spacing={2}>
              {renderData("batting", selectedMode)}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "bowling"}
        onChange={() => handleAccordionChange("bowling")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Bowling</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box mb={2}>
              <Button
                variant="contained"
                color={selectedMode === "t20" ? "primary" : "default"}
                onClick={() => handleButtonClick("bowling", "t20")}
              >
                T20s
              </Button>
              <Button
                variant="contained"
                color={selectedMode === "odi" ? "primary" : "default"}
                onClick={() => handleButtonClick("bowling", "odi")}
              >
                ODIs
              </Button>
              <Button
                variant="contained"
                color={selectedMode === "test" ? "primary" : "default"}
                onClick={() => handleButtonClick("bowling", "test")}
              >
                Tests
              </Button>
            </Box>
            <Grid container spacing={2}>
              {renderData("bowling", selectedMode)}
            </Grid>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PlayerStatsAccordion;
