import { useState, useEffect } from "react";
import { GRID_SIZE, BASE_SCORE, COLORS } from "../constants/config";
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

const calculateStars = (score) => {
  if (score >= 1500) return 3; // Expert level
  if (score >= 1200) return 2; // Intermediate level
  if (score >= 1000) return 1; // Basic completion
  return 0;
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

  const playInvalidSelectionAnimation = (row, col) => {
    const tileElement = document.querySelector(`.tile-${row}-${col}`);
    if (tileElement) {
      anime({
        targets: tileElement,
        translateX: [-10, 10, -10, 10, 0], // Shake horizontally
        duration: 300, // Total duration of the shake
        easing: "easeInOutQuad", // Smooth easing
      });
    }
  };

  const playCorrectAnimation = (tiles, onComplete) => {
    const targets = tiles.map(({ row, col }) => `.tile-${row}-${col}`);

    // Reset previous animation properties
    anime.set(targets, {
      translateX: 0,
      translateY: 0,
      backgroundColor: COLORS.background, // Explicitly set to avoid conflicts
      filter: "none", // Clear any previous filters
    });

    playScorePopUp(tiles);

    anime({
      targets: targets,
      backgroundColor: "#4CAF50",
      scale: [1, 1.2, 1],
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"], // Controlled brightness effect
      duration: 600,
      easing: "easeInOutQuad",
      delay: (el, i) => i * 100, // Uniform delay based on index
      complete: () => {
        // Reset backgroundColor and filter after animation
        anime.set(targets, {
          backgroundColor: COLORS.background, // Ensure tiles return to their default state
          filter: "none", // Remove any residual brightness
        });

        if (onComplete) onComplete();
      },
    });
  };

  const playIncorrectAnimation = (tiles) => {
    const targets = tiles.map(({ row, col }) => `.tile-${row}-${col}`);

    // Reset previous animation properties
    anime.set(targets, {
      translateX: 0,
      translateY: 0,
      backgroundColor: COLORS.background,
    });

    // Apply the aggressive shake animation
    anime({
      targets,
      backgroundColor: "#F44336",
      translateX: [0, -20, 20, -20, 20, -20, 20, 0], // Aggressive shake
      translateY: [0, -10, 10, -10, 10, -10, 10, 0],
      duration: 500, // Slightly longer duration for emphasis
      // easing: "easeOutExpo", // Jarring effect
      complete: () => {
        // Reset background color after animation
        anime.set(targets, {
          backgroundColor: COLORS.background,
        });
      },
    });
  };

  const playTileParticles = (row, col) => {
    const tileElement = document.querySelector(`.tile-${row}-${col}`);
    if (tileElement) {
      const { top, left, width, height } = tileElement.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      confetti({
        particleCount: 5, // Fewer particles for subtlety
        startVelocity: 10,
        spread: 50,
        scalar: 0.75, // Smaller particle size
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      });
    }
  };

  const playTileBounce = (row, col) => {
    const tileElement = document.querySelector(`.tile-${row}-${col}`);
    if (tileElement) {
      anime({
        targets: tileElement,
        scale: [1, 1.1, 1], // Small bounce
        duration: 300,
        easing: "easeOutElastic(1, 0.5)", // Elastic bounce effect
      });
    }
  };

  const applyTileColor = (tiles) => {
    tiles.forEach((tile, index) => {
      const tileElement = document.querySelector(
        `.tile-${tile.row}-${tile.col}`
      );
      if (tileElement) {
        const intensity = 0.5 + (index / tiles.length) * 0.5;
        tileElement.style.backgroundColor = `rgba(76, 175, 80, ${intensity})`;
      }
    });
  };

  const renderLines = (selectedTiles) => {
    if (selectedTiles.length < 2) return null;

    const lines = selectedTiles.slice(1).map((tile, index) => {
      const start = selectedTiles[index];
      const end = tile;

      return (
        <line
          key={`${start.row}-${start.col}-${end.row}-${end.col}`}
          x1={`${start.col * 100 + 50}px`}
          y1={`${start.row * 100 + 50}px`}
          x2={`${end.col * 100 + 50}px`}
          y2={`${end.row * 100 + 50}px`}
          stroke="rgba(76, 175, 80, 0.8)"
          strokeWidth="4"
        />
      );
    });

    return <svg>{lines}</svg>;
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
      const tileToDeselect = state.selectedTiles[selectedIndex];
      const tileElement = document.querySelector(
        `.tile-${tileToDeselect.row}-${tileToDeselect.col}`
      );
      if (tileElement) {
        tileElement.style.backgroundColor = COLORS.background; // Reset the background color
      }

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

    if (!isAdjacent(lastTile, currentTile)) {
      playInvalidSelectionAnimation(row, col);
      return; // Ignore selection
    }

    const newSum = state.currentSum + currentTile.value;

    if (newSum === currentMode.target) {
      // Correct sum: clear selectedTiles after handling match
      const updatedTiles = [...state.selectedTiles, currentTile];
      playCorrectAnimation(updatedTiles, () => {
        setState((prev) => {
          const newGrid = updateGridNumbers(prev.grid, updatedTiles);
          const resetTiles = updatedTiles.map(({ row, col }) => {
            const tileElement = document.querySelector(`.tile-${row}-${col}`);
            if (tileElement)
              tileElement.style.backgroundColor = COLORS.background;
          });

          const newMatches = prev.matches + 1;
          const isLevelComplete = newMatches >= 5;

          if (isLevelComplete) {
            confetti();
            return {
              ...prev,
              grid: createGrid(),
              selectedTiles: [],
              currentSum: 0,
              score: prev.score + BASE_SCORE * updatedTiles.length,
              matches: 0,
              level: prev.level + 1,
              timerStarted: false,
            };
          }

          return {
            ...prev,
            grid: newGrid,
            selectedTiles: [],
            currentSum: 0,
            score: prev.score + BASE_SCORE * updatedTiles.length,
            matches: newMatches,
          };
        });
      });
    } else if (newSum > currentMode.target) {
      // Too high: clear selection and reset
      const currentTiles = [...state.selectedTiles, currentTile];
      applyTileColor(currentTiles);

      setTimeout(() => {
        playIncorrectAnimation(currentTiles);
      }, 100);

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          selectedTiles: [],
          currentSum: 0,
        }));
      }, 700);
    } else {
      // Add tile to the chain
      const newSelectedTiles = [...state.selectedTiles, currentTile];
      applyTileColor(newSelectedTiles);
      playTileBounce(row, col);
      setState((prev) => ({
        ...prev,
        selectedTiles: newSelectedTiles,
        currentSum: newSum,
      }));
    }
  };

  const progress = getProgress(state, currentMode);
  const stars = calculateStars(state.score);

  return {
    state,
    currentMode,
    handleTileSelect,
    progress,
    renderLines,
    stars,
  };
};

const getProgress = (state, mode) => {
  switch (mode.type) {
    case "BASIC_SUM":
      return { current: state.matches, required: 5 };
    case "TARGET_PRACTICE":
      return { current: state.moves, required: mode.moveLimit };
    case "CHAIN":
      return { current: state.longChains, required: 3 };
    default:
      return null;
  }
};
