import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Link, Button } from '@mui/material';
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
  const [startTime, setStartTime] = useState(null); // Track when the game starts
  const [elapsedTime, setElapsedTime] = useState(0); // Track time in seconds

  useEffect(() => {
    startNewGame();
    incrementGamesPlayed('Strands');
    logEvent('Game', 'Start', 'Strands');
  }, []);

  // Timer effect: updates every second
  useEffect(() => {
    let timer;
    if (!gameOver) {
      timer = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(Math.floor((currentTime - startTime) / 1000)); // Calculate elapsed time in seconds
      }, 1000);
    }
    return () => clearInterval(timer); // Clear timer on unmount
  }, [gameOver, startTime]);

  const startNewGame = () => {
    setThemeWords(['HACK', 'BUILD', 'PITCH', 'TECH', 'INNOVATE', 'PROTOTYPE', 'FOUNDER']);
    setSpangram('CODING');
    setFoundWords([]);
    setGameOver(false);
    setStartTime(Date.now()); // Set the start time
    setElapsedTime(0); // Reset elapsed time
  };

  const handleWordFound = (word) => {
    setFoundWords([...foundWords, word]);

    // Check if all theme words (excluding spangram) have been found
    if (foundWords.filter(w => w !== spangram).length + 1 === MAX_THEME_WORDS) {
      setGameOver(true);
      incrementGamesCompleted('Strands');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2, maxWidth: 360, margin: 'auto', height: '100vh', overflow: 'hidden' }}>

      {/* Updated banner with reduced padding and height */}
      <Paper elevation={3} sx={{ p: 0.5, mb: 1, backgroundColor: 'black', color: 'white' }}>
        <Typography color="white" variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
          Created with ❤️‍🔥 at the <strong>Horizon SF Hackathon</strong> hosted by <Link href="https://f.inc/" target="_blank" rel="noopener noreferrer" color="inherit">Founders, Inc.</Link>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">TODAY'S THEME</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Line by Line</Typography>
      </Paper>

      {/* Timer display with improved font size and optional stopwatch icon */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        ⏱️ Time Elapsed: {formatTime(elapsedTime)}
      </Typography>

      <Grid themeWords={themeWords} spangram={spangram} onWordFound={handleWordFound} gameOver={gameOver} />

      <ProgressTracker foundWords={foundWords.filter(word => word !== spangram)} totalWords={MAX_THEME_WORDS} />

      {gameOver && <GameComplete timeTaken={formatTime(elapsedTime)} />}
      {gameOver && <Confetti />}
    </Box>
  );
};

export default TwitterStrands;