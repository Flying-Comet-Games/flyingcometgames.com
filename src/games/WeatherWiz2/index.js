// WeatherWizGame.js - Main game logic
import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import GameControls from './GameControls';
import GameBoard from './GameBoard';

const GRID_SIZE = 5;
const ELEMENTS = ['☁️', '🌧️', '☀️'];

const WeatherWiz = () => {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));
  const [selectedElement, setSelectedElement] = useState(ELEMENTS[0]);
  const [challengeStatus, setChallengeStatus] = useState('');

  const handleTileClick = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] === selectedElement ? '' : selectedElement;
    setGrid(newGrid);
  };

  const validatePlacement = (row, col) => {
    return true; // Placeholder for validation logic
  };

  const handleClear = () => {
    setGrid(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));
    setChallengeStatus('');
  };

  const checkSolution = () => {
    // Example solution validation
    const counts = { '☁️': 0, '🌧️': 0, '☀️': 0 };
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const symbol = grid[i][j];
        if (symbol) counts[symbol]++;
      }
    }

    if (Object.values(counts).every(count => count === 5)) {
      setChallengeStatus("Congratulations! You've solved the puzzle! 🎉");
    } else {
      setChallengeStatus("Not quite right. Keep trying!");
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          WeatherWiz Game
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Place exactly 5 of each weather symbol (☁️, 🌧️, ☀️). No duplicates in rows or columns.
        </Typography>

        <GameControls
          elements={ELEMENTS}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
          onClear={handleClear}
          onCheck={checkSolution}
        />

        <GameBoard
          grid={grid}
          onTileClick={handleTileClick}
          validatePlacement={validatePlacement}
        />

        <Typography variant="body2" color={challengeStatus.includes('Congratulations') ? 'success.main' : 'error.main'}>
          {challengeStatus}
        </Typography>
      </Paper>
    </Box>
  );
};

export default WeatherWiz;
