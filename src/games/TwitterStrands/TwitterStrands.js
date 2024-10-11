import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Link, Button, CircularProgress } from '@mui/material';
import { logEvent, incrementGamesPlayed, incrementGamesCompleted } from '../../analytics';
import Grid from './Grid';
import Confetti from './Confetti';
import ProgressTracker from './ProgressTracker';
import GameComplete from './GameComplete';
import GridGenerator from './GridGenerator';

const MAX_THEME_WORDS = 8;

const TwitterStrands = () => {
  const [themeWords, setThemeWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [nonThemeWords, setNonThemeWords] = useState([]); // Track non-theme words
  const [spangram, setSpangram] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null); // Track when the game starts
  const [elapsedTime, setElapsedTime] = useState(0); // Track time in seconds
  const [hintCount, setHintCount] = useState(0); // Track the number of hints used
  const [grid, setGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState('');


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

  const startNewGame = async () => {
    let newThemeWords = [
      "PARANOID",    // 8 characters
      "LOVEBUG",     // 7 characters
      "SUCKER",      // 6 characters
      "COOL",        // 4 characters
      "MANDY",       // 5 characters
      "TONIGHT",     // 7 characters
      "SOS",         // 3 characters
      "BURNINUP"     // 8 characters
    ];
    setThemeWords(newThemeWords);
    setSpangram('BIGMAC');
    setFoundWords([]);
    setNonThemeWords([]);
    setGameOver(false);
    setStartTime(Date.now()); // Set the start time
    setElapsedTime(0); // Reset elapsed time
    setHintCount(0); // Reset hints
    setError(null);
    setIsLoading(true);
    setProgress('');

    let newSpangram = 'BIGMAC';
    try {
      const newGrid = await GridGenerator({

        themeWords: newThemeWords,
      });
      setGrid(newGrid);
    } catch (error) {
      console.error("Error generating grid:", error);
      setError("Failed to generate game grid. Please try again.");
      setGrid(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordFound = (word) => {
    if (themeWords.includes(word) || word === spangram) {
      setFoundWords([...foundWords, word]);

      if (foundWords.filter(w => w !== spangram).length + 1 === MAX_THEME_WORDS) {
        setGameOver(true);
        incrementGamesCompleted('Strands');
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
    // Pick a random remaining theme word and reveal a random letter
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
    <Box sx={{ textAlign: 'center', py: 2, maxWidth: 360, margin: 'auto', height: '100vh', overflow: 'hidden' }}>

      <Paper elevation={3} sx={{ p: 0.5, mb: 1, backgroundColor: 'black', color: 'white' }}>
        <Typography color="white" variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
          Created with ❤️‍🔥 at the <strong>Horizon SF Hackathon</strong> hosted by <Link href="https://f.inc/" target="_blank" rel="noopener noreferrer" color="inherit">Founders, Inc.</Link>
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">TODAY'S THEME</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Jo Bros</Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Time Elapsed: {formatTime(elapsedTime)}
      </Typography>

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

      <ProgressTracker foundWords={foundWords.filter(word => word !== spangram)} totalWords={MAX_THEME_WORDS} />

      {gameOver && <GameComplete timeTaken={formatTime(elapsedTime)} />}
      {gameOver && <Confetti />}

      {/* Hint Button */}
      {!gameOver && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={giveHint}
          sx={{ mt: 2 }}
        >
          Get a Hint
        </Button>
      )}

      {/* Reset button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={startNewGame}
        sx={{ mt: 2 }}
      >
        Reset Game
      </Button>

    </Box>
  );
};

export default TwitterStrands;