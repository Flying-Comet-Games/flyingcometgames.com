// src/components/WeatherWhiz/GameBoard.js

import React from 'react';
import { Box, Button } from '@mui/material';
import { COLORS } from './types';

const GameBoard = ({ grid, selectedTiles, onTileClick }) => {
  return (
    <Box
      component="div"
      sx={{
        p: { xs: 1, sm: 2 },
        mb: 2,
        aspectRatio: "1",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gap: { xs: "4px", sm: "8px" },
          width: "100%",
          height: "100%",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onTileClick(rowIndex, colIndex)}
              sx={{
                width: "100%",
                height: "100%",
                minWidth: "unset",
                p: 0,
                backgroundColor: selectedTiles.some(
                  (t) => t.row === rowIndex && t.col === colIndex
                )
                  ? COLORS.accent
                  : "white",
                position: "relative",
                border: "1px solid rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: selectedTiles.some(
                    (t) => t.row === rowIndex && t.col === colIndex
                  )
                    ? COLORS.accent
                    : COLORS.background,
                },
              }}
            >
              {tile && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "clamp(1rem, 4vw, 1.2rem)", lineHeight: 1 }}>
                    {tile.symbol}
                  </span>
                  <Box sx={{ fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)", fontWeight: "bold", lineHeight: 1 }}>
                    {tile.value === "wild" ? "★" : tile.value}
                  </Box>
                </Box>
              )}
            </Button>
          ))
        )}
      </Box>
    </Box>
  );
};

export default GameBoard;