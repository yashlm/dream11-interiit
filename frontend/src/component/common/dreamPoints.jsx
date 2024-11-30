import React from "react";
import { LuCoins } from "react-icons/lu";
import { Card } from "antd";

const DreamPointsCard = ({ points }) => (
  <Card
    style={{
      backgroundColor: "transparent",
    }}
    styles={{
      header: {
        padding: "1px",
        alignItems: "center",
      },
      title: {
        color: "white",
        fontSize: "17px",
        padding: "0",
        margin: "0", // Remove any margin for the title
      },
      body: {
        color: "rgb(253 186 116)",
        paddingTop: "10px",

        border: "none", // Remove border from body
      },
    }}
    title={
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LuCoins
          style={{ fontSize: "20px", marginRight: "5px", color: "goldenrod" }}
        />
        <span>Dream Score</span>
      </div>
    }
  >
    <div className="flex flex-row justify-evenly p-0">
      <p className="text-4xl mt-2">{points}</p>
    </div>
  </Card>
);

export default DreamPointsCard;
