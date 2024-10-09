import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { logEvent, incrementGamesPlayed, incrementGamesCompleted } from '../../analytics';
import Grid from './Grid';
import Confetti from './Confetti';
import ProgressTracker from './ProgressTracker';
import GameComplete from './GameComplete';

const MAX_THEME_WORDS = 7;

const TwitterStrands = () => {
  const [themeWords, setThemeWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [spangram, setSpangram] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
    incrementGamesPlayed('Strands');
    logEvent('Game', 'Start', 'Strands');
  }, []);

  const startNewGame = () => {
    setThemeWords(['HACK', 'BUILD', 'PITCH', 'TECH', 'INNOVATE', 'PROTOTYPE', 'FOUNDER']);
    setSpangram('CODING');
    setFoundWords([]);
    setGameOver(false);
  };

  const handleWordFound = (word) => {
    setFoundWords([...foundWords, word]);

    // Check if all theme words (excluding spangram) have been found
    if (foundWords.filter(w => w !== spangram).length + 1 === MAX_THEME_WORDS) {
      setGameOver(true);
      incrementGamesCompleted('Strands');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2, maxWidth: 360, margin: 'auto', height: '100vh', overflow: 'hidden' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">TODAY'S THEME</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Line by Line</Typography>
      </Paper>

      <Grid themeWords={themeWords} spangram={spangram} onWordFound={handleWordFound} gameOver={gameOver} /> {/* Pass gameOver to Grid */}

      <ProgressTracker foundWords={foundWords.filter(word => word !== spangram)} totalWords={MAX_THEME_WORDS} />

      {gameOver && <GameComplete />}
      {gameOver && <Confetti />}
    </Box>
  );
};

export default TwitterStrands;