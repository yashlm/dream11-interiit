import { useState } from "react";
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

import styles from "./playerStats.module.css";

const PlayerStatsAccordion = ({ type, data, setType }) => {
  const [selectedCategory, setSelectedCategory] = useState("odi_bat"); // Default is Batting
  const [expanded, setExpanded] = useState(type.toLowerCase());

  const handleAccordionChange = (panel) => {
    setExpanded(expanded === panel ? null : panel); // Toggle expansion
  };

  const handleButtonClick = (category, mode) => {
    const combined = `${category}_${mode}`; // Corrected string concatenation
    setSelectedCategory(combined);
    setType(combined); // Assuming setType is passed as a prop and used elsewhere
  };

  // Function to render stats in a grid (columns of 3)
  const renderData = (category) => {
    const excludedKeys = ["chart"]; // Add other keys you want to exclude
    const categoryData = Object.entries(data[category]).filter(
      ([key]) => !excludedKeys.includes(key)
    );
    return (
      <Grid container spacing={2} className={styles.gridContainer}>
        {categoryData.map(([key, value]) => (
          <Grid item xs={4} key={key} className={styles.gridItem}>
            <Box>
              <Typography
                sx={{ fontSize: "2rem" }}
                className={styles.valueText}
              >
                {value}
              </Typography>
              <Typography className={styles.keyText}>
                {key.replace(/_/g, " ")} {/* Format key */}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div className={styles.accordionDiv}>
      {/* Batting Accordion */}
      <Accordion
        expanded={expanded === "batting"}
        onChange={() => handleAccordionChange("batting")}
        className={styles.accordionItem}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.accordionSummary}
        >
          <Typography>Batting Stats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box className={styles.buttonContainer}>
              <Button
                variant="contained"
                className={`${styles.button} ${
                  selectedCategory === "t20_bat" ? styles.activeButton : ""
                }`}
                onClick={() => handleButtonClick("t20", "bat")}
              >
                T20
              </Button>
              <Button
                variant="contained"
                className={`${styles.button} ${
                  selectedCategory === "odi_bat" ? styles.activeButton : ""
                }`}
                onClick={() => handleButtonClick("odi", "bat")}
              >
                ODI
              </Button>
              <Button
                variant="contained"
                className={`${styles.button} ${
                  selectedCategory === "test_bat" ? styles.activeButton : ""
                }`}
                onClick={() => handleButtonClick("test", "bat")}
              >
                Test
              </Button>
            </Box>
            {renderData(selectedCategory)}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Bowling Accordion */}
      <Accordion
        expanded={expanded === "bowling"}
        onChange={() => handleAccordionChange("bowling")}
        className={styles.accordionItem}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles.accordionSummary}
        >
          <Typography>Bowling Stats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box className={styles.buttonContainer}>
              <Button
                variant="contained"
                className={`${styles.button} ${
                  selectedCategory === "t20_ball" ? styles.activeButton : ""
                }`}
                onClick={() => handleButtonClick("t20", "ball")}
              >
                T20
              </Button>
              <Button
                variant="contained"
                className={`${styles.button} ${
                  selectedCategory === "odi_ball" ? styles.activeButton : ""
                }`}
                onClick={() => handleButtonClick("odi", "ball")}
              >
                ODI
              </Button>
              <Button
                variant="contained"
                className={`${styles.button} ${
                  selectedCategory === "test_ball" ? styles.activeButton : ""
                }`}
                onClick={() => handleButtonClick("test", "ball")}
              >
                Test
              </Button>
            </Box>
            {renderData(selectedCategory)}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PlayerStatsAccordion;
