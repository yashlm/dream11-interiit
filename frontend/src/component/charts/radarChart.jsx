import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RadarChart = () => {
  // Radar chart data
  const data = {
    labels: ["Speed", "Strength", "Agility", "Endurance", "Intelligence"], // 5 variables
    datasets: [
      {
        
        data: [80, 70, 90, 85, 95], // Data points for each variable
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Background color (fill)
        borderColor: "rgba(255, 99, 132, 1)", // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Radar chart options
  const options = {
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
