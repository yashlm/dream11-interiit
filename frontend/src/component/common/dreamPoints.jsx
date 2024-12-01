import React from "react";
import { LuCoins } from "react-icons/lu";

const DreamPointsCard = ({ points }) => (
  <div
    className="bg-transparent z-5 rounded-md shadow-lg px-0 py-4 my-auto"
    style={{ backgroundColor: "transparent" }}
  >
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-row justify-between">
        <LuCoins
          style={{ fontSize: "40px", marginRight: "5px", color: "goldenrod" }}
        />
        <p className="text-white text-lg font-bold">Dream Score</p>
      </div>
      <p className="text-4xl font-bold text-orange-500">{points}</p>
    </div>
  </div>
);

export default DreamPointsCard;
