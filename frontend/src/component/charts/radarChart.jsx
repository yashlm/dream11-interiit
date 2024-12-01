// import React, { useState } from "react";
// import { Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart.js components
// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// const RadarChartComponent = ({ playerData }) => {
//   const matchTypes = Object.keys(playerDataType).filter(
//     (key) => typeof playerDataType[key] === "object"
//   ); // e.g., t20, odi
//   const [activeTab, setActiveTab] = useState(matchTypes[0]);

//   const getNonNullFields = (data) => {
//     return Object.entries(data)
//       .filter(([_, value]) => value !== null && value !== "")
//       .map(([key, value]) => ({ label: key, value: parseFloat(value) }));
//   };

//   const activeData = playerDataType[activeTab];
//   const radarFields = getNonNullFields(activeData);

//   const chartData = {
//     labels: radarFields.map((field) => field.label),
//     datasets: [
//       {
//         label: `${activeTab.toUpperCase()} Performance`,
//         data: radarFields.map((field) => field.value),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       r: {
//         angleLines: { color: "rgba(0, 0, 0, 0.2)" }, // Axis lines visible
//         grid: { display: false },
//         ticks: { display: false }, // No ticks
//         suggestedMin: 0,
//         suggestedMax: 100,
//       },
//     },
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         margin: "auto",
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         borderRadius: "8px",
//         padding: "20px",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginBottom: "20px",
//         }}
//       >
//         {matchTypes.map((type) => (
//           <button
//             key={type}
//             onClick={() => setActiveTab(type)}
//             style={{
//               backgroundColor: activeTab === type ? "red" : "#f0f0f0",
//               color: activeTab === type ? "#fff" : "#000",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               marginRight: "10px",
//             }}
//           >
//             {type.toUpperCase()}
//           </button>
//         ))}
//       </div>
//       {radarFields.length > 0 ? (
//         <Radar data={chartData} options={options} />
//       ) : (
//         <p style={{ textAlign: "center", color: "#fff" }}>
//           No data available for {activeTab.toUpperCase()}
//         </p>
//       )}
//     </div>
//   );
// };

// export default RadarChartComponent;

import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChartComponent = ({ fields }) => {
  // Filter out null or empty fields
  const radarFields = Object.entries(fields)
    .filter(([_, value]) => value !== null && value !== "")
    .map(([key, value]) => ({ label: key, value: parseFloat(value) }));

  const chartData = {
    labels: radarFields.map((field) => field.label),
    datasets: [
      {
        label: "Performance", // You can modify this label if necessary
        data: radarFields.map((field) => field.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        angleLines: { color: "rgba(0, 0, 0, 0.4)" }, // Axis lines visible
        grid: { display: false },
        ticks: { display: false }, // No ticks
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  return (
    <div
      style={{
        borderRadius: "8px",
      }}
    >
      {radarFields.length > 0 ? (
        <Radar data={chartData} options={options} />
      ) : (
        <p style={{ textAlign: "center", color: "#fff" }}>
          No data available for the selected fields
        </p>
      )}
    </div>
  );
};

export default RadarChartComponent;
