import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';

const shapes = ['circle', 'square', 'triangle', 'pentagon', 'hexagon'];
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
const colorNames = {
  '#ff6b6b': 'Red',
  '#feca57': 'Yellow',
  '#48dbfb': 'Blue',
  '#ff9ff3': 'Pink',
  '#54a0ff': 'Sky Blue'
};

const generateShapes = (count) => {
  return Array.from({ length: count }, () => ({
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
};

const ShapeComponent = ({ shape, color, onClick, selected }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const shapeStyles = {
    width: isMobile ? '40px' : '60px',
    height: isMobile ? '40px' : '60px',
    backgroundColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: selected ? '3px solid #000' : 'none',
    transition: 'all 0.3s ease',
  };

  switch (shape) {
    case 'circle':
      return <div style={{ ...shapeStyles, borderRadius: '50%' }} onClick={onClick} />;
    case 'square':
      return <div style={shapeStyles} onClick={onClick} />;
    case 'triangle':
      return (
        <div
          style={{
            ...shapeStyles,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: isMobile ? '20px solid transparent' : '30px solid transparent',
            borderRight: isMobile ? '20px solid transparent' : '30px solid transparent',
            borderBottom: `${isMobile ? '40px' : '60px'} solid ${color}`,
          }}
          onClick={onClick}
        />
      );
    case 'pentagon':
      return (
        <div
          style={{
            ...shapeStyles,
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          }}
          onClick={onClick}
        />
      );
    case 'hexagon':
      return (
        <div
          style={{
            ...shapeStyles,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          }}
          onClick={onClick}
        />
      );
    default:
      return null;
  }
};

const ShapeSorter = () => {
  const [shapes, setShapes] = useState([]);
  const [targetShape, setTargetShape] = useState('');
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [selectedShapes, setSelectedShapes] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    const newShapes = generateShapes(16);
    setShapes(newShapes);
    const randomShapeObj = newShapes[Math.floor(Math.random() * newShapes.length)];
    setTargetShape(randomShapeObj.shape); // Correctly set the shape
    setTargetColor(randomShapeObj.color); // Correctly set the color
    setSelectedShapes([]);
  };


  const handleShapeClick = (index) => {
    if (gameOver) return;
    
    const newSelectedShapes = [...selectedShapes];
    const shapeIndex = newSelectedShapes.indexOf(index);
    
    if (shapeIndex === -1) {
      newSelectedShapes.push(index);
    } else {
      newSelectedShapes.splice(shapeIndex, 1);
    }
    
    setSelectedShapes(newSelectedShapes);
  };

  const checkMatch = () => {
    const correctShapes = shapes.filter(
      (shape, index) =>
        shape.shape === targetShape &&
        shape.color === targetColor &&
        selectedShapes.includes(index)
    );

    const incorrectSelections = selectedShapes.filter(
      (index) =>
        shapes[index].shape !== targetShape || shapes[index].color !== targetColor
    );

    const score = correctShapes.length - incorrectSelections.length;
    setScore((prevScore) => Math.max(0, prevScore + score));
    startNewRound();
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    startNewRound();
  };

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return ''; // Add a check
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box sx={{
      textAlign: 'center',
      px: 2,
      py: { xs: 2, sm: 3, md: 4 },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 600,
      margin: 'auto',
    }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Shape Sorter</Typography>

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
        <Typography sx={{ fontWeight: 'bold' }}>Score: {score}</Typography>
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
        <Typography sx={{ fontWeight: 'bold' }}>{timeLeft}s</Typography>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Find all {colorNames[targetColor]} {targetShape && capitalizeFirstLetter(targetShape)}s
      </Typography>

      <Grid container spacing={1} sx={{ mb: 2 }}>
        {shapes.map((shape, index) => (
          <Grid item xs={3} key={index}>
            <ShapeComponent
              shape={shape.shape}
              color={shape.color}
              onClick={() => handleShapeClick(index)}
              selected={selectedShapes.includes(index)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 'auto' }}>
        <Button
          variant="contained"
          onClick={checkMatch}
          disabled={gameOver}
          sx={{
            fontSize: '1.1rem',
            py: 1.2,
            px: 4,
            borderRadius: 3,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            background: 'linear-gradient(45deg, #339af0 30%, #51cf66 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #51cf66 30%, #339af0 90%)',
            },
          }}
        >
          CHECK MATCH
        </Button>
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
    </Box>
  );
};

export default ShapeSorter;