// src/games/WordyVerse/components/GameBoard/GameGrid.js
import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const shakeTiles = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  40% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const flipTile = keyframes`
  0% { transform: rotateX(0); }
  50% { transform: rotateX(90deg); }
  100% { transform: rotateX(0); }
`;

const GameGrid = ({ wordData, guesses, currentGuess, getLetterBGColor }) => {
  const renderGrid = () => {
    if (!wordData) return null;

    const rows = 5;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < wordData.word.length; j++) {
        let letter = "";
        let bgcolor = "white";
        let fontColor = "black";
        let isRevealed = false;

        if (i < guesses.length) {
          letter = guesses[i][j];
          [bgcolor, fontColor] = getLetterBGColor(letter, j, true, i);
          isRevealed = true;
        } else if (i === guesses.length && j < currentGuess.length) {
          letter = currentGuess[j];
        }

        row.push(
          <Box
            key={`${i}-${j}`}
            sx={{
              width: 60,
              height: 60,
              border: "2px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: bgcolor,
              color: fontColor,
              fontSize: "2rem",
              fontWeight: "bold",
              m: 0.5,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              animation: isRevealed
                ? `${flipTile} 0.6s ${j * 0.1}s`
                : letter
                ? `${popIn} 0.1s ease-in-out`
                : "none",
              "&.shake": {
                animation: `${shakeTiles} 0.3s ease-in-out`,
              },
            }}
          >
            {letter}
          </Box>
        );
      }
      grid.push(
        <Box key={i} sx={{ display: "flex", justifyContent: "center" }}>
          {row}
        </Box>
      );
    }
    return grid;
  };

  return <>{renderGrid()}</>;
};

export default GameGrid;