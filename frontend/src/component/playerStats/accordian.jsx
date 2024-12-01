import React, { useState, useMemo } from "react";
import RadarChartComponent from "../charts/radarChart";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import styles from "./playerStats.module.css";

const TransparentTabs = React.memo(({ inputData }) => {
  const data = Object.entries(inputData).map(([type, stats]) => ({
    label: type, // format (e.g., t20, odi) as label
    value: type.toLowerCase(), // Lowercased version of the format as value
    "Total Runs": stats.totalRuns,
    "Total Matches": stats.totalMatches,
    "Highest Score": stats.highestScore,
    "Career Strike Rate": stats.careerStrikeRate,
    "Career Avg": stats.careerAvg,
    "Last 10 Matches Avg": stats.last10Avg,
    "Last 10 Matches Strike Rate": stats.last10StrikeRate,
    "50s": stats.fifty,
    "100s": stats.hundred,
    "4s": stats.fours,
    "6s": stats.sixes,
    Stumpings: stats.stumpings,
    Catches: stats.catches,
    chartData: {
      Adaptability: stats.adaptability,
      Consistency: stats.battingConsistency,
      Form: stats.battingForm,
      FieldingPerformance: stats.fieldingPerformance,
      Experience: stats.match,
    },
  }));
  return (
    <Tabs value="test">
      <TabsHeader
        className={`bg-transparen max-w-[40rem]  ${styles.tabHeader}`}
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ label, value, chartData, ...otherStats }) => (
          <TabPanel key={value} value={value}>
            <div className="flex space-x-6 overflow-auto">
              {/* Stats Columns */}
              <div className="flex flex-wrap w-1/2">
                {/* Iterate over stats and display them in 3 columns */}
                {Object.entries(otherStats)
                  .reduce((result, [statLabel, statValue], index) => {
                    const chunkIndex = Math.floor(index / 3); // Calculate which chunk this entry belongs to
                    if (!result[chunkIndex]) {
                      result[chunkIndex] = []; // Initialize a new chunk
                    }
                    result[chunkIndex].push([statLabel, statValue]); // Add the entry to the appropriate chunk
                    return result;
                  }, [])
                  .map((chunk, chunkIndex) => (
                    <div
                      key={chunkIndex}
                      className="flex space-x-4 w-full mb-4"
                    >
                      {chunk.map(([statLabel, statValue]) => (
                        <div key={statLabel} className="w-1/3">
                          <div className="text-lg font-bold text-left pl-7">
                            {statValue}
                          </div>
                          <div className="text-base text-left pl-8 ">
                            {statLabel}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>

              {/* Radar Chart Component */}
              <div className="w-1/2 flex flex-col justify-center  h-auto">
                <h5>Player Performance</h5>
                <RadarChartComponent fields={chartData} />
              </div>
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
});

const PlayerStatsAccordion = ({ playerType }) => {
  const batData = {
    test: {
      totalRuns: 3500,
      totalMatches: 50,
      highestScore: 180,
      careerStrikeRate: 75.5,
      careerAvg: 45.6,
      last10Avg: 42.3,
      last10StrikeRate: 72.0,
      fifty: 8,
      hundred: 5,
      fours: 240,
      sixes: 45,
      stumpings: 1,
      catches: 42,
      adaptability: 8,
      battingConsistency: 7,
      battingForm: 8,
      fieldingPerformance: 7.5,
      match: 5,
    },
    odi: {
      totalRuns: 1200,
      totalMatches: 40,
      highestScore: 130,
      careerStrikeRate: 85.5,
      careerAvg: 38.7,
      last10Avg: 36.8,
      last10StrikeRate: 83.4,
      fifty: 10,
      hundred: 2,
      fours: 150,
      sixes: 20,
      stumpings: 0,
      catches: 30,
      adaptability: 7,
      battingConsistency: 6.8,
      battingForm: 7,
      fieldingPerformance: 7.2,
      match: 5,
    },
    mdm: {
      totalRuns: 550,
      totalMatches: 30,
      highestScore: 95,
      careerStrikeRate: 72.3,
      careerAvg: 32.4,
      last10Avg: 30.0,
      last10StrikeRate: 70.5,
      fifty: 4,
      hundred: 1,
      fours: 85,
      sixes: 15,
      stumpings: 1,
      catches: 25,
      adaptability: 6,
      battingConsistency: 6.2,
      battingForm: 6.5,
      fieldingPerformance: 6.0,
      match: 5,
    },
    it20: {
      totalRuns: 750,
      totalMatches: 18,
      highestScore: 120,
      careerStrikeRate: 140.1,
      careerAvg: 48.9,
      last10Avg: 45.0,
      last10StrikeRate: 145.3,
      fifty: 5,
      hundred: 1,
      fours: 90,
      sixes: 25,
      stumpings: 0,
      catches: 10,
      adaptability: 8.5,
      battingConsistency: 7.9,
      battingForm: 8,
      fieldingPerformance: 7.0,
      match: 5,
    },
    t20: {
      totalRuns: 950,
      totalMatches: 25,
      highestScore: 160,
      careerStrikeRate: 138.7,
      careerAvg: 41.5,
      last10Avg: 40.8,
      last10StrikeRate: 142.6,
      fifty: 7,
      hundred: 3,
      fours: 110,
      sixes: 35,
      stumpings: 2,
      catches: 15,
      adaptability: 7.8,
      battingConsistency: 8.5,
      battingForm: 8.0,
      fieldingPerformance: 7.3,
      match: 5,
    },
    odm: {
      totalRuns: 1150,
      totalMatches: 22,
      highestScore: 145,
      careerStrikeRate: 130.0,
      careerAvg: 40.1,
      last10Avg: 39.2,
      last10StrikeRate: 132.1,
      fifty: 9,
      hundred: 3,
      fours: 130,
      sixes: 28,
      stumpings: 0,
      catches: 22,
      adaptability: 7.4,
      battingConsistency: 7.0,
      battingForm: 7.5,
      fieldingPerformance: 7.8,
      match: 5,
    },
  };
  const [expanded, setExpanded] = useState("batting");

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
          <TransparentTabs inputData={batData} />
          {/* <h1>hi</h1> */}
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
          <TransparentTabs inputData={batData} />
          {/* <h1>hi</h1> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PlayerStatsAccordion;
