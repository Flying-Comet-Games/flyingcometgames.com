export const GAME_MODES = [
  {
    type: "BASIC_SUM",
    target: 10,
    timeLimit: 60,
    description: "Get 5 sums of exactly 10",
    winCondition: (state) => state.matches >= 5,
  },
  {
    type: "TARGET_PRACTICE",
    target: 8,
    moveLimit: 15,
    description: "Hit target of 8 with limited moves",
    winCondition: (state) => state.score >= 500 && state.moves <= 15,
  },
  {
    type: "CHAIN",
    target: 10,
    minChainLength: 4,
    timeLimit: 60,
    description: "Create 3 chains of 4 or more",
    winCondition: (state) => state.longChains >= 3,
  },
];