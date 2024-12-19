// src/components/WeatherWhiz/utils.js

import { GRID_SIZE, TILES } from './types';

export const initializeGrid = () => {
  return Array(GRID_SIZE)
    .fill()
    .map(() =>
      Array(GRID_SIZE)
        .fill()
        .map(() => {
          const isUmbrella = Math.random() < 0.3;
          const type = isUmbrella ? "UMBRELLA" : "RAINDROP";
          return {
            type,
            value: TILES[type].getRandomValue(),
            symbol: TILES[type].symbol,
            key: Math.random(),
          };
        })
    );
};

export const isAdjacent = (tile1, tile2) => {
  const rowDiff = Math.abs(tile1.row - tile2.row);
  const colDiff = Math.abs(tile1.col - tile2.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

export const applyGravity = (currentGrid) => {
  const newGrid = [...currentGrid];

  for (let col = 0; col < GRID_SIZE; col++) {
    let emptyRow = GRID_SIZE - 1;
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      if (newGrid[row][col] !== null) {
        if (row !== emptyRow) {
          newGrid[emptyRow][col] = newGrid[row][col];
          newGrid[row][col] = null;
        }
        emptyRow--;
      }
    }

    for (let row = emptyRow; row >= 0; row--) {
      const shouldAddLightning =
        Math.random() < TILES.LIGHTNING.probability;
      if (shouldAddLightning) {
        newGrid[row][col] = {
          type: "LIGHTNING",
          value: "wild",
          symbol: TILES.LIGHTNING.symbol,
          key: Math.random(),
        };
      } else {
        const isUmbrella = Math.random() < 0.3;
        const type = isUmbrella ? "UMBRELLA" : "RAINDROP";
        newGrid[row][col] = {
          type,
          value: TILES[type].getRandomValue(),
          symbol: TILES[type].symbol,
          key: Math.random(),
        };
      }
    }
  }

  return newGrid;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const calculatePoints = (numTiles, combo) => {
  const basePoints = Math.max(numTiles * 100, 100);
  return basePoints * combo;
};

export const generateMatchMessage = (points, combo) => {
  return `+${points} points! ${combo > 1 ? `${combo}x Combo!` : ""}`;
};