// src/components/WeatherWhiz/utils.js

import { GRID_SIZE, TILES, BOARD_SHAPES, GAME_RULES } from "./types";

export const getAttemptKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${Math.floor(
    now.getHours() / 6
  )}`;
};

export const loadGameState = () => {
  const savedState = localStorage.getItem("weatherWhizState");
  if (savedState) {
    const state = JSON.parse(savedState);
    const currentKey = getAttemptKey();
    if (state.attemptKey === currentKey) {
      return state;
    }
  }
  return {
    attemptKey: getAttemptKey(),
    attemptsRemaining: GAME_RULES.ATTEMPTS_PER_HOUR,
    currentLevel: 1,
    perfectScores: 0,
    highScores: [],
  };
};

export const saveGameState = (state) => {
  localStorage.setItem(
    "weatherWhizState",
    JSON.stringify({
      ...state,
      attemptKey: getAttemptKey(),
    })
  );
};

export const getBoardShape = (level, shape = "STANDARD") => {
  const baseGrid = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(true));

  switch (shape) {
    case "DIAMOND":
      for (let i = 0; i < GRID_SIZE; i++) {
        const edge = Math.abs(i - GRID_SIZE / 2);
        for (let j = 0; j < edge; j++) {
          baseGrid[i][j] = null;
          baseGrid[i][GRID_SIZE - 1 - j] = null;
        }
      }
      break;
    case "CROSS":
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (
            (i < GRID_SIZE / 3 || i >= (GRID_SIZE * 2) / 3) &&
            (j < GRID_SIZE / 3 || j >= (GRID_SIZE * 2) / 3)
          ) {
            baseGrid[i][j] = null;
          }
        }
      }
      break;
    case "H_SHAPE":
      for (let i = 0; i < GRID_SIZE; i++) {
        if (i < GRID_SIZE / 3 || i >= (GRID_SIZE * 2) / 3) {
          for (
            let j = Math.floor(GRID_SIZE / 3);
            j < Math.ceil((GRID_SIZE * 2) / 3);
            j++
          ) {
            baseGrid[i][j] = null;
          }
        }
      }
      break;
    case "HEXAGON":
      for (let i = 0; i < GRID_SIZE; i++) {
        const edge = Math.abs(i - GRID_SIZE / 2);
        for (let j = 0; j < edge / 2; j++) {
          baseGrid[i][j] = null;
          baseGrid[i][GRID_SIZE - 1 - j] = null;
        }
      }
      break;
    default:
      return baseGrid;
  }
  return baseGrid;
};

export const initializeGrid = (level, shape) => {
  // Choose a shape based on level
  const shapeIndex = (level - 1) % BOARD_SHAPES.length;
  const boardShape = getBoardShape(level, BOARD_SHAPES[shapeIndex]);

  return boardShape.map((row) =>
    row.map((cell) => {
      if (!cell) return null;

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
    // First move all existing tiles down
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

    // Fill ALL empty spaces from bottom to top
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      if (newGrid[row][col] === null) {
        const shouldAddLightning = Math.random() < TILES.LIGHTNING.probability;
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
  }

  return newGrid;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const calculatePoints = (numTiles) => {
  // Base points is 100 per tile
  return numTiles * 100;
};

export const generateMatchMessage = (points, combo) => {
  return `+${points} points! ${combo > 1 ? `${combo}x Combo!` : ""}`;
};

export const calculateScore = (gameState) => {
  const { matches, timeLeft, moveCount } = gameState;
  let score = GAME_RULES.MAX_POINTS;

  // Deduct for excess moves
  score -= Math.max(0, moveCount - matches) * 5;

  // Time bonus
  if (timeLeft > 45) score += 10;
  else if (timeLeft > 30) score += 5;

  return Math.min(score, GAME_RULES.MAX_POINTS);
};

export const checkLevelGoal = (gameState, levelGoal) => {
  const progress = gameState[levelGoal.type.toLowerCase()];
  return progress >= levelGoal.target;
};

export const canAdvanceLevel = (score) => {
  return score >= GAME_RULES.MIN_SCORE_TO_ADVANCE;
};

export const hasUnlockedBonus = (perfectScores) => {
  return perfectScores >= GAME_RULES.PERFECT_SCORES_FOR_BONUS;
};

export const getTimeUntilNextAttempt = () => {
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  return Math.floor((nextHour - now) / 1000); // Returns seconds until next hour
};
