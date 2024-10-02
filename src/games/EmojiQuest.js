import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { bounceAnimation } from './gameUtils';

const GRID_SIZE = 8;
const MAX_MOVES_BASE = 25;

const EMOJI_TYPES = {
  HERO: '🤠',
  TREASURE: '🏆',
  WALL: '🧱',
  WATER: '🌊',
  FIRE: '🔥',
  GHOST: '👻',
  KEY: '🗝️',
  LOCK: '🔒',
  SPIKES: '🗡️',
  BRIDGE: '🌉',
};

const EmojiQuest = () => {
  const theme = useTheme();
  const [grid, setGrid] = useState([]);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [level, setLevel] = useState(1);
  const [fog, setFog] = useState(true);
  const [hasKey, setHasKey] = useState(false); // Track if the player has a key

  useEffect(() => {
    startNewGame();
  }, [level]);

  const startNewGame = () => {
    let newGrid;

    do {
      newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(''));
      newGrid[0][0] = EMOJI_TYPES.HERO;
      newGrid[GRID_SIZE - 1][GRID_SIZE - 1] = EMOJI_TYPES.TREASURE;
      placeBasicObstacles(newGrid, level);
    } while (!isPathAvailable(newGrid, [0, 0], [GRID_SIZE - 1, GRID_SIZE - 1]));

    placeLocksAndKeysWithValidation(newGrid, level);

    setGrid(newGrid);
    setPlayerPosition([0, 0]);
    setMoves(0);
    setGameOver(false);
    setWin(false);
    setFog(level >= 3); // Enable fog of war from level 3 onwards
    setHasKey(false); // Reset key state
  };

  const placeBasicObstacles = (grid, level) => {
    const obstacleEmojis = [EMOJI_TYPES.WALL, EMOJI_TYPES.WATER, EMOJI_TYPES.FIRE];

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (i === 0 && j === 0) continue; // Skip starting position
        if (i === GRID_SIZE - 1 && j === GRID_SIZE - 1) continue; // Skip treasure position

        if (Math.random() < 0.1 + level * 0.02) {
          grid[i][j] = obstacleEmojis[Math.floor(Math.random() * obstacleEmojis.length)];
        }
      }
    }
  };

  const placeLocksAndKeysWithValidation = (grid, level) => {
    let keyPositions = [];
    let lockPositions = [];
    let attempts = 0;

    while (attempts < 20) {
      attempts++;
      // Clear previous key and lock placements
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (grid[i][j] === EMOJI_TYPES.KEY || grid[i][j] === EMOJI_TYPES.LOCK) {
            grid[i][j] = '';
          }
        }
      }

      // Place keys and locks with a balance
      keyPositions = [];
      lockPositions = [];
      let placedKeys = 0, placedLocks = 0;

      // Place keys first
      while (placedKeys < level) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);

        if (grid[x][y] === '') {
          grid[x][y] = EMOJI_TYPES.KEY;
          keyPositions.push([x, y]);
          placedKeys++;
        }
      }

      // Place locks after keys
      while (placedLocks < level) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);

        if (grid[x][y] === '') {
          grid[x][y] = EMOJI_TYPES.LOCK;
          lockPositions.push([x, y]);
          placedLocks++;
        }
      }

      // Validate that each lock is accessible after collecting a corresponding key
      if (validateKeyLockPaths(grid, keyPositions, lockPositions)) {
        break;
      }
    }
  };

  const validateKeyLockPaths = (grid, keyPositions, lockPositions) => {
    for (const lock of lockPositions) {
      let keyFound = false;
      for (const key of keyPositions) {
        if (isPathAvailable(grid, [0, 0], key) && isPathAvailable(grid, key, lock)) {
          keyFound = true;
          break;
        }
      }
      if (!keyFound) return false;
    }
    return true;
  };

  const isPathAvailable = (grid, start, end) => {
    const queue = [start];
    const visited = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false));
    visited[start[0]][start[1]] = true;

    const directions = [
      [1, 0], // down
      [-1, 0], // up
      [0, 1], // right
      [0, -1], // left
    ];

    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (x === end[0] && y === end[1]) {
        return true; // Reached the end point
      }

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < GRID_SIZE &&
          newY >= 0 &&
          newY < GRID_SIZE &&
          !visited[newX][newY] &&
          ![EMOJI_TYPES.WALL, EMOJI_TYPES.WATER, EMOJI_TYPES.FIRE, EMOJI_TYPES.LOCK].includes(grid[newX][newY])
        ) {
          queue.push([newX, newY]);
          visited[newX][newY] = true;
        }
      }
    }

    return false; // No path found
  };

  const movePlayer = (dx, dy) => {
    if (gameOver) return;

    const [x, y] = playerPosition;
    const newX = x + dx;
    const newY = y + dy;

    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) {
      setSnackbarMessage('You hit the boundary!');
      setShowSnackbar(true);
      return;
    }

    const targetCell = grid[newX][newY];

    if (targetCell === EMOJI_TYPES.LOCK && !hasKey) {
      setSnackbarMessage('You need a key to unlock this path!');
      setShowSnackbar(true);
      return;
    }

    if ([EMOJI_TYPES.WALL, EMOJI_TYPES.WATER, EMOJI_TYPES.FIRE].includes(targetCell)) {
      setSnackbarMessage('You hit an obstacle!');
      setShowSnackbar(true);
      return;
    }

    if (targetCell === EMOJI_TYPES.GHOST) {
      setSnackbarMessage('A ghost caught you! Game Over.');
      setGameOver(true);
      setShowSnackbar(true);
      return;
    }

    if (targetCell === EMOJI_TYPES.KEY) {
      setSnackbarMessage('You found a key!');
      setHasKey(true);
      setShowSnackbar(true);
    }

    if (targetCell === EMOJI_TYPES.LOCK && hasKey) {
      setSnackbarMessage('You unlocked the lock!');
      setHasKey(false); // Use the key
      setShowSnackbar(true);
    }

    const newGrid = [...grid];
    newGrid[x][y] = '';
    newGrid[newX][newY] = EMOJI_TYPES.HERO;

    setPlayerPosition([newX, newY]);
    setGrid(newGrid);
    setMoves(moves + 1);

    if (newX === GRID_SIZE - 1 && newY === GRID_SIZE - 1) {
      setWin(true);
      setGameOver(true);
      setSnackbarMessage(`Congratulations! You found the treasure in ${moves + 1} moves!`);
      setShowSnackbar(true);
      if (level < 5) {
        setLevel(level + 1); // Move to next level
      }
    } else if (moves + 1 >= MAX_MOVES_BASE + level * 5) {
      setGameOver(true);
      setSnackbarMessage(`Game over! You used all ${MAX_MOVES_BASE + level * 5} moves.`);
      setShowSnackbar(true);
    }
  };

  const renderGridCell = (cell, isVisible) => (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '1',
        backgroundColor: isVisible ? (cell ? theme.palette.background.paper : theme.palette.grey[100]) : theme.palette.grey[300],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: cell === EMOJI_TYPES.HERO ? `${bounceAnimation} 1s infinite` : 'none',
        transition: 'background-color 0.3s',
        border: '1px solid',
        borderColor: theme.palette.divider,
      }}
    >
      <Typography variant="h4" sx={{ lineHeight: 1 }}>{isVisible ? cell : ''}</Typography>
    </Box>
  );

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Cowboy Quest - Level {level}</Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="body2" align="left">
          Guide the hero 🤠 to the treasure 🏆.<br/>
          Avoid obstacles and enemies, collect keys to unlock paths, and plan your moves wisely!
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ color: theme.palette.primary.main }}>Moves: {moves}/{MAX_MOVES_BASE + level * 5}</Typography>
        {gameOver && (
          <Typography sx={{ color: win ? theme.palette.success.main : theme.palette.error.main }}>
            {win ? 'You Win!' : 'Game Over'}
          </Typography>
        )}
      </Box>

      <Grid container spacing={0.5} sx={{ width: '100%', maxWidth: 400, margin: 'auto', mb: 2 }}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Grid item xs={1.5} key={`${i}-${j}`}>
              {renderGridCell(cell, !fog || Math.abs(playerPosition[0] - i) <= 1 && Math.abs(playerPosition[1] - j) <= 1)}
            </Grid>
          ))
        )}
      </Grid>

      <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => movePlayer(-1, 0)} sx={{ mb: 1 }}>
            Up
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => movePlayer(0, -1)}>
            Left
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => movePlayer(0, 1)}>
            Right
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => movePlayer(1, 0)} sx={{ mt: 1 }}>
            Down
          </Button>
        </Grid>
      </Grid>

      <Button variant="contained" onClick={() => setLevel(1)} sx={{ mb: 2 }}>
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

export default EmojiQuest;
