export default cleanPlayerType = (player_type) => {
  const mapping = {
    "Batting Allrounder": "bat",
    "Wicketkeeper Batter": "keeper",
    "Bowling Allrounder": "ball",
    "Middle order Batter": "bat",
    Batter: "bat",
    "Top order Batter": "bat",
    Bowler: "ball",
    Allrounder: "bat",
    "Opening Batter": "bat",
    Wicketkeeper: "keeper",
  };
  return mapping[player_type];
};
