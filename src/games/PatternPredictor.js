import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, CircularProgress, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { logEvent, incrementGamesPlayed, incrementGamesCompleted } from '../analytics';

const shapes = ['circle', 'square', 'triangle', 'diamond'];
const colors = ['primary', 'secondary', 'error', 'warning'];
const fills = ['filled', 'outlined'];

const generatePattern = (level) => {
  const patternLength = Math.min(3 + Math.floor(level / 2), 6);
  return Array.from({ length: patternLength }, () => ({
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    fill: fills[Math.floor(Math.random() * fills.length)]
  }));
};

const Shape = ({ shape, color, fill }) => {
  const theme = useTheme();
  const size = 60;
  const style = {
    width: size,
    height: size,
    backgroundColor: fill === 'filled' ? theme.palette[color].main : 'transparent',
    border: `2px solid ${theme.palette[color].main}`,
    borderRadius: shape === 'circle' ? '50%' : shape === 'square' ? '0%' : '0%',
    transform: shape === 'diamond' ? 'rotate(45deg)' : 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  if (shape === 'triangle') {
    return (
      <Box sx={{ width: size, height: size, position: 'relative' }}>
        <Box
          sx={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${fill === 'filled' ? theme.palette[color].main : 'transparent'}`,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Box
          sx={{
            width: 0,
            height: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${theme.palette[color].main}`,
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: fill === 'filled' ? 'none' : 'polygon(3% 3%, 97% 3%, 50% 97%)',
          }}
        />
      </Box>
    );
  }

  return <Box sx={style} />;
};

const PatternPredictor = () => {
  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [powerUpActive, setPowerUpActive] = useState(false);
  const [powerUpCooldown, setPowerUpCooldown] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    incrementGamesPlayed('PatternPredictor');
    logEvent('Game', 'Start', 'PatternPredictor');
    const startTime = Date.now();
    return () => {
      const sessionTime = (Date.now() - startTime) / 1000; // in seconds
      logEvent('Game', 'SessionTime', 'PatternPredictor', sessionTime);
    };
  }, []);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      incrementGamesCompleted('PatternPredictor');
      logEvent('Game', 'End', 'PatternPredictor', score);
    }
  }, [timeLeft, gameOver, score]);

  useEffect(() => {
    startNewRound();
    if (level > 1) {
      logEvent('Game', 'LevelUp', 'PatternPredictor', level);
    }
  }, [level]);

  useEffect(() => {
    if (powerUpCooldown > 0) {
      const timer = setTimeout(() => setPowerUpCooldown(powerUpCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [powerUpCooldown]);

  const startNewRound = () => {
    const newPattern = generatePattern(level);
    setPattern(newPattern);
    const correctOption = [...newPattern, generateNextInPattern(newPattern)];
    const wrongOptions = Array.from({ length: 3 }, () =>
      [...newPattern, generateRandomShape()]
    );
    setOptions(shuffle([correctOption, ...wrongOptions]));
  };

  const generateNextInPattern = (pattern) => {
    const lastShape = pattern[pattern.length - 1];
    return {
      shape: shapes[(shapes.indexOf(lastShape.shape) + 1) % shapes.length],
      color: colors[(colors.indexOf(lastShape.color) + 1) % colors.length],
      fill: fills[(fills.indexOf(lastShape.fill) + 1) % fills.length]
    };
  };

  const generateRandomShape = () => ({
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    fill: fills[Math.floor(Math.random() * fills.length)]
  });

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleOptionClick = (selectedOption) => {
    if (JSON.stringify(selectedOption) === JSON.stringify([...pattern, generateNextInPattern(pattern)])) {
      const pointsEarned = powerUpActive ? 2 : 1;
      setScore(score + pointsEarned);
      logEvent('Game', 'CorrectPrediction', 'PatternPredictor', pointsEarned);
      if (score + pointsEarned >= level * 5) {
        setLevel(level + 1);
        setSnackbarMessage(`Level up! Now at level ${level + 1}`);
        setShowSnackbar(true);
      } else {
        startNewRound();
      }
    } else {
      setTimeLeft(Math.max(0, timeLeft - 5));
      setSnackbarMessage('Incorrect! -5 seconds');
      setShowSnackbar(true);
      logEvent('Game', 'IncorrectPrediction', 'PatternPredictor');
    }
    setPowerUpActive(false);
  };

  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setGameOver(false);
    setPowerUpActive(false);
    setPowerUpCooldown(0);
    startNewRound();
    incrementGamesPlayed('PatternPredictor');
    logEvent('Game', 'Restart', 'PatternPredictor');
  };

  const activatePowerUp = () => {
    if (powerUpCooldown === 0) {
      setPowerUpActive(true);
      setPowerUpCooldown(30);
      setSnackbarMessage('Power-up activated! Next correct answer worth double points');
      setShowSnackbar(true);
      logEvent('Game', 'PowerUpActivated', 'PatternPredictor');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Pattern Predictor</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Score: {score}</Typography>
        <Typography>Level: {level}</Typography>
        <Typography>Time: {timeLeft}s</Typography>
      </Box>
      {!gameOver ? (
        <>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Current Pattern:</Typography>
            <Grid container justifyContent="center" spacing={1}>
              {pattern.map((item, index) => (
                <Grid item key={index}>
                  <Shape {...item} />
                </Grid>
              ))}
            </Grid>
          </Paper>
          <Typography variant="h6" sx={{ mb: 1 }}>Predict the next shape:</Typography>
          <Grid container spacing={2} justifyContent="center">
            {options.map((option, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Button
                  variant="outlined"
                  onClick={() => handleOptionClick(option)}
                  sx={{ p: 1, minHeight: 80 }}
                >
                  <Shape {...option[option.length - 1]} />
                </Button>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={activatePowerUp}
            disabled={powerUpCooldown > 0}
            sx={{ mt: 2 }}
          >
            {powerUpCooldown > 0 ? `Power-up (${powerUpCooldown}s)` : 'Activate Power-up'}
          </Button>
        </>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>Game Over!</Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>Final Score: {score}</Typography>
          <Button variant="contained" onClick={handleRestart}>Play Again</Button>
        </Box>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default PatternPredictor;