import React, { useState } from 'react';
import { Box, Typography, Paper, Link, Button, CircularProgress, TextField } from '@mui/material';
import Grid from './Grid';
import Confetti from './Confetti';
import ProgressTracker from './ProgressTracker';
import GameComplete from './GameComplete';
import GridGenerator from './GridGenerator';

const TwitterStrands = () => {
  const [theme, setTheme] = useState(''); // Add state for theme input
  const [themeWords, setThemeWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [nonThemeWords, setNonThemeWords] = useState([]); // Track non-theme words
  const [spangram, setSpangram] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null); // Track when the game starts
  const [elapsedTime, setElapsedTime] = useState(0); // Track time in seconds
  const [hintCount, setHintCount] = useState(0); // Track the number of hints used
  const [grid, setGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('');

  const startNewGame = async () => {
    if (!theme) {
      setError('Please enter a theme to start the game.');
      return;
    }

    setFoundWords([]);
    setNonThemeWords([]);
    setGameOver(false);
    setStartTime(Date.now()); // Set the start time
    setElapsedTime(0); // Reset elapsed time
    setHintCount(0); // Reset hints
    setError(null);
    setIsLoading(true);
    setProgress('');

    try {
      // Fetch theme words from the API with the selected theme
      const response = await fetch('https://dev.flyingcometgames.com/api/generateThemeWords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: theme, // Use the input theme
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch theme words');
      }

      const data = await response.json();
      const newThemeWords = data.themeWords;

      // Set theme words and generate grid based on the fetched theme words
      setThemeWords(newThemeWords);
      const newGrid = await GridGenerator({
        themeWords: newThemeWords,
      });

      setGrid(newGrid);
    } catch (error) {
      console.error("Error generating game grid:", error);
      setError("Failed to generate game grid. Please try again.");
      setGrid(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordFound = (word) => {
    if (themeWords.includes(word) || word === spangram) {
      setFoundWords([...foundWords, word]);

      if (foundWords.filter(w => w !== spangram).length + 1 === themeWords.length) {
        setGameOver(true);
      }
    } else {
      setNonThemeWords([...nonThemeWords, word]);

      // Give a free hint after every 3 non-theme words found
      if (nonThemeWords.length > 0 && nonThemeWords.length % 3 === 0) {
        giveHint();
      }
    }
  };

  const giveHint = () => {
    const remainingWords = themeWords.filter(word => !foundWords.includes(word));
    if (remainingWords.length > 0) {
      const randomWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      setHintCount(hintCount + 1); // Increment hint count
      return randomWord; // Return the word to highlight in the grid
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2, maxWidth: 360, margin: 'auto', height: '100vh'}}>

      <Paper elevation={3} sx={{ p: 0.5, mb: 1, backgroundColor: 'black', color: 'white' }}>
        <Typography color="white" variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
          Created with ❤️‍🔥 at the <strong>Horizon SF Hackathon</strong> hosted by <Link href="https://f.inc/" target="_blank" rel="noopener noreferrer" color="inherit">Founders, Inc.</Link>
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/game-logos/my-strands-logo.svg`}
        alt="My Strands Logo"
        style={{ width: '50px', height: '50px', marginRight: '10px' }} // Smaller size and margin for spacing
        />
      <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
        My Strands
      </Typography>
    </Box>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Enter Your Theme</Typography>
        <TextField
          label="Theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={startNewGame} disabled={isLoading}>
          Start Game
        </Button>
      </Paper>

      {/* <Typography variant="h6" sx={{ mb: 2 }}>
        Time Elapsed: {formatTime(elapsedTime)}
      </Typography> */}

      {isLoading ? (
        <Box>
          <CircularProgress />
          {progress && <Typography sx={{ mt: 2 }}>{progress}</Typography>}
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid
          grid={grid}
          themeWords={themeWords}
          spangram={spangram}
          onWordFound={handleWordFound}
          gameOver={gameOver}
          giveHint={giveHint}
          hintCount={hintCount}
        />
      )}

      <ProgressTracker foundWords={foundWords.filter(word => word !== spangram)} totalWords={themeWords.length} />

      {gameOver && <GameComplete timeTaken={formatTime(elapsedTime)} />}
      {gameOver && <Confetti />}

    </Box>
  );
};

export default TwitterStrands;