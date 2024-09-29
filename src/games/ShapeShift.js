import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Grid, Paper, Snackbar, IconButton, Fade, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShareIcon from '@mui/icons-material/Share';
import { logEvent, incrementGamesPlayed, incrementGamesCompleted } from '../analytics';

const GRID_SIZE = 5;
const SHAPES = ['triangle', 'square', 'circle', 'diamond'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
const GAME_DURATION = 60; // in seconds

const ShapeShift = () => {
  const theme = useTheme();
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'playing', 'gameOver'
  const [showRules, setShowRules] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCell, setSelectedCell] = useState(null);
  const [streak, setStreak] = useState(0);

  const generateSolvableGrid = () => {
    let newGrid = Array(GRID_SIZE).fill().map(() =>
      Array(GRID_SIZE).fill().map(() => ({
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.floor(Math.random() * 4) * 90,
      }))
    );

    // Guarantee an almost complete match: Create a row or column with one mismatching shape
    const isRow = Math.random() < 0.5;
    const index = Math.floor(Math.random() * GRID_SIZE);
    const matchingShape = {
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: 0,
    };

    // Set all but one cell in the row or column to the same shape and color
    for (let i = 0; i < GRID_SIZE; i++) {
      if (isRow) {
        newGrid[index][i] = { ...matchingShape };
      } else {
        newGrid[i][index] = { ...matchingShape };
      }
    }

    // Set one cell to be different, ensuring the player has to solve it
    const mismatchIndex = Math.floor(Math.random() * GRID_SIZE);
    if (isRow) {
      newGrid[index][mismatchIndex] = {
        shape: SHAPES.filter(shape => shape !== matchingShape.shape)[Math.floor(Math.random() * (SHAPES.length - 1))],
        color: COLORS.filter(color => color !== matchingShape.color)[Math.floor(Math.random() * (COLORS.length - 1))],
        rotation: 0,
      };
    } else {
      newGrid[mismatchIndex][index] = {
        shape: SHAPES.filter(shape => shape !== matchingShape.shape)[Math.floor(Math.random() * (SHAPES.length - 1))],
        color: COLORS.filter(color => color !== matchingShape.color)[Math.floor(Math.random() * (COLORS.length - 1))],
        rotation: 0,
      };
    }

    // Place matching pairs in other rows/columns to ensure solvability
    for (let i = 0; i < GRID_SIZE; i++) {
      if (i !== index) {
        const pos = Math.floor(Math.random() * (GRID_SIZE - 1));
        const matchingPair = {
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: 0,
        };
        // Place two identical shapes next to each other to ensure solvable conditions
        if (isRow) {
          newGrid[i][pos] = { ...matchingPair };
          newGrid[i][pos + 1] = { ...matchingPair };
        } else {
          newGrid[pos][i] = { ...matchingPair };
          newGrid[pos + 1][i] = { ...matchingPair };
        }
      }
    }

    return newGrid;
  };


  const isGridSolvable = (grid) => {
    // Simple check: is there at least one complete row or column that matches?
    return hasImmediateMatch(grid);
  };

  const hasImmediateMatch = (grid) => {
    // Check rows
    for (let i = 0; i < GRID_SIZE; i++) {
      if (grid[i].every(cell => cell.shape === grid[i][0].shape && cell.color === grid[i][0].color && cell.rotation === 0)) {
        return true;
      }
    }

    // Check columns
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid.every(row => row[j].shape === grid[0][j].shape && row[j].color === grid[0][j].color && row[j].rotation === 0)) {
        return true;
      }
    }

    return false;
  };

  const startNewGame = useCallback(() => {
    const newGrid = generateSolvableGrid();
    setGrid(newGrid);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    setStreak(0);
    incrementGamesPlayed('ShapeShift');
    logEvent('Game', 'Start', 'ShapeShift');
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
  }, [timeLeft, gameState]);

  const endGame = () => {
    setGameState('gameOver');
    setSnackbarMessage(`Game over! Your score: ${score}`);
    setShowSnackbar(true);
    incrementGamesCompleted('ShapeShift');
    logEvent('Game', 'Complete', 'ShapeShift', score);
  };

  const rotateShape = (row, col) => {
    if (gameState !== 'playing') return;

    const newGrid = [...grid];
    newGrid[row][col].rotation = (newGrid[row][col].rotation + 90) % 360;
    setGrid(newGrid);
    setSelectedCell({ row, col });

    setTimeout(() => {
      setSelectedCell(null);
      checkForMatches();
    }, 300);
  };

  const checkForMatches = () => {
    let matches = 0;
    const newGrid = [...grid];

    // Check rows
    for (let i = 0; i < GRID_SIZE; i++) {
      if (newGrid[i].every(cell => cell.shape === newGrid[i][0].shape && cell.color === newGrid[i][0].color && cell.rotation === 0)) {
        matches++;
        clearRow(i, newGrid);
      }
    }

    // Check columns
    for (let j = 0; j < GRID_SIZE; j++) {
      if (newGrid.every(row => row[j].shape === newGrid[0][j].shape && row[j].color === newGrid[0][j].color && row[j].rotation === 0)) {
        matches++;
        clearColumn(j, newGrid);
      }
    }

    if (matches > 0) {
      const newStreak = streak + 1;
      const points = matches * 100 * newStreak;
      setScore(prevScore => prevScore + points);
      setStreak(newStreak);
      setSnackbarMessage(`+${points} points! Streak: ${newStreak}x`);
      setShowSnackbar(true);

      // Refill cleared rows/columns
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (newGrid[i][j] === null) {
            newGrid[i][j] = {
              shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
              rotation: Math.floor(Math.random() * 4) * 90,
            };
          }
        }
      }
    } else {
      setStreak(0);
    }

    setGrid(newGrid);

    // Ensure the grid remains solvable after clearing matches
    if (!isGridSolvable(newGrid)) {
      const solvableGrid = generateSolvableGrid();
      setGrid(solvableGrid);
    }
  };

  const clearRow = (rowIndex, grid) => {
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[rowIndex][j] = null;
    }
  };

  const clearColumn = (colIndex, grid) => {
    for (let i = 0; i < GRID_SIZE; i++) {
      grid[i][colIndex] = null;
    }
  };

  const renderShape = (shape, color, rotation) => {
    const shapeStyle = {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 0.3s',
    };

    switch (shape) {
      case 'triangle':
        return (
          <div style={shapeStyle}>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderBottom: `30px solid ${color}`,
            }} />
          </div>
        );
      case 'square':
        return (
          <div style={shapeStyle}>
            <div style={{
              width: '30px',
              height: '30px',
              backgroundColor: color,
            }} />
          </div>
        );
      case 'circle':
        return (
          <div style={shapeStyle}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: color,
            }} />
          </div>
        );
      case 'diamond':
        return (
          <div style={shapeStyle}>
            <div style={{
              width: '30px',
              height: '30px',
              backgroundColor: color,
              transform: 'rotate(45deg)',
            }} />
          </div>
        );
      default:
        return null;
    }
  };

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shape Shift Score',
        text: `I scored ${score} points in Shape Shift! Can you beat my score?`,
        url: window.location.href,
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      setSnackbarMessage('Sharing is not supported on this device');
      setShowSnackbar(true);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>Shape Shift</Typography>
      
      <Fade in={showRules}>
        <Paper elevation={3} sx={{ p: 2, mb: 2, position: 'relative' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>How to Play:</Typography>
          <Box component="ul" sx={{ textAlign: 'left', pl: 2 }}>
            <li>Rotate shapes to create matching rows or columns</li>
            <li>Tap a shape to rotate it 90° clockwise</li>
            <li>Complete rows or columns to clear them and score points</li>
            <li>Consecutive matches increase your streak multiplier</li>
            <li>Score as many points as possible before time runs out!</li>
          </Box>
          <IconButton
            sx={{ position: 'absolute', top: 5, right: 5 }}
            onClick={() => setShowRules(false)}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Paper>
      </Fade>

      {!showRules && (
        <Tooltip title="Show Rules">
          <IconButton onClick={() => setShowRules(true)} sx={{ mb: 2 }}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Score: {score}</Typography>
        <Box sx={{
          width: '50%',
          height: 10,
          bgcolor: 'grey.300',
          borderRadius: 5,
          overflow: 'hidden'
        }}>
          <Box
            sx={{
              width: `${(timeLeft / GAME_DURATION) * 100}%`,
              height: '100%',
              bgcolor: 'primary.main',
              transition: 'width 1s linear'
            }}
          />
        </Box>
        <Typography variant="h6">{timeLeft}s</Typography>
      </Box>

      <Grid container spacing={1} sx={{ width: '100%', height: 'auto', aspectRatio: '1/1', margin: 'auto', mb: 2 }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Grid item xs={2.4} key={`${i}-${j}`}>
              <Box
                onClick={() => rotateShape(i, j)}
                sx={{
                  width: '100%',
                  paddingBottom: '100%',
                  position: 'relative',
                  cursor: 'pointer',
                  border: selectedCell?.row === i && selectedCell?.col === j ? '2px solid yellow' : '1px solid #ccc',
                  borderRadius: '4px',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {renderShape(cell.shape, cell.color, cell.rotation)}
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          onClick={startNewGame}
          disabled={gameState === 'playing'}
          sx={{
            minWidth: 120,
            fontSize: '1.1rem',
            textTransform: 'none',
          }}
        >
          {gameState === 'idle' ? 'Start Game' : 'Play Again'}
        </Button>
        {gameState === 'gameOver' && (
          <Button
            variant="outlined"
            onClick={shareScore}
            startIcon={<ShareIcon />}
            sx={{
              minWidth: 120,
              fontSize: '1.1rem',
              textTransform: 'none',
            }}
          >
            Share Score
          </Button>
        )}
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ShapeShift;
