import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import UndoIcon from '@mui/icons-material/Undo';
import { logEvent, incrementGamesPlayed, incrementGamesCompleted } from '../analytics';

const DigitShift = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [gameOver, setGameOver] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [correctTiles, setCorrectTiles] = useState(new Set());

  useEffect(() => {
    incrementGamesPlayed('DigitShift');
    logEvent('Game', 'Start', 'DigitShift');
    const startTime = Date.now();
    return () => {
      const sessionTime = (Date.now() - startTime) / 1000; // in seconds
      logEvent('Game', 'SessionTime', 'DigitShift', sessionTime);
    };
  }, []);

  const initializeBoard = () => {
    let numbers = Array.from({length: 15}, (_, i) => i + 1);
    numbers.push(null); // Empty space
    numbers = shuffleArray(numbers);
    setBoard(numbers);
    setMoveHistory([]);
    updateCorrectTiles(numbers);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (!gameOver && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      logEvent('Game', 'TimeUp', 'DigitShift', moves);
    }
  }, [timeLeft, gameOver, moves]);

  useEffect(() => {
    if (isBoardSolved()) {
      setIsSolved(true);
      setGameOver(true);
      incrementGamesCompleted('DigitShift');
      logEvent('Game', 'Complete', 'DigitShift', moves);
    }
  }, [board, moves]);

  const isBoardSolved = () => {
    for (let i = 0; i < 15; i++) {
      if (board[i] !== i + 1) return false;
    }
    return board[15] === null;
  };

  const updateCorrectTiles = (currentBoard) => {
    const correct = new Set();
    for (let i = 0; i < 16; i++) {
      if (currentBoard[i] === i + 1 || (i === 15 && currentBoard[i] === null)) {
        correct.add(i);
      }
    }
    setCorrectTiles(correct);
  };

  const handleTileClick = (index) => {
    if (gameOver) return;

    const emptyIndex = board.indexOf(null);
    if (canMove(index, emptyIndex)) {
      const newBoard = [...board];
      [newBoard[index], newBoard[emptyIndex]] = [newBoard[emptyIndex], newBoard[index]];
      setBoard(newBoard);
      setMoves(moves + 1);
      setMoveHistory([...moveHistory, { from: index, to: emptyIndex }]);
      updateCorrectTiles(newBoard);
      logEvent('Game', 'Move', 'DigitShift', moves + 1);
    }
  };

  const canMove = (index, emptyIndex) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const handleRestart = () => {
    initializeBoard();
    setMoves(0);
    setTimeLeft(300);
    setGameOver(false);
    setIsSolved(false);
    incrementGamesPlayed('DigitShift');
    logEvent('Game', 'Restart', 'DigitShift');
  };

  const handleUndo = () => {
    if (moveHistory.length > 0) {
      const lastMove = moveHistory[moveHistory.length - 1];
      const newBoard = [...board];
      [newBoard[lastMove.from], newBoard[lastMove.to]] = [newBoard[lastMove.to], newBoard[lastMove.from]];
      setBoard(newBoard);
      setMoves(moves - 1);
      setMoveHistory(moveHistory.slice(0, -1));
      updateCorrectTiles(newBoard);
      logEvent('Game', 'Undo', 'DigitShift', moveHistory.length);
    }
  };

  const handleHint = () => {
    const emptyIndex = board.indexOf(null);
    const possibleMoves = [
      emptyIndex - 4, emptyIndex + 4,
      emptyIndex % 4 !== 0 ? emptyIndex - 1 : -1,
      emptyIndex % 4 !== 3 ? emptyIndex + 1 : -1
    ].filter(i => i >= 0 && i < 16);

    const randomMoveIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    handleTileClick(randomMoveIndex);
    logEvent('Game', 'Hint', 'DigitShift', moves);
  };

  const getTimeColor = () => {
    const percentage = timeLeft / 300;
    if (percentage > 0.6) return '#4caf50';
    if (percentage > 0.3) return '#ffc107';
    return '#f44336';
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
        Digit Shift
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
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Moves: {moves}</Typography>
        <Box sx={{ width: '50%', mx: 2 }}>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / 300) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: `linear-gradient(90deg, ${getTimeColor()} 0%, ${getTimeColor()} 100%)`,
              },
            }}
          />
        </Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Typography>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        mb: 2,
        aspectRatio: '1 / 1',
        width: '100%',
        maxWidth: 400,
        margin: 'auto'
      }}>
        {board.map((number, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleTileClick(index)}
            disabled={gameOver || number === null}
            sx={{
              aspectRatio: '1 / 1',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              bgcolor: number ? (correctTiles.has(index) ? '#4caf50' : '#2196F3') : 'rgba(0,0,0,0.1)',
              color: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: number ? (correctTiles.has(index) ? '#45a049' : '#1e88e5') : 'rgba(0,0,0,0.2)',
                transform: 'scale(1.05)',
              },
              '&.Mui-disabled': {
                bgcolor: number ? (correctTiles.has(index) ? '#4caf50' : '#2196F3') : 'rgba(0,0,0,0.1)',
                color: 'white',
              },
              border: number === null ? '2px dashed rgba(255,255,255,0.5)' : 'none',
            }}
          >
            {number}
          </Button>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <IconButton onClick={handleUndo} disabled={moveHistory.length === 0 || gameOver}>
          <UndoIcon />
        </IconButton>
        <IconButton onClick={handleHint} disabled={gameOver}>
          <ShuffleIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        {gameOver && (
          <Typography variant="h5" sx={{ mb: 2 }}>
            {isSolved ? `Congratulations! You solved it in ${moves} moves.` : "Time's up!"}
          </Typography>
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
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
              transform: 'scale(1.02)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {gameOver ? 'Play Again' : 'Restart'}
        </Button>
      </Box>
    </Box>
  );
};

export default DigitShift;