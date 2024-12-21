import React from "react";
import { Box } from "@mui/material";
import { useGame } from "./hooks/useGame";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import { COLORS } from "./constants/config";
import LevelInfo from "./components/LevelInfo";

const WeatherWhiz = () => {
  const { state, currentMode, handleTileSelect, progress, stars } = useGame();

  return (
    <Box sx={{ p: 2, backgroundColor: "#f4f0df", minHeight: "100vh" }}>
      <LevelInfo
        level={state.level}
        description={currentMode.description}
        moves={state.moves}
        moveLimit={currentMode.moveLimit}
        progress={progress}
        stars={stars}
        score={state.score}
      />

      <GameControls
        score={state.score}
        timeLeft={state.timeLeft}
        currentSum={state.currentSum}
        target={currentMode.target}
      />

      <GameBoard
        grid={state.grid}
        selectedTiles={state.selectedTiles}
        onTileSelect={handleTileSelect}
      />
    </Box>
  );
};

export default WeatherWhiz;
