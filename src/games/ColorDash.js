import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Snackbar, Paper, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const COLORS = ['#F93854', '#3498db', '#f1c40f'];
const SHAPES = ['circle', 'square', 'triangle'];
const INITIAL_SPEED = 4000; // Initial speed of obstacle moving across the screen in ms
const OBSTACLE_INTERVAL = 1500; // Frequency of obstacles in ms
const SPEED_INCREMENT_INTERVAL = 8000; // Every 8 seconds, the speed increases

// Create unique color-shape combinations only once to avoid duplicates
const colorShapeCombinations = COLORS.flatMap((color, colorIndex) =>
  SHAPES.map((shape, shapeIndex) => ({ id: `${colorIndex}-${shapeIndex}`, color, shape }))
);

const moveAnimation = (speed) => keyframes`
  0% { right: 0; }
  100% { right: 100%; }
`;

const ColorDash = () => {
  const theme = useTheme();
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Start generating obstacles automatically
    const obstacleInterval = setInterval(() => {
      if (!gameOver) generateObstacle();
    }, OBSTACLE_INTERVAL);

    // Increase speed gradually
    const speedInterval = setInterval(() => {
      if (!gameOver) {
        setSpeed((prevSpeed) => Math.max(1500, prevSpeed - 500)); // Increase speed, min speed 1500ms
      }
    }, SPEED_INCREMENT_INTERVAL);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(speedInterval);
    };
  }, [gameOver]);

  const generateObstacle = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    setObstacles((prevObstacles) => [
      ...prevObstacles,
      { id: Date.now(), color, shape, matched: false },
    ]);
  };

  const handleSelection = (color, shape) => {
    if (obstacles.length === 0 || gameOver) return;

    const frontObstacle = obstacles[0];
    if (frontObstacle.color === color && frontObstacle.shape === shape) {
      // Mark as matched and remove
      const updatedObstacles = [...obstacles];
      updatedObstacles[0].matched = true;
      setObstacles(updatedObstacles.filter((obstacle) => !obstacle.matched));
      setScore((prevScore) => prevScore + 1);
    } else {
      // Incorrect match: no game over, just let it pass
      setSnackbarMessage('Incorrect match!');
      setShowSnackbar(true);
    }
  };

  const handleAnimationEnd = (obstacleId) => {
    const obstacle = obstacles.find((obs) => obs.id === obstacleId);

    if (obstacle && !obstacle.matched) {
      // Game over when obstacle reaches the end without being matched
      setGameOver(true);
      setSnackbarMessage('Game Over! An obstacle reached the end!');
      setShowSnackbar(true);
    } else {
      // Remove obstacle if matched
      setObstacles((prevObstacles) =>
        prevObstacles.filter((obs) => obs.id !== obstacleId)
      );
    }
  };

  const restartGame = () => {
    setSpeed(INITIAL_SPEED);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setShowSnackbar(false);
  };

  const renderShape = (shape, color) => {
    switch (shape) {
      case 'circle':
        return (
          <Box
            sx={{
              backgroundColor: color,
              border: '3px solid #000',
              width: 50,
              height: 50,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        );
      case 'square':
        return (
          <Box
            sx={{
              backgroundColor: color,
              border: '3px solid #000',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        );
      case 'triangle':
        return (
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: '25px solid transparent',
              borderRight: '25px solid transparent',
              borderBottom: `50px solid ${color}`,
              position: 'relative',
            }}
            />
        );
      default:
        return null;
    }
  };


  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Color Dash</Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" align="left">
          Guide the character by selecting the correct color and shape to match the upcoming obstacle.
        </Typography>
      </Paper>

      <Box
        sx={{
          width: '100%',
          height: '150px',
          backgroundColor: theme.palette.background.paper,
          position: 'relative',
          overflow: 'hidden',
          mb: 2,
          border: '3px solid #000', // Black border around conveyor belt box
        }}
      >
        {/* Obstacles */}
        {obstacles.map((obstacle) => (
          <Box
            key={obstacle.id}
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              animation: !gameOver
                ? `${moveAnimation(speed)} ${speed}ms linear`
                : 'none', // Stop animation when game over
              animationIterationCount: 1,
              right: 0,
            }}
            onAnimationEnd={() => handleAnimationEnd(obstacle.id)}
          >
            {renderShape(obstacle.shape, obstacle.color)}
          </Box>
        ))}
      </Box>

      <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Score: {score}</Typography>

      {/* Selection Grid */}
      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        {colorShapeCombinations.map(({ id, color, shape }) => (
          <Grid item key={id}>
            <Button
              onClick={() => handleSelection(color, shape)}
              sx={{
                p: 1,
                borderRadius: '12px',
                border: `2px solid ${theme.palette.grey[300]}`,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              {renderShape(shape, color)}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        onClick={restartGame}
        sx={{
          mb: 2,
          py: 1,
          px: 3,
          fontSize: '1rem',
          backgroundColor: theme.palette.error.main,
        }}
      >
        Restart Game
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

export default ColorDash;
