import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FaLightbulb, FaBullseye } from 'react-icons/fa';
import { GiMirrorMirror } from 'react-icons/gi';
import { motion } from 'framer-motion';

const GRID_SIZE = 5;
const INITIAL_MOVES = 3;

const MirrorReflectionPuzzle = () => {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(null))
  );
  const [moves, setMoves] = useState(INITIAL_MOVES);
  const [gameOver, setGameOver] = useState(false);
  const [beamPath, setBeamPath] = useState([]);
  const [beamPosition] = useState({ row: 0, col: 0 }); // Starting position of the beam

  const handleCellClick = (row, col) => {
    if (moves <= 0 || gameOver) return;

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = newGrid[row][col] === 'M' ? null : 'M'; // Toggle mirror
      return newGrid;
    });

    setMoves((prevMoves) => prevMoves - 1);
    updateBeamPath();
  };

  const updateBeamPath = () => {
    const path = [];
    const targetPosition = { row: GRID_SIZE - 1, col: GRID_SIZE - 1 }; // Target at bottom-right corner
    let currentRow = beamPosition.row;
    let currentCol = beamPosition.col;
    let direction = 'down'; // Beam starts by moving down

    while (
      currentRow >= 0 &&
      currentRow < GRID_SIZE &&
      currentCol >= 0 &&
      currentCol < GRID_SIZE
    ) {
      path.push({ row: currentRow, col: currentCol });

      if (grid[currentRow][currentCol] === 'M') {
        // Mirror logic: change direction based on current direction
        if (direction === 'down') direction = 'right';
        else if (direction === 'right') direction = 'up';
        else if (direction === 'up') direction = 'left';
        else if (direction === 'left') direction = 'down';
      }

      // Move the beam in the current direction
      if (direction === 'down') currentRow++;
      else if (direction === 'right') currentCol++;
      else if (direction === 'up') currentRow--;
      else if (direction === 'left') currentCol--;
    }

    setBeamPath(path);

    if (
      currentRow === targetPosition.row &&
      currentCol === targetPosition.col
    ) {
      setGameOver(true);
      alert('You win!');
    }
  };

  const restartGame = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(null))
    );
    setMoves(INITIAL_MOVES);
    setGameOver(false);
    setBeamPath([]);
  };

  return (
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Mirror Reflection Puzzle
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Mirrors Remaining: {moves}</Typography>
        <Typography variant="h6">
          {gameOver ? 'Game Over' : 'Place Mirrors to Reflect the Beam!'}
        </Typography>
      </Box>

      <Grid
        container
        spacing={1}
        sx={{
          width: GRID_SIZE * 60,
          height: GRID_SIZE * 60,
          margin: 'auto',
          position: 'relative',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Grid
              item
              key={`${rowIndex}-${colIndex}`}
              xs={1}
              sx={{
                width: 60,
                height: 60,
                border: '1px solid black',
                backgroundColor:
                  rowIndex === GRID_SIZE - 1 && colIndex === GRID_SIZE - 1
                    ? 'yellow' // Target position
                    : rowIndex === 0 && colIndex === 0
                    ? 'orange' // Starting position
                    : cell === 'M'
                    ? '#1976d2' // Mirror position
                    : '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {rowIndex === 0 && colIndex === 0 && (
                <FaLightbulb size={20} color="black" />
              )}
              {rowIndex === GRID_SIZE - 1 && colIndex === GRID_SIZE - 1 && (
                <FaBullseye size={20} color="red" />
              )}
              {cell === 'M' && <GiMirrorMirror size={25} color="white" />}
            </Grid>
          ))
        )}

        {/* Render the Beam Path with Animated Lines */}
        {beamPath.map((position, index) => {
          if (index === beamPath.length - 1) return null; // No line for last point

          const nextPosition = beamPath[index + 1];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: position.row * 60 + 30,
                left: position.col * 60 + 30,
                width:
                  nextPosition.col !== position.col
                    ? Math.abs(nextPosition.col - position.col) * 60
                    : 10,
                height:
                  nextPosition.row !== position.row
                    ? Math.abs(nextPosition.row - position.row) * 60
                    : 10,
                backgroundColor: '#ff0',
                transform:
                  nextPosition.col !== position.col
                    ? `translateY(-50%)`
                    : `translateX(-50%)`,
                borderRadius: '5px',
              }}
            />
          );
        })}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={updateBeamPath}
          sx={{ mt: 2, mr: 2 }}
        >
          Check Solution
        </Button>
        <Button variant="contained" onClick={restartGame} sx={{ mt: 2 }}>
          Restart Game
        </Button>
      </Box>
    </Box>
  );
};

export default MirrorReflectionPuzzle;
