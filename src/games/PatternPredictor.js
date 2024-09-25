import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';

const shapes = ['circle', 'square', 'triangle', 'diamond'];
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FAD02E'];

const generatePattern = () => {
  const startShapeIndex = Math.floor(Math.random() * shapes.length);
  const startColorIndex = Math.floor(Math.random() * colors.length);
  const pattern = [];
  for (let i = 0; i < 4; i++) {
    pattern.push({
      shape: shapes[(startShapeIndex + i) % shapes.length],
      color: colors[(startColorIndex + i) % colors.length],
    });
  }
  return pattern;
};

const PatternPredictor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [pattern, setPattern] = useState([]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const startNewRound = () => {
    const newPattern = generatePattern();
    setPattern(newPattern);
    const correctNext = {
      shape: shapes[(shapes.indexOf(newPattern[3].shape) + 1) % shapes.length],
      color: colors[(colors.indexOf(newPattern[3].color) + 1) % colors.length],
    };
    const wrongOptions = [
      { shape: correctNext.shape, color: colors[(colors.indexOf(correctNext.color) + 1) % colors.length] },
      { shape: shapes[(shapes.indexOf(correctNext.shape) + 1) % shapes.length], color: correctNext.color },
      { shape: shapes[(shapes.indexOf(correctNext.shape) + 1) % shapes.length], color: colors[(colors.indexOf(correctNext.color) + 1) % colors.length] },
    ];
    setOptions([correctNext, ...wrongOptions].sort(() => Math.random() - 0.5));
  };

  const handleOptionClick = (option) => {
    const isCorrect =
      option.shape === shapes[(shapes.indexOf(pattern[3].shape) + 1) % shapes.length] &&
      option.color === colors[(colors.indexOf(pattern[3].color) + 1) % colors.length];

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setTimeout(() => setFeedback(null), 500);

    if (isCorrect) {
      setScore(score + 1);
    }
    startNewRound();
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    startNewRound();
  };

  const renderShape = (shape, color, size = 50) => {
    switch (shape) {
      case 'circle':
        return <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: color }} />;
      case 'square':
        return <div style={{ width: size, height: size, backgroundColor: color }} />;
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      case 'diamond':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              transform: 'rotate(45deg)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{
      textAlign: 'center',
      px: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 600,
      margin: 'auto',
      pt: 2,
      pb: 2,
    }}>
      <Typography variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 800, mb: 2 }}>Pattern Predictor</Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        p: 1.5,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Score: {score}</Typography>
        <Box sx={{ width: '50%', mx: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / 60) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
              },
            }}
          />
        </Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{timeLeft}s</Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Predict the next shape and color in the sequence!
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {pattern.map((item, index) => (
          <Box key={index} sx={{ mx: 1 }}>
            {renderShape(item.shape, item.color)}
          </Box>
        ))}
        <Box sx={{ mx: 1, width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5">?</Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {options.map((option, index) => (
          <Grid item xs={6} key={index}>
            <Button
              onClick={() => handleOptionClick(option)}
              disabled={gameOver}
              sx={{
                width: '100%',
                height: 80,
                borderRadius: 2,
                border: '2px solid #ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                },
              }}
            >
              {renderShape(option.shape, option.color, 40)}
            </Button>
          </Grid>
        ))}
      </Grid>

      {feedback && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 2,
            borderRadius: 2,
            backgroundColor: feedback === 'correct' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          {feedback === 'correct' ? 'Correct!' : 'Try Again!'}
        </Box>
      )}

      <Button
        variant="contained"
        onClick={handleRestart}
        sx={{
          fontSize: '1.1rem',
          py: 1.2,
          px: 4,
          borderRadius: 3,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '100%',
          mt: 2,
          background: 'linear-gradient(45deg, #ff6b6b 30%, #feca57 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #feca57 30%, #ff6b6b 90%)',
          },
        }}
      >
        {gameOver ? 'PLAY AGAIN' : 'RESTART'}
      </Button>
    </Box>
  );
};

export default PatternPredictor;