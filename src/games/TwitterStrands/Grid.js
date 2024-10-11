import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import WordSubmit from './WordSubmit';

const GRID_ROWS = 8;
const GRID_COLS = 6;

const Grid = ({ grid, themeWords, spangram, onWordFound, gameOver, giveHint, hintCount }) => {
  // const [grid, setGrid] = useState([
  //   ["B", "I", "G", "M", "A", "C"],
  //   ["S", "H", "A", "P", "P", "Y"],
  //   ["F", "R", "I", "E", "S", "L"],
  //   ["N", "U", "G", "G", "E", "T"],
  //   ["M", "E", "A", "L", "S", "O"],
  //   ["S", "O", "D", "A", "K", "F"],
  //   ["H", "A", "P", "P", "Y", "M"],
  //   ["F", "R", "I", "E", "S", "L"]
  // ]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWordPaths, setFoundWordPaths] = useState([]); // Store paths for found words
  const [hintWord, setHintWord] = useState(null); // Track the word to highlight when hint is used

  const buttonRefs = useRef([]);
  const gridContainerRef = useRef(null);

  // Default to 6x6 grid if grid is undefined
  const GRID_ROWS = grid?.length || 8;
  const GRID_COLS = grid?.[0]?.length || 6;

  // UseEffect to trigger a hint
  useEffect(() => {
    if (hintCount > 0) {
      const hint = giveHint();
      if (hint) {
        setHintWord(hint); // Highlight the entire word when hint is provided
      }
    }
  }, [hintCount, giveHint]);

  const handleLetterClick = (letter, row, col) => {
    const isSelected = selectedCells.some(cell => cell.row === row && cell.col === col);

    // If the letter is already selected, unselect it
    if (isSelected) {
      setSelectedCells(selectedCells.filter(cell => !(cell.row === row && cell.col === col)));
    } else {
      setSelectedCells([...selectedCells, { letter, row, col }]);
    }
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

  if (!grid) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

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
                backgroundColor: hintWord?.includes(cell)
                  ? '#FFFF99' // Highlight the word revealed by hint in yellow
                  : isSpangram(rowIndex, colIndex)
                    ? '#FFD700' // Yellow for spangram
                    : isCellInFoundWord(rowIndex, colIndex)
                      ? '#ADD8E6' // Light blue for completed words
                      : selectedCells.some(c => c.row === rowIndex && c.col === colIndex)
                        ? 'lightgrey' // Grey for selected cells
                        : 'white', // Default white for unselected
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

      {/* Pass the current word to WordSubmit */}
      <WordSubmit onSubmit={handleSubmitWord} currentWord={getCurrentWord()} />
    </Box>
  );
};

export default Grid;