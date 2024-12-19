// src/components/WeatherWhiz/types.js

export const GRID_SIZE = 6;
export const GAME_DURATION = 60;
export const TARGET_NUMBER = 10;
export const COMBO_TIME_WINDOW = 2000;

export const GAME_RULES = {
  ATTEMPTS_PER_LEVEL: 3, // Changed from per hour
  MAX_POINTS: 1000,
  MIN_SCORE_TO_ADVANCE: 300, // Lowered threshold
  MAX_LEVELS: 10,
  PERFECT_SCORES_FOR_BONUS: 3,
};

export const COLORS = {
  primary: "#2C5784",
  accent: "#7BA7BC",
  background: "#E8F1F2",
  text: "#1B3B5A",
};

export const LEVEL_GOALS = [
  { type: "MATCHES", target: 5, description: "Get 5 sums of 10" },
  { type: "NEGATIVES", target: 3, description: "Use umbrellas in 3 matches" },
  { type: "COMBO", target: 3, description: "Get a 3x combo" },
  { type: "POINTS", target: 500, description: "Score 500 points" },
  { type: "QUICK", target: 30, description: "Get 3 matches in 30 seconds" },
  { type: "LONG_CHAIN", target: 5, description: "Match 5 tiles in one move" },
  { type: "EXACT", target: 8, description: "Get exactly 8 matches" },
  {
    type: "EFFICIENCY",
    target: 90,
    description: "Score 90+ with minimal moves",
  },
  { type: "SPEED", target: 20, description: "Complete in 20 seconds" },
  { type: "MASTER", target: 1000, description: "Score 1000 points" },
];

export const BOARD_SHAPES = [
  "STANDARD",
  "DIAMOND",
  "CROSS",
  "HEXAGON",
  "H_SHAPE",
];

export const TILES = {
  RAINDROP: {
    symbol: "💧",
    getRandomValue: () => Math.floor(Math.random() * 5) + 1,
  },
  UMBRELLA: {
    symbol: "☔️",
    getRandomValue: () => -(Math.floor(Math.random() * 3) + 1),
  },
  LIGHTNING: {
    symbol: "⚡️",
    value: "wild",
    probability: 0.1,
  },
};
