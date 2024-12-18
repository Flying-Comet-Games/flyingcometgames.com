import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const GRID_SIZE = 6;
const GAME_DURATION = 60;
const TARGET_NUMBER = 10;
const COMBO_TIME_WINDOW = 2000;

const COLORS = {
  primary: "#2C5784",
  accent: "#7BA7BC",
  background: "#E8F1F2",
  text: "#1B3B5A"
};

const TILES = {
  RAINDROP: {
    symbol: "💧",
    getRandomValue: () => Math.floor(Math.random() * 5) + 1
  },
  UMBRELLA: {
    symbol: "☔️",
    getRandomValue: () => -(Math.floor(Math.random() * 3) + 1)
  },
  LIGHTNING: {
    symbol: "⚡️",
    value: "wild",
    probability: 0.1
  }
};

const RainCounter = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastMatchTime, setLastMatchTime] = useState(null);
  const [message, setMessage] = useState("Match tiles to make 10!");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGrid();
    const timer = setInterval(() => {
      setTimeLeft(prev => {
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
      Array(GRID_SIZE).fill().map(() => {
        const isUmbrella = Math.random() < 0.3;
        const type = isUmbrella ? 'UMBRELLA' : 'RAINDROP';
        return {
          type,
          value: TILES[type].getRandomValue(),
          symbol: TILES[type].symbol,
          key: Math.random()
        };
      })
    );
    setGrid(newGrid);
  };

  const isAdjacent = (tile1, tile2) => {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  const handleTileClick = (row, col) => {
    if (gameOver || !grid[row][col]) return;

    const tile = grid[row][col];

    if (selectedTiles.length === 0) {
      setSelectedTiles([{ row, col, ...tile }]);
      setCurrentSum(tile.value === "wild" ? 0 : tile.value);
      return;
    }

    if (selectedTiles.some(t => t.row === row && t.col === col)) {
      return;
    }

    const lastTile = selectedTiles[selectedTiles.length - 1];
    if (!isAdjacent(lastTile, { row, col })) {
      setMessage("Select adjacent tiles!");
      return;
    }

    const newSum = tile.value === "wild"
      ? currentSum
      : currentSum + tile.value;

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
    if (lastMatchTime && (now - lastMatchTime) < COMBO_TIME_WINDOW) {
      setCombo(prev => prev + 1);
    } else {
      setCombo(1);
    }
    setLastMatchTime(now);

    const basePoints = Math.max(matches.length * 100, 100);
    const comboMultiplier = Math.min(combo, 5);
    const points = basePoints * comboMultiplier;

    setScore(prev => prev + points);
    setMessage(`+${points} points! ${combo > 1 ? `${combo}x Combo!` : ''}`);

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

      for (let row = emptyRow; row >= 0; row--) {
        const shouldAddLightning = Math.random() < TILES.LIGHTNING.probability && combo > 2;
        if (shouldAddLightning) {
          newGrid[row][col] = {
            type: 'LIGHTNING',
            value: 'wild',
            symbol: TILES.LIGHTNING.symbol,
            key: Math.random()
          };
        } else {
          const isUmbrella = Math.random() < 0.3;
          const type = isUmbrella ? 'UMBRELLA' : 'RAINDROP';
          newGrid[row][col] = {
            type,
            value: TILES[type].getRandomValue(),
            symbol: TILES[type].symbol,
            key: Math.random()
          };
        }
      }
    }

    setGrid(newGrid);
  };

  return (
    <Box sx={{
      p: { xs: 1, sm: 2 },
      backgroundColor: COLORS.background,
      minHeight: "100vh",
      maxWidth: "600px",
      mx: "auto"
    }}>
      <Typography variant="h4" sx={{
        mb: 2,
        textAlign: "center",
        color: COLORS.text,
        fontSize: { xs: '1.75rem', sm: '2.125rem' }
      }}>
        Rain Counter
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}>
          <Typography>Time: {timeLeft}s</Typography>
          <Typography>Score: {score}</Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{
            textAlign: "center",
            fontSize: { xs: '1.125rem', sm: '1.25rem' }
          }}>
            Sum: {currentSum} / {TARGET_NUMBER}
            {combo > 1 && <span> • {combo}x Combo!</span>}
          </Typography>
        </Box>
        <Typography sx={{
          textAlign: "center",
          color: COLORS.primary,
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}>
          {message}
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 1, sm: 2 },
          mb: 2,
          aspectRatio: '1',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white'
        }}
      >
        <Box sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: { xs: '4px', sm: '8px' },
          width: '100%',
          height: '100%',
        }}>
          {grid.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <Button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
                sx={{
                  width: '100%',
                  height: '100%',
                  minWidth: 'unset',
                  p: 0,
                  backgroundColor: selectedTiles.some(
                    t => t.row === rowIndex && t.col === colIndex
                  ) ? COLORS.accent : "white",
                  position: "relative",
                  border: '1px solid rgba(0,0,0,0.1)',
                  "&:hover": {
                    backgroundColor: selectedTiles.some(
                      t => t.row === rowIndex && t.col === colIndex
                    ) ? COLORS.accent : COLORS.background
                  }
                }}
              >
                {tile && (
                  <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: '100%'
                  }}>
                    <span style={{
                      fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                      lineHeight: 1
                    }}>
                      {tile.symbol}
                    </span>
                    <Typography sx={{
                      fontSize: 'clamp(0.8rem, 3.5vw, 0.9rem)',
                      fontWeight: "bold",
                      lineHeight: 1
                    }}>
                      {tile.value === "wild" ? "★" : tile.value}
                    </Typography>
                  </Box>
                )}
              </Button>
            ))
          )}
        </Box>
      </Paper>

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

export default RainCounter;