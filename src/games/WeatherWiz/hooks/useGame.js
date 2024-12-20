import { useState, useEffect } from "react";
import { GRID_SIZE, BASE_SCORE } from "../constants/config";
import { GAME_MODES } from "../constants/gameModes";
import anime from "animejs";
import confetti from "canvas-confetti";

const createGrid = () => {
  return Array(GRID_SIZE)
    .fill()
    .map(() =>
      Array(GRID_SIZE)
        .fill()
        .map(() => ({
          value: Math.floor(Math.random() * 5) + 1,
          id: Math.random(),
        }))
    );
};

const updateGridNumbers = (grid, matchedTiles) => {
  const newGrid = grid.map((row, rowIndex) =>
    row.map((tile, colIndex) => {
      const isMatched = matchedTiles.some(
        (matched) => matched.row === rowIndex && matched.col === colIndex
      );
      return isMatched
        ? { ...tile, value: Math.floor(Math.random() * 5) + 1 }
        : tile;
    })
  );
  return newGrid;
};

const initialState = {
  grid: createGrid(),
  score: 0,
  moves: 0,
  matches: 0,
  longChains: 0,
  selectedTiles: [],
  currentSum: 0,
  level: 1,
  timeLeft: 60,
  gameOver: false,
  timerStarted: false,
};

export const useGame = () => {
  const [state, setState] = useState(initialState);
  const currentMode = GAME_MODES[(state.level - 1) % GAME_MODES.length];

  useEffect(() => {
    if (!currentMode.timeLimit || state.timerStarted) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (!prev.timerStarted) {
          clearInterval(timer);
          return prev;
        }
        return {
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1),
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentMode, state.timerStarted]);

  const isAdjacent = (lastTile, currentTile) => {
    if (!lastTile) return true; // First tile can be any tile
    const dx = Math.abs(lastTile.row - currentTile.row);
    const dy = Math.abs(lastTile.col - currentTile.col);
    return dx + dy === 1; // Ensure tiles are directly adjacent
  };

  const playScorePopUp = (tiles) => {
    tiles.forEach(({ row, col }) => {
      const tileElement = document.querySelector(`.tile-${row}-${col}`);
      if (tileElement) {
        const scorePopup = document.createElement("div");
        scorePopup.textContent = `+${BASE_SCORE}`;
        scorePopup.style.position = "absolute";
        scorePopup.style.color = "#FFD700";
        scorePopup.style.fontSize = "1.2rem";
        scorePopup.style.fontWeight = "bold";
        scorePopup.style.pointerEvents = "none";
        scorePopup.style.transform = "translate(-50%, -50%)";
        tileElement.appendChild(scorePopup);

        anime({
          targets: scorePopup,
          translateY: -50,
          opacity: [1, 0],
          duration: 1000,
          easing: "easeOutQuad",
          complete: () => scorePopup.remove(),
        });
      }
    });
  };

  const playCorrectAnimation = (tiles, onComplete) => {
    playScorePopUp(tiles);
    anime({
      targets: tiles.map(({ row, col }) => `.tile-${row}-${col}`),
      backgroundColor: "#4CAF50",
      scale: [1, 1.2, 1],
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
      duration: 600,
      easing: "easeInOutQuad",
      delay: (el, i) => i * 100, // Uniform delay based on index
      complete: () => {
        // Ensure onComplete is triggered only after the last tile
        if (onComplete) onComplete();
      },
    });
  };

  const playIncorrectAnimation = (tiles) => {
    tiles.forEach(({ row, col }) => {
      anime({
        targets: `.tile-${row}-${col}`,
        backgroundColor: "#F44336",
        translateX: [0, -10, 10, -10, 0],
        translateY: [0, -5, 5, -5, 0], // Add vertical shake
        duration: 600,
        easing: "easeInOutQuad",
        complete: () => {
          const tileElement = document.querySelector(`.tile-${row}-${col}`);
          if (tileElement) {
            tileElement.style.transition = "background-color 0.3s ease";
            tileElement.style.backgroundColor = "white";
          }
        },
      });
    });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#4CAF50", "#FFEB3B", "#2196F3"],
      shapes: ["circle", "square"],
    });
  };

  const handleTileSelect = (row, col) => {
    if (state.gameOver) return;

    if (!state.timerStarted) {
      setState((prev) => ({ ...prev, timerStarted: true }));
    }

    const currentTile = { row, col, value: state.grid[row][col].value };
    const lastTile = state.selectedTiles[state.selectedTiles.length - 1];

    // Check if the tile is already selected to undo selection
    const selectedIndex = state.selectedTiles.findIndex(
      (tile) => tile.row === row && tile.col === col
    );

    if (selectedIndex !== -1) {
      const newSelectedTiles = state.selectedTiles.slice(0, selectedIndex);
      const newSum = newSelectedTiles.reduce(
        (sum, tile) => sum + tile.value,
        0
      );
      setState((prev) => ({
        ...prev,
        selectedTiles: newSelectedTiles,
        currentSum: newSum,
      }));
      return;
    }

    if (!isAdjacent(lastTile, currentTile)) return; // Ignore non-adjacent tiles

    const newSum = state.currentSum + currentTile.value;

    if (newSum === currentMode.target) {
      // Correct sum: clear selectedTiles after handling match
      const updatedTiles = [...state.selectedTiles, currentTile];
      playCorrectAnimation(updatedTiles, () => {
        setState((prev) => {
          const newGrid = updateGridNumbers(prev.grid, updatedTiles);
          const resetTiles = updatedTiles.map(({ row, col }) => {
            const tileElement = document.querySelector(`.tile-${row}-${col}`);
            if (tileElement) tileElement.style.backgroundColor = "white";
          });

          const newMatches = prev.matches + 1;
          const isLevelComplete = newMatches >= 5; // Fixed to match win condition

          if (isLevelComplete) {
            triggerConfetti();
            return {
              ...prev,
              grid: createGrid(),
              selectedTiles: [],
              currentSum: 0,
              score: prev.score + BASE_SCORE * updatedTiles.length,
              matches: 0, // Reset matches for the next level
              level: prev.level + 1, // Advance to the next level
              timerStarted: false, // Reset timer for the next level
            };
          }

          return {
            ...prev,
            grid: newGrid,
            selectedTiles: [],
            currentSum: 0,
            score: prev.score + BASE_SCORE * updatedTiles.length,
            matches: newMatches, // Update matches for progress tracking
          };
        });
      });
    } else if (newSum > currentMode.target) {
      // Too high: clear selection and reset
      const currentTiles = [...state.selectedTiles, currentTile];
      playIncorrectAnimation(currentTiles);
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          selectedTiles: [],
          currentSum: 0,
        }));
      }, 700); // Delay to allow animation
    } else {
      // Add tile to the chain
      setState((prev) => ({
        ...prev,
        selectedTiles: [...prev.selectedTiles, currentTile],
        currentSum: newSum,
      }));
    }
  };

  const progress = getProgress(state, currentMode);

  return {
    state,
    currentMode,
    handleTileSelect,
    progress,
  };
};

const getProgress = (state, mode) => {
  switch (mode.type) {
    case "BASIC_SUM":
      return { current: state.matches, required: 5 }; // Updated to reflect match count, not target sum
    case "TARGET_PRACTICE":
      return { current: state.moves, required: mode.moveLimit };
    case "CHAIN":
      return { current: state.longChains, required: 3 };
    default:
      return null;
  }
};
