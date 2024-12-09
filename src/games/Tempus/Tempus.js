import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  getQuestionsForDate,
  getLatestItems,
} from "./Data";
import BaseTempus from "./BaseTempus";

const Tempus = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [gameData, setGameData] = useState(null);

  // Initialize with latest available date
  useEffect(() => {
    console.log("initialize items");
    const latestData = getLatestItems();
    setGameData(latestData);
  }, []);

  // Update items when date changes
  useEffect(() => {
    if (!currentDate) return;

    console.log("grabbing daily items");
    const dailyData = getLatestItems();
    setGameData(dailyData);
  }, [currentDate]);

  if (!gameData || !gameData.items) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">No content available right now.</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Check back later for new challenges!
        </Typography>
      </Box>
    );
  }

  return (
    <BaseTempus
      title={gameData.theme}
      items={gameData.items}
      topic="tempus"
      shareText="Tempus Time Game"
      shareUrl="https://flyingcometgames.com/tempus"
    />
  );
};

export default Tempus;