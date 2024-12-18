import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, LinearProgress } from "@mui/material";
import Timer from "@mui/icons-material/Timer";
import Star from "@mui/icons-material/Star";

const GRID_SIZE = 6;  // 6x6 grid is more manageable for number matching
const GAME_DURATION = 60; // 60 seconds
const TARGET_NUMBER = 10; // Players need to make combinations that sum to 10

// Possible numbers that can appear on the grid
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const PlusMinus = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(`Make ${TARGET_NUMBER}!`);

  useEffect(() => {
    initializeGrid();
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

  const initializeGrid = () => {
    const newGrid = Array(GRID_SIZE).fill().map(() =>
      Array(GRID_SIZE).fill().map(() => ({
        value: NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
        key: Math.random()
      }))
    );
    setGrid(newGrid);
  };

  const handleTileClick = (row, col) => {
    if (gameOver) return;

    const tile = grid[row][col];
    const tileKey = `${row}-${col}`;

    if (selectedTiles.some(t => t.key === tileKey)) {
      // Deselect tile
      const newSelection = selectedTiles.filter(t => t.key !== tileKey);
      setSelectedTiles(newSelection);
      setCurrentSum(newSelection.reduce((sum, t) => sum + t.value, 0));
      return;
    }

    const newSelection = [...selectedTiles, {
      row,
      col,
      value: tile.value,
      key: tileKey
    }];

    const newSum = newSelection.reduce((sum, t) => sum + t.value, 0);
    setCurrentSum(newSum);
    setSelectedTiles(newSelection);

    if (newSum === TARGET_NUMBER) {
      handleMatch(newSelection);
    } else if (newSum > TARGET_NUMBER) {
      // Reset selection if we go over
      setSelectedTiles([]);
      setCurrentSum(0);
      setMessage("Too high! Try again.");
    }
  };

  const handleMatch = (matches) => {
    const points = matches.length * 100;
    setScore(prev => prev + points);
    setMessage(`+${points} points!`);

    // Remove matched tiles and apply gravity
    const newGrid = [...grid];
    matches.forEach(({ row, col }) => {
      newGrid[row][col] = null;
    });

    applyGravity(newGrid);
    setSelectedTiles([]);
    setCurrentSum(0);
  };

  const applyGravity = (currentGrid) => {
    const newGrid = [...currentGrid];

    // Move tiles down
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptyRow = GRID_SIZE - 1;
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (newGrid[row][col] !== null) {
          if (row !== emptyRow) {
            newGrid[emptyRow][col] = newGrid[row][col];
            newGrid[row][col] = null;
          }
          emptyRow--;
        }
      }

      // Fill empty spaces with new numbers
      for (let row = emptyRow; row >= 0; row--) {
        newGrid[row][col] = {
          value: NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
          key: Math.random()
        };
      }
    }

    setGrid(newGrid);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Plus Minus
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Timer />
              <Typography>{timeLeft}s</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Star />
              <Typography>{score}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Current Sum: {currentSum} / {TARGET_NUMBER}
            </Typography>
          </Box>

          <Typography sx={{ textAlign: "center", color: "primary.main" }}>
            {message}
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, mb: 2, backgroundColor: "#fff" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gap: 1
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <Button
                  key={tile.key}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                  sx={{
                    width: "100%",
                    height: 0,
                    paddingBottom: "100%",
                    backgroundColor: selectedTiles.some(t => t.key === `${rowIndex}-${colIndex}`)
                      ? "primary.light"
                      : "background.paper",
                    border: "1px solid rgba(0,0,0,0.1)",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: selectedTiles.some(t => t.key === `${rowIndex}-${colIndex}`)
                        ? "primary.light"
                        : "action.hover"
                    }
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "1.5rem",
                      fontWeight: "bold"
                    }}
                  >
                    {tile.value}
                  </Typography>
                </Button>
              ))
            )}
          </Box>
        </Paper>

        {gameOver && (
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Time's up! Final Score: {score}
            </Typography>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Play Again
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default PlusMinus;