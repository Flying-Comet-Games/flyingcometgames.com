// src/components/WeatherWhiz/types.js

export const GRID_SIZE = 6;
export const GAME_DURATION = 60;
export const TARGET_NUMBER = 10;
export const COMBO_TIME_WINDOW = 2000;

export const COLORS = {
  primary: "#2C5784",
  accent: "#7BA7BC",
  background: "#E8F1F2",
  text: "#1B3B5A",
};

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