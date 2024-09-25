import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ColorMatcher = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getRandomColor = () => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  });

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [playerColor, setPlayerColor] = useState({ r: 128, g: 128, b: 128 });
  const [showPulse, setShowPulse] = useState(false);
  const [isCloseMatch, setIsCloseMatch] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  const difficultySettings = {
    easy: { marginOfError: 50, timeLimit: 90, pointsPerMatch: 1 },
    medium: { marginOfError: 30, timeLimit: 60, pointsPerMatch: 2 },
    hard: { marginOfError: 15, timeLimit: 45, pointsPerMatch: 3 },
  };

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    const diff = Math.abs(targetColor.r - playerColor.r) +
                 Math.abs(targetColor.g - playerColor.g) +
                 Math.abs(targetColor.b - playerColor.b);
    setIsCloseMatch(diff <= difficultySettings[difficulty].marginOfError);
  }, [playerColor, targetColor, difficulty]);

  const handleColorChange = (color, value) => {
    setPlayerColor(prevColor => ({ ...prevColor, [color]: parseInt(value) }));
  };

  const handleCheckMatch = () => {
    const diff = Math.abs(targetColor.r - playerColor.r) +
                 Math.abs(targetColor.g - playerColor.g) +
                 Math.abs(targetColor.b - playerColor.b);
    if (diff <= difficultySettings[difficulty].marginOfError) {
      setScore(score + difficultySettings[difficulty].pointsPerMatch);
      setTargetColor(getRandomColor());
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 300);
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(difficultySettings[difficulty].timeLimit);
    setGameOver(false);
    setTargetColor(getRandomColor());
    setPlayerColor({ r: 128, g: 128, b: 128 });
  };

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    setTimeLeft(prevTime => Math.ceil((prevTime / difficultySettings[difficulty].timeLimit) * difficultySettings[newDifficulty].timeLimit));
    if (gameOver) {
      handleRestart();
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
      <Typography variant="h4" sx={{ fontSize: '1.8rem', fontWeight: 800, mb: 2 }}>Color Matcher</Typography>

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
            value={(timeLeft / difficultySettings[difficulty].timeLimit) * 100}
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

      <Box sx={{ mb: 2 }}>
        <Select
          value={difficulty}
          onChange={handleDifficultyChange}
          sx={{ width: '100%' }}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 3
      }}>
        {['Target', 'Your Color'].map((label, index) => (
          <Box key={label} sx={{
            width: '48%',
            border: '2px solid #ccc',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            transform: showPulse && index === 1 ? 'scale(1.05)' : 'scale(1)',
          }}>
            <Typography sx={{
              background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
              color: 'text.primary',
              py: 0.7,
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {label}
            </Typography>
            <Box sx={{
              height: 80,
              bgcolor: index === 0 ? `rgb(${targetColor.r},${targetColor.g},${targetColor.b})` : `rgb(${playerColor.r},${playerColor.g},${playerColor.b})`,
              transition: 'background-color 0.3s ease',
            }} />
          </Box>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        {[
          { label: 'R', key: 'r', color: '#ff6b6b' },
          { label: 'G', key: 'g', color: '#51cf66' },
          { label: 'B', key: 'b', color: '#339af0' }
        ].map(({ label, key, color }) => (
          <Box key={key} sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', width: '25px', mr: 2 }}>{label}</Typography>
            <Slider
              value={playerColor[key]}
              onChange={(_, newValue) => handleColorChange(key, newValue)}
              min={0}
              max={255}
              disabled={gameOver}
              sx={{
                color: color,
                height: 8,
                '& .MuiSlider-thumb': {
                  width: 24,
                  height: 24,
                },
                '& .MuiSlider-track': {
                  height: 8,
                  borderRadius: 4,
                },
                '& .MuiSlider-rail': {
                  height: 8,
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Button
          variant="contained"
          onClick={handleCheckMatch}
          disabled={gameOver}
          sx={{
            fontSize: '1.1rem',
            py: 1.2,
            px: 4,
            borderRadius: 3,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            background: isCloseMatch
              ? 'linear-gradient(45deg, #ff6b6b 30%, #feca57 90%)'
              : 'linear-gradient(45deg, #339af0 30%, #51cf66 90%)',
            '&:hover': {
              background: isCloseMatch
                ? 'linear-gradient(45deg, #feca57 30%, #ff6b6b 90%)'
                : 'linear-gradient(45deg, #51cf66 30%, #339af0 90%)',
            },
            animation: showPulse ? 'pulse 0.5s' : 'none',
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.05)',
              },
              '100%': {
                transform: 'scale(1)',
              },
            },
          }}
        >
          CHECK MATCH
        </Button>
        {gameOver && (
          <Button
            variant="contained"
            onClick={handleRestart}
            color="secondary"
            sx={{
              fontSize: '1.1rem',
              py: 1.2,
              px: 4,
              borderRadius: 3,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              width: '100%',
              mt: 1,
            }}
          >
            Restart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ColorMatcher;