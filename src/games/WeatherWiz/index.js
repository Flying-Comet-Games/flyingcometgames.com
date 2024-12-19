// src/components/WeatherWhiz/index.js

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import {
  COLORS,
  GAME_RULES,
  LEVEL_GOALS,
  TARGET_NUMBER,
  COMBO_TIME_WINDOW,
} from "./types";
import {
  initializeGrid,
  loadGameState,
  saveGameState,
  calculateScore,
  checkLevelGoal,
  isAdjacent,
  applyGravity,
  calculatePoints,
  generateMatchMessage,
} from "./utils";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import LevelInfo from "./Levelnfo";

const WeatherWhiz = () => {
  const [gameState, setGameState] = useState(() => loadGameState());
  const [grid, setGrid] = useState(() =>
    initializeGrid(gameState.currentLevel)
  );
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState(0);
  const [negativesUsed, setNegativesUsed] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [lastMatchTime, setLastMatchTime] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const currentGoal =
    LEVEL_GOALS[(gameState.currentLevel - 1) % LEVEL_GOALS.length];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMaxCombo((prev) => Math.max(prev, combo));
  }, [combo]);

  const handleGameOver = () => {
    const finalScore = calculateScore({ matches, timeLeft, moveCount });
    const currentGoal =
      LEVEL_GOALS[(gameState.currentLevel - 1) % LEVEL_GOALS.length];
    const goalCompleted = checkLevelGoal(
      { matches, negativesUsed, maxCombo, score: finalScore, timeLeft },
      currentGoal
    );

    const newGameState = {
      ...gameState,
      attemptsRemaining: gameState.attemptsRemaining - 1,
      highScores: [...gameState.highScores, finalScore]
        .sort((a, b) => b - a)
        .slice(0, 5),
    };

    if (finalScore >= GAME_RULES.MAX_POINTS) {
      newGameState.perfectScores++;
    }

    if (goalCompleted && finalScore >= GAME_RULES.MIN_SCORE_TO_ADVANCE) {
      newGameState.currentLevel++;
    }

    setGameOver(true);
    saveGameState(newGameState);
    setGameState(newGameState);
  };

  const handleLevelComplete = (finalScore) => {
    if (finalScore >= GAME_RULES.MIN_SCORE_TO_ADVANCE) {
      setGameState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        attemptsRemaining: GAME_RULES.ATTEMPTS_PER_LEVEL,
      }));
      handleNextLevel();
    }
  };

  const handleTileClick = (row, col) => {
    if (gameOver || !grid[row][col]) return;

    const tile = grid[row][col];
    setMoveCount((prev) => prev + 1);

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

    if (
      newSum === TARGET_NUMBER ||
      (tile.value === "wild" && newSelection.length >= 3)
    ) {
      handleMatch(newSelection);
    }
  };

  const handleMatch = (matches) => {
    const now = Date.now();
    const newCombo =
    lastMatchTime && now - lastMatchTime < COMBO_TIME_WINDOW
        ? Math.min(combo + 1, 5)
        : 1;

    const points = calculatePoints(matches.length, newCombo);
    setScore((prev) => prev + points);
    setCombo(newCombo);
    setLastMatchTime(now);
    setMatches((prev) => prev + 1);
    setMessage(generateMatchMessage(points, newCombo));

    // Count negatives used in this match
    const newNegativesUsed = matches.reduce(
      (count, tile) => count + (grid[tile.row][tile.col]?.value < 0 ? 1 : 0),
      0
    );

    setNegativesUsed((prev) => prev + newNegativesUsed);

    // Check goal completion
    const currentGameState = {
      matches: matches.length,
      score,
      negativesUsed: negativesUsed + newNegativesUsed,
      maxCombo,
      timeLeft,
      selectedTiles: matches,
    };

    const goalMet = checkLevelGoal(currentGameState, currentGoal);

    if (goalMet && score >= GAME_RULES.MIN_SCORE_TO_ADVANCE) {
      setGameState((prev) => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        attemptsRemaining: GAME_RULES.ATTEMPTS_PER_LEVEL,
      }));
      handleNextLevel();
    }

    // Update grid with animation delay
    setTimeout(() => {
      const newGrid = [...grid];
      matches.forEach(({ row, col }) => {
        newGrid[row][col] = null;
      });

      const updatedGrid = applyGravity(newGrid);
      setGrid(updatedGrid);
      setSelectedTiles([]);
      setCurrentSum(0);
    }, 500);
  };

  const handleNextLevel = () => {
    setGrid(initializeGrid(gameState.currentLevel));
    setTimeLeft(60);
    setMatches(0);
    setNegativesUsed(0);
    setMaxCombo(0);
    setMoveCount(0);
    setMessage("");
    setGameOver(false);
    setScore(0);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: COLORS.background, minHeight: "100vh" }}>
      <LevelInfo
        currentLevel={gameState.currentLevel}
        attemptsRemaining={gameState.attemptsRemaining}
        goal={LEVEL_GOALS[(gameState.currentLevel - 1) % LEVEL_GOALS.length]}
      />

      <GameControls
        timeLeft={timeLeft}
        score={score}
        currentSum={currentSum}
        combo={combo}
        message={message}
        matches={matches}
        targetNumber={TARGET_NUMBER}
      />

      <GameBoard
        grid={grid}
        selectedTiles={selectedTiles}
        onTileClick={handleTileClick}
      />

      {gameOver && (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Level {gameState.currentLevel} Complete!
          </Typography>
          {gameState.attemptsRemaining > 0 ? (
            <Button
              variant="contained"
              onClick={handleNextLevel}
              sx={{ mt: 1 }}
            >
              Try Again ({gameState.attemptsRemaining} attempts left)
            </Button>
          ) : (
            <Typography>No attempts remaining. Come back next hour!</Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default WeatherWhiz;
