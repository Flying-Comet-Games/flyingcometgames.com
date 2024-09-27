import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { logEvent } from '../analytics';

const GRID_SIZE = 10;
const COLORS = ['primary', 'purple', 'error', 'warning', 'info', 'success'];
const MAX_MOVES = 22;

const ColorFlood = () => {
  const theme = useTheme();
  const [grid, setGrid] = useState([]);
  const [currentColor, setCurrentColor] = useState('');
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    incrementGamesPlayed('ColorFlood');
    logEvent('Game', 'Start', 'ColorFlood');
    const startTime = Date.now();
    return () => {
      const sessionTime = (Date.now() - startTime) / 1000; // in seconds
      logEvent('Game', 'SessionTime', 'ColorFlood', sessionTime);
    };
  }, []);

  useEffect(() => {
    if (win) {
      incrementGamesCompleted('ColorFlood');
      logEvent('Game', 'Complete', 'ColorFlood', moves);
    }
  }, [win, moves]);

  const startNewGame = () => {
    const newGrid = Array(GRID_SIZE).fill().map(() =>
      Array(GRID_SIZE).fill().map(() => COLORS[Math.floor(Math.random() * COLORS.length)])
    );
    setGrid(newGrid);
    setCurrentColor(newGrid[0][0]);
    setMoves(0);
    setGameOver(false);
    setWin(false);
  };

  const floodFill = (color) => {
    if (color === currentColor || gameOver) return;

    const newGrid = [...grid];
    const stack = [[0, 0]];
    const originalColor = newGrid[0][0];

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE || newGrid[x][y] !== originalColor) continue;

      newGrid[x][y] = color;
      stack.push([x+1, y], [x-1, y], [x, y+1], [x, y-1]);
    }

    setGrid(newGrid);
    setCurrentColor(color);
    setMoves(moves + 1);

    if (newGrid.every(row => row.every(cell => cell === color))) {
      setWin(true);
      setGameOver(true);
      setSnackbarMessage(`You won in ${moves + 1} moves!`);
      setShowSnackbar(true);
    } else if (moves + 1 >= MAX_MOVES) {
      setGameOver(true);
      setSnackbarMessage(`Game over! You used all ${MAX_MOVES} moves.`);
      setShowSnackbar(true);
    }
  };

  const getColor = (colorName) => {
    if (colorName === 'purple') {
      return '#9c27b0'; // This is the hex code for purple in Material-UI
    }
    return theme.palette[colorName]?.main || theme.palette.grey[500]; // Fallback to grey if color not found
  };

  const getHoverColor = (colorName) => {
    if (colorName === 'purple') {
      return '#7b1fa2'; // Darker shade of purple for hover
    }
    return theme.palette[colorName]?.dark || theme.palette.grey[700]; // Fallback to dark grey if color not found
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Color Flood</Typography>
      
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Rules:</Typography>
        <Typography variant="body2" align="left">
          1. Start from the top-left corner and flood the board with one color.<br/>
          2. Click on a color to flood-fill from the top-left.<br/>
          3. Try to make the entire board one color in {MAX_MOVES} moves or less.<br/>
          4. The game ends when the board is one color or you run out of moves.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Moves: {moves}/{MAX_MOVES}</Typography>
        {gameOver && <Typography>{win ? 'You Win!' : 'Game Over'}</Typography>}
      </Box>

      <Grid container spacing={0.5} sx={{ width: 300, height: 300, margin: 'auto', mb: 2 }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Grid item xs={1.2} key={`${i}-${j}`}>
              <Box 
                sx={{ 
                  width: '100%', 
                  paddingBottom: '100%', 
                  backgroundColor: getColor(cell),
                  transition: 'background-color 0.3s'
                }} 
              />
            </Grid>
          ))
        )}
      </Grid>

      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        {COLORS.map((color) => (
          <Grid item key={color}>
            <Button
              variant="contained"
              onClick={() => floodFill(color)}
              disabled={gameOver}
              sx={{
                minWidth: 40,
                minHeight: 40,
                backgroundColor: getColor(color),
                '&:hover': {
                  backgroundColor: getHoverColor(color),
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" onClick={startNewGame}>
        {gameOver ? 'Play Again' : 'New Game'}
      </Button>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ColorFlood;