import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AnimatedTile from './AnimatedTile';

const GameBoard = ({ grid, selectedTiles, onTileClick, isMatched }) => {
  const [fallDistances, setFallDistances] = useState({});
  const [matchedTiles, setMatchedTiles] = useState(new Set());
  const [lastMatchPoints, setLastMatchPoints] = useState({});

  useEffect(() => {
    const newFallDistances = {};
    grid.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        if (tile) {
          let distance = 0;
          for (let i = rowIndex + 1; i < grid.length; i++) {
            if (!grid[i][colIndex]) distance++;
          }
          newFallDistances[`${rowIndex}-${colIndex}`] = distance;
        }
      });
    });
    setFallDistances(newFallDistances);
  }, [grid]);

  useEffect(() => {
    if (isMatched && selectedTiles.length >= 3) {
      const newMatched = new Set();
      const points = {};
      selectedTiles.forEach(tile => {
        const key = `${tile.row}-${tile.col}`;
        newMatched.add(key);
        points[key] = 100;
      });
      setMatchedTiles(newMatched);
      setLastMatchPoints(points);

      setTimeout(() => {
        setMatchedTiles(new Set());
        setLastMatchPoints({});
      }, 500);
    }
  }, [selectedTiles, isMatched]);

  return (
    <Box
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
          row.map((tile, colIndex) => {
            const tileKey = `${rowIndex}-${colIndex}`;
            return (
              <AnimatedTile
                key={tileKey}
                tile={tile}
                isSelected={selectedTiles.some(
                  (t) => t.row === rowIndex && t.col === colIndex
                )}
                isPotentialMatch={false}
                isMatched={matchedTiles.has(tileKey)}
                points={lastMatchPoints[tileKey]}
                onTileClick={() => onTileClick(rowIndex, colIndex)}
                row={rowIndex}
                col={colIndex}
                fallDistance={fallDistances[tileKey]}
              />
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default GameBoard;