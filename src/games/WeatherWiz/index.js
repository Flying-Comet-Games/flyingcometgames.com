// src/components/WeatherWhiz/index.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { COLORS, GRID_SIZE, GAME_DURATION, TARGET_NUMBER, COMBO_TIME_WINDOW } from './types';
import { initializeGrid, isAdjacent, applyGravity, generateMatchMessage, calculatePoints } from './utils';
import GameBoard from './GameBoard';
import GameControls from './GameControls';

const WeatherWhiz = () => {
  const [grid, setGrid] = useState(() => initializeGrid());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastMatchTime, setLastMatchTime] = useState(null);
  const [message, setMessage] = useState("Match tiles to make 10!");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTileClick = (row, col) => {
    if (gameOver || !grid[row][col]) return;

    const tile = grid[row][col];

    if (selectedTiles.length === 0) {
      setSelectedTiles([{ row, col, ...tile }]);
      setCurrentSum(tile.value === "wild" ? 0 : tile.value);
      return;
    }

    if (selectedTiles.some((t) => t.row === row && t.col === col)) return;

    const lastTile = selectedTiles[selectedTiles.length - 1];
    if (!isAdjacent(lastTile, { row, col })) {
      setMessage("Select adjacent tiles!");
      return;
    }

    const newSum = tile.value === "wild" ? currentSum : currentSum + tile.value;

    if (newSum > TARGET_NUMBER && tile.value !== "wild") {
      setSelectedTiles([]);
      setCurrentSum(0);
      setMessage("Too high! Try again.");
      return;
    }

    const newSelection = [...selectedTiles, { row, col, ...tile }];
    setSelectedTiles(newSelection);
    setCurrentSum(newSum);

    if (newSum === TARGET_NUMBER || (tile.value === "wild" && newSelection.length >= 3)) {
      handleMatch(newSelection);
    }
  };

  const handleMatch = (matches) => {
    const now = Date.now();
    const newCombo = lastMatchTime && now - lastMatchTime < COMBO_TIME_WINDOW
      ? Math.min(combo + 1, 5)
      : 1;

    const points = calculatePoints(matches.length, newCombo);

    setCombo(newCombo);
    setLastMatchTime(now);
    setScore((prev) => prev + points);
    setMessage(generateMatchMessage(points, newCombo));

    const newGrid = [...grid];
    matches.forEach(({ row, col }) => {
      newGrid[row][col] = null;
    });

    const updatedGrid = applyGravity(newGrid);
    setGrid(updatedGrid);
    setSelectedTiles([]);
    setCurrentSum(0);
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        maxWidth: "600px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          textAlign: "center",
          color: COLORS.text,
          fontSize: { xs: "1.75rem", sm: "2.125rem" },
        }}
      >
        Weather Whiz
      </Typography>

      <GameControls
        timeLeft={timeLeft}
        score={score}
        currentSum={currentSum}
        targetNumber={TARGET_NUMBER}
        combo={combo}
        message={message}
      />

      <GameBoard
        grid={grid}
        selectedTiles={selectedTiles}
        onTileClick={handleTileClick}
      />

      {gameOver && (
        <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Game Over! Score: {score}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ backgroundColor: COLORS.primary }}
          >
            Play Again
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default WeatherWhiz;