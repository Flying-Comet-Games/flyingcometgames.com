import React, { useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import WordSubmit from './WordSubmit';

const GRID_ROWS = 8;
const GRID_COLS = 6;

const Grid = ({ themeWords, spangram, onWordFound, gameOver }) => {
  const [grid, setGrid] = useState([
    ['L', 'I', 'U', 'B', 'H', 'C'],
    ['D', 'R', 'O', 'T', 'I', 'T'],
    ['P', 'N', 'I', 'O', 'T', 'P'],
    ['G', 'K', 'F', 'D', 'Y', 'E'],
    ['E', 'C', 'O', 'U', 'O', 'P'],
    ['T', 'C', 'A', 'N', 'R', 'C'],
    ['H', 'H', 'D', 'E', 'I', 'N'],
    ['E', 'T', 'A', 'V', 'O', 'N']
  ]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWordPaths, setFoundWordPaths] = useState([]); // Store paths for found words
  const buttonRefs = useRef([]);
  const gridContainerRef = useRef(null);

  const handleLetterClick = (letter, row, col) => {
    if (selectedCells.some(cell => cell.row === row && cell.col === col)) return;
    setSelectedCells([...selectedCells, { letter, row, col }]);
  };

  const handleSubmitWord = (word) => {
    const currentWord = word.toUpperCase();

    if (themeWords.includes(currentWord)) {
      setFoundWordPaths([...foundWordPaths, { path: selectedCells, isSpangram: false }]); // Store word path
      onWordFound(currentWord);
    } else if (currentWord === spangram) {
      setFoundWordPaths([...foundWordPaths, { path: selectedCells, isSpangram: true }]); // Store spangram path
      onWordFound(spangram);
    }

    setSelectedCells([]); // Reset selected cells after submitting
  };

  const getCellPosition = (row, col) => {
    const button = buttonRefs.current[row * GRID_COLS + col];
    const container = gridContainerRef.current;

    if (button && container) {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      return {
        x: buttonRect.left - containerRect.left + buttonRect.width / 2,
        y: buttonRect.top - containerRect.top + buttonRect.height / 2,
      };
    }
    return { x: 0, y: 0 };
  };

  const isCellInFoundWord = (row, col) => {
    return foundWordPaths.some(({ path }) =>
      path.some(cell => cell.row === row && cell.col === col)
    );
  };

  const isSpangram = (row, col) => {
    return foundWordPaths.some(({ path, isSpangram }) =>
      path.some(cell => cell.row === row && cell.col === col) && isSpangram
    );
  };

  const getCurrentWord = () => selectedCells.map(cell => cell.letter).join('');

  return (
    <Box ref={gridContainerRef} sx={{ position: 'relative', maxWidth: 360, margin: 'auto' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gap: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              ref={el => (buttonRefs.current[rowIndex * GRID_COLS + colIndex] = el)}
              onClick={() => handleLetterClick(cell, rowIndex, colIndex)}
              sx={{
                width: '48px',
                height: '48px',
                minWidth: '48px',
                borderRadius: '50%',
                fontWeight: 'bold',
                padding: 0,
                backgroundColor: isSpangram(rowIndex, colIndex)
                  ? '#FFD700' // Yellow for spangram
                  : isCellInFoundWord(rowIndex, colIndex)
                    ? '#ADD8E6' // Light blue for completed words
                    : selectedCells.some(c => c.row === rowIndex && c.col === colIndex)
                      ? 'lightgrey' // Grey for selected cells
                      : 'white',
                color: 'black', // Keep letters visible
                '&:hover': {
                  backgroundColor: 'lightgray',
                },
              }}
            >
              {cell}
            </Button>
          ))
        )}
      </Box>

      {/* SVG for connecting lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }} width="100%" height="100%">
        {/* Lines for found words (turn light blue when word is found) */}
        {foundWordPaths.map(({ path, isSpangram }, index) =>
          path.slice(0, -1).map((cell, idx) => {
            const nextCell = path[idx + 1];
            const from = getCellPosition(cell.row, cell.col);
            const to = getCellPosition(nextCell.row, nextCell.col);
            return (
              <line
                key={`${index}-${idx}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isSpangram ? '#FFD700' : '#ADD8E6'} // Softer yellow for spangram lines, light blue for others
                strokeWidth="4"
              />
            );
          })
        )}

        {/* Current selection line (grey for selected cells) */}
        {selectedCells.length > 1 &&
          selectedCells.slice(0, -1).map((cell, index) => {
            const nextCell = selectedCells[index + 1];
            const from = getCellPosition(cell.row, cell.col);
            const to = getCellPosition(nextCell.row, nextCell.col);
            return (
              <line
                key={index}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="grey" // Grey for selected cells
                strokeWidth="4"
              />
            );
          })}
      </svg>

      {/* Show Submit button only if the game is not over */}
      {!gameOver && <WordSubmit onSubmit={handleSubmitWord} currentWord={getCurrentWord()} />}
    </Box>
  );
};

export default Grid;