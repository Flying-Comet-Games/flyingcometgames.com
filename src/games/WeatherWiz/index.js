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
  const [levelProgress, setLevelProgress] = useState({
    matches: 0,
    negatives: 0,
    combo: 0,
    speed: 0,
    points: 0,
    long_chain: 0,
  });

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

    // Log values for debugging
    console.log("Current sum:", currentSum);
    console.log("New tile value:", tile.value);
    console.log("New sum:", newSum);

    if (newSum === 10) {
      handleMatch([...selectedTiles, { row, col, ...tile }]);
      return;
    }

    if (newSum > 10) {
      setSelectedTiles([]);
      setCurrentSum(0);
      setMessage("Too high! Try again.");
      return;
    }

    const newSelection = [...selectedTiles, { row, col, ...tile }];
    setSelectedTiles(newSelection);
    setCurrentSum(newSum);
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

    setLevelProgress((prev) => {
      const newProgress = {
        ...prev,
        matches: prev.matches + 1,
        negatives:
prev.negatives +
          (matches.some((tile) => grid[tile.row][tile.col]?.value < 0) ? 1 : 0),
        combo: Math.max(prev.combo, newCombo),
        long_chain: Math.max(prev.long_chain, matches.length),
        points: prev.points + points,
        speed: Math.min(prev.speed || 60, 60 - timeLeft),
      };

      const isGoalMet =
       newProgress[currentGoal.type.toLowerCase()] >= currentGoal.target;

      if (isGoalMet) {
        const nextLevel = gameState.currentLevel + 1;
        setGameState((prevState) => {
          const newState = {
            ...prevState,
            currentLevel: nextLevel,
            attemptsRemaining: GAME_RULES.ATTEMPTS_PER_LEVEL,
          };
          // Immediately save to ensure consistency
          saveGameState(newState);
          return newState;
        });

        // Use timeout to ensure state is updated
        setTimeout(() => {
          handleNextLevel();
        }, 500);
      }

      return newProgress;
    });

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
    setScore(0);
    setCombo(0);
    setMoveCount(0);
    setMessage("");
    setGameOver(false);
    setLevelProgress({
      matches: 0,
      negatives: 0,
      combo: 0,
      speed: 0,
      points: 0,
      long_chain: 0,
    });
  };

  const getProgressForCurrentGoal = () => {
    const { type, target } = currentGoal;
    switch (type) {
      case "MATCHES":
        return levelProgress.matches;
      case "NEGATIVES":
        return levelProgress.negativesUsed;
      case "COMBO":
        return levelProgress.maxCombo;
      case "POINTS":
        return levelProgress.points;
      case "QUICK":
        return levelProgress.matches;
      case "LONG_CHAIN":
        return levelProgress.longestChain;
      case "SPEED":
        return levelProgress.bestTime;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: COLORS.background, minHeight: "100vh" }}>
      <LevelInfo
        currentLevel={gameState.currentLevel}
        attemptsRemaining={gameState.attemptsRemaining}
        goal={currentGoal}
        levelProgress={levelProgress}
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
