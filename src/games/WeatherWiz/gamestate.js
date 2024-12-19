import { GAME_RULES, LEVEL_GOALS } from './types';
import { initializeGrid, applyGravity, calculatePoints } from './utils';

export const createInitialState = (level = 1) => ({
  currentLevel: level,
  grid: initializeGrid(level),
  score: 0,
  timeLeft: 60,
  combo: 0,
  matches: 0,
  selectedTiles: [],
  currentSum: 0,
  message: '',
  gameOver: false,
  levelProgress: {
    matches: 0,
    negatives: 0,
    combo: 0,
    speed: 0,
    points: 0,
    long_chain: 0
  }
});

export const handleLevelTransition = (currentState, onStateUpdate) => {
  const nextLevel = currentState.currentLevel + 1;
  const newState = createInitialState(nextLevel);
  const grid = initializeGrid(nextLevel);
  
  return {
    ...newState,
    grid,
    currentLevel: nextLevel
  };
};

export const processMatch = (state, matchedTiles, timestamp) => {
  const { grid, combo, levelProgress } = state;
  const points = calculatePoints(matchedTiles.length);
  const newCombo = timestamp - state.lastMatchTime < 2000 ? Math.min(combo + 1, 5) : 1;

  const newGrid = [...grid];
  matchedTiles.forEach(({ row, col }) => {
    newGrid[row][col] = null;
  });
  
  const updatedGrid = applyGravity(newGrid);
  
  return {
    grid: updatedGrid,
    score: state.score + points,
    combo: newCombo,
    lastMatchTime: timestamp,
    selectedTiles: [],
    currentSum: 0,
    levelProgress: {
      ...levelProgress,
      matches: levelProgress.matches + 1,
      points: levelProgress.points + points,
      combo: Math.max(levelProgress.combo, newCombo),
      long_chain: Math.max(levelProgress.long_chain, matchedTiles.length)
    }
  };
};

export const checkLevelCompletion = (state) => {
  if (!state || !state.currentLevel) return { isComplete: false, canAdvance: false };
  
  const goalIndex = Math.max(0, (state.currentLevel - 1) % LEVEL_GOALS.length);
  const currentGoal = LEVEL_GOALS[goalIndex];

  if (!currentGoal || !state.levelProgress) return { isComplete: false, canAdvance: false };

  const progress = state.levelProgress[currentGoal.type.toLowerCase()] || 0;
  const target = currentGoal.target;

  console.log('Level completion check:', {
    progress,
    target,
    currentLevel: state.currentLevel,
    score: state.score,
    isComplete: progress >= target,
    canAdvance: state.score >= GAME_RULES.MIN_SCORE_TO_ADVANCE
  });

  return {
    isComplete: progress >= target,
    canAdvance: state.score >= GAME_RULES.MIN_SCORE_TO_ADVANCE
  };
};