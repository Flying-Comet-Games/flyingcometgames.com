import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { logEvent, incrementGamesPlayed, incrementGamesCompleted } from '../analytics';

// Word list (you can expand this)
const wordList = [
  "REACT", "PUZZLE", "CODING", "JAVASCRIPT", "DEVELOPER",
  "ALGORITHM", "INTERFACE", "COMPONENT", "FUNCTION", "VARIABLE"
];

const WordWizard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute per round
  const [gameOver, setGameOver] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    incrementGamesPlayed('WordWizard');
    logEvent('Game', 'Start', 'WordWizard');
    const startTime = Date.now();
    selectNewWord();
    return () => {
      const sessionTime = (Date.now() - startTime) / 1000; // in seconds
      logEvent('Game', 'SessionTime', 'WordWizard', sessionTime);
    };
  }, []);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      incrementGamesCompleted('WordWizard');
      logEvent('Game', 'End', 'WordWizard', score);
    }
  }, [timeLeft, gameOver, score]);

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const selectNewWord = () => {
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(newWord);
    setScrambledWord(scrambleWord(newWord));
    setUserInput('');
    setHint('');
    logEvent('Game', 'NewWord', 'WordWizard', newWord);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    if (userInput === currentWord) {
      setScore(score + 1);
      selectNewWord();
      setTimeLeft(prev => Math.min(prev + 15, 60)); // Add 15 seconds, max 60
      logEvent('Game', 'CorrectGuess', 'WordWizard', currentWord);
    } else {
      setTimeLeft(prev => Math.max(prev - 5, 0)); // Subtract 5 seconds, min 0
      logEvent('Game', 'IncorrectGuess', 'WordWizard', currentWord);
    }
  };

  const handleShuffle = () => {
    setScrambledWord(scrambleWord(currentWord));
    logEvent('Game', 'Shuffle', 'WordWizard');
  };

  const handleHint = () => {
    if (hint === '') {
      setHint(currentWord[0]);
      setTimeLeft(prev => Math.max(prev - 10, 0)); // Subtract 10 seconds for using hint
      logEvent('Game', 'HintUsed', 'WordWizard');
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    selectNewWord();
    incrementGamesPlayed('WordWizard');
    logEvent('Game', 'Restart', 'WordWizard');
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
      <Typography variant="h4" sx={{ 
        fontSize: '2rem', 
        fontWeight: 800, 
        mb: 2,
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      }}>
        Word Wizard
      </Typography>

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
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Score: {score}</Typography>
        <Box sx={{ width: '50%', mx: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={(timeLeft / 60) * 100} 
            sx={{
              height: 10,
              borderRadius: 5,
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: `linear-gradient(90deg, 
                  ${timeLeft > 30 ? '#4caf50' : timeLeft > 10 ? '#ffc107' : '#f44336'} 0%, 
                  ${timeLeft > 30 ? '#45a049' : timeLeft > 10 ? '#ffb300' : '#e53935'} 100%)`,
              },
            }}
          />
        </Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{timeLeft}s</Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, letterSpacing: '0.1em' }}>
          {scrambledWord}
        </Typography>
        <TextField
          value={userInput}
          onChange={handleInputChange}
          variant="outlined"
          disabled={gameOver}
          sx={{ width: '100%', maxWidth: 300 }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <IconButton onClick={handleShuffle} disabled={gameOver}>
          <ShuffleIcon />
        </IconButton>
        <IconButton onClick={handleHint} disabled={gameOver || hint !== ''}>
          <LightbulbIcon />
        </IconButton>
      </Box>

      {hint && (
        <Typography sx={{ mb: 2 }}>
          Hint: The word starts with "{hint}"
        </Typography>
      )}

      <Box sx={{ mt: 'auto' }}>
        {gameOver ? (
          <Typography variant="h5" sx={{ mb: 2 }}>
            Game Over! Final Score: {score}
          </Typography>
        ) : (
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{ 
              fontSize: '1.1rem', 
              py: 1.2, 
              px: 4,
              borderRadius: 3,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              width: '100%',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Submit
          </Button>
        )}
        {gameOver && (
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
              background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #45a049 30%, #4CAF50 90%)',
                transform: 'scale(1.02)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Play Again
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default WordWizard;