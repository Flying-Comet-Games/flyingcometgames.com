import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, Button, Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import ShareIcon from '@mui/icons-material/Share';

const GRID_SIZE = 3; // 3x3 grid
const INITIAL_INTERVAL = 2000; // 2 seconds initially
const INTERVAL_DECREASE = 100; // Decrease interval by 100ms each level
const MIN_INTERVAL = 800; // Minimum 800ms interval

const Hole = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  borderRadius: '50%',
  backgroundColor: '#D2691E',
  border: '2px solid #8B4513',
  position: 'relative',
  transition: 'all 0.1s',
  '&:active': {
    backgroundColor: '#CD853F',
  },
}));

const Mole = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '10%',
  left: '10%',
  width: '80%',
  height: '80%',
  borderRadius: '50%',
  backgroundColor: '#8B4513',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  color: 'white',
  transform: 'translateY(0%)',
  transition: 'transform 0.1s ease-in-out',
}));

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeMole, setActiveMole] = useState(null);
  const [interval, setInterval] = useState(INITIAL_INTERVAL);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const getRandomHole = useCallback(() => {
    const index = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    return [Math.floor(index / GRID_SIZE), index % GRID_SIZE];
  }, []);

  const showMole = useCallback(() => {
    setActiveMole(getRandomHole());
  }, [getRandomHole]);

  useEffect(() => {
    if (gameOver) return;

    const moleTimer = setTimeout(() => {
      if (activeMole) {
        setLives((prevLives) => {
          if (prevLives > 1) {
            showMole(); // Show a new mole immediately
            return prevLives - 1;
          }
          setGameOver(true);
          return 0;
        });
      } else {
        showMole();
      }
    }, interval);

    return () => clearTimeout(moleTimer);
  }, [showMole, interval, gameOver, activeMole]);

  const handleWhack = (row, col) => {
    if (gameOver) return;

    if (activeMole && activeMole[0] === row && activeMole[1] === col) {
      setScore((prevScore) => prevScore + 1);
      setActiveMole(null);
      showMole(); // Show a new mole immediately after a successful hit
      if (score > 0 && score % 5 === 4) { // Level up every 5 points
        setLevel((prevLevel) => prevLevel + 1);
        setInterval((prevInterval) => Math.max(prevInterval - INTERVAL_DECREASE, MIN_INTERVAL));
      }
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setActiveMole(null);
    setInterval(INITIAL_INTERVAL);
    setLevel(1);
    setLives(3);
  };

  const handleShare = () => {
    const shareText = `I scored ${score} in Whack-a-Mole! Can you beat my score?`;

    if (navigator.share) {
      navigator.share({
        title: 'Whack-a-Mole Score',
        text: shareText,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => {
          setSnackbarMessage('Score copied to clipboard!');
          setShowSnackbar(true);
        })
        .catch((error) => {
          console.error('Failed to copy text: ', error);
          setSnackbarMessage('Failed to copy score. Please try again.');
          setShowSnackbar(true);
        });
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h4" gutterBottom>Whack-a-Mole</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography>Score: {score}</Typography>
        <Typography>Level: {level}</Typography>
        <Typography>Lives: {lives}</Typography>
      </Box>

      <Grid container spacing={1} sx={{ maxWidth: 300, margin: 'auto' }}>
        {Array(GRID_SIZE).fill().map((_, row) =>
          Array(GRID_SIZE).fill().map((_, col) => (
            <Grid item xs={4} key={`${row}-${col}`}>
              <Hole onClick={() => handleWhack(row, col)}>
                {activeMole && activeMole[0] === row && activeMole[1] === col && (
                  <Mole>🐹</Mole>
                )}
              </Hole>
            </Grid>
          ))
        )}
      </Grid>

      {gameOver && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Game Over!</Typography>
          <Typography>Final Score: {score}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={restartGame}>
              Play Again
            </Button>
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.secondary.contrastText,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.secondary.dark,
                },
              }}
            >
              Share Score
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default WhackAMole;