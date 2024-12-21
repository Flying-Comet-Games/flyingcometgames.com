import React, { useState } from "react";
import GridTile from "./GridTile";
import Buttons from "../Buttons";
import { Box, Typography } from "@mui/material";
import { generateRandomGrid, resetSelection } from "../../utils/gridUtils";
import Timer from "../Timer";

const GRID_SIZE = 5;

const Grid = () => {
  const [grid, setGrid] = useState(generateRandomGrid(GRID_SIZE));
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [currentSum, setCurrentSum] = useState(0);
  const [clearedSets, setClearedSets] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGridCleared, setIsGridCleared] = useState(false);

  const undoLastSelection = () => {
    if (selectedTiles.length === 0) return;

    const lastTile = selectedTiles[selectedTiles.length - 1];
    const newSelectedTiles = selectedTiles.slice(0, -1);
    const newSum = currentSum - lastTile.value;

    setSelectedTiles(newSelectedTiles);
    setCurrentSum(newSum);
  };

  const handleTileClick = (row, col) => {
    const value = grid[row][col];
    if (value === null) return;

    const isLastSelected =
      selectedTiles.length > 0 &&
      selectedTiles[selectedTiles.length - 1].row === row &&
      selectedTiles[selectedTiles.length - 1].col === col;

    if (isLastSelected) {
      undoLastSelection();
      return;
    }

    if (selectedTiles.length > 0) {
      const lastTile = selectedTiles[selectedTiles.length - 1];
      const isAdjacent =
        Math.abs(lastTile.row - row) + Math.abs(lastTile.col - col) === 1;

      if (!isAdjacent) {
        console.log("Tile is not adjacent");
        return;
      }
    }

    const newSelectedTiles = [...selectedTiles, { row, col, value }];
    const newSum = currentSum + value;

    setSelectedTiles(newSelectedTiles);
    setCurrentSum(newSum);

    if (newSum === 10) {
      clearSelectedTiles(newSelectedTiles);
    } else if (newSum > 10) {
      resetSelection(setSelectedTiles, setCurrentSum);
    }
  };

  const clearSelectedTiles = (tiles) => {
    setClearedSets((prevClearedSets) => [...prevClearedSets, tiles]);

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const isCleared = tiles.some(
            (tile) => tile.row === rowIndex && tile.col === colIndex
          );
          return isCleared ? null : value;
        })
      );
      return newGrid;
    });

    resetSelection(setSelectedTiles, setCurrentSum);

    if (grid.flat().every((tile) => tile === null)) {
      setIsGridCleared(true);
    }
  };

  const undoLastClearedSum = () => {
    if (clearedSets.length === 0) return;

    const lastClearedSet = clearedSets[clearedSets.length - 1];

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const restoredTile = lastClearedSet.find(
            (tile) => tile.row === rowIndex && tile.col === colIndex
          );
          return restoredTile ? restoredTile.value : value;
        })
      );
      return newGrid;
    });

    setClearedSets((prevClearedSets) => prevClearedSets.slice(0, -1));
  };

  const resetGame = () => {
    setGrid(generateRandomGrid(GRID_SIZE)); // Reset grid to initial state
    setSelectedTiles([]); // Clear current selections
    setCurrentSum(0); // Reset sum
    setClearedSets([]); // Clear cleared sets
    setIsGridCleared(false); // Reset grid cleared state
  };


  return (
    <Box sx={{ textAlign: "center" }}>
      <Timer
        timeElapsed={timeElapsed}
        setTimeElapsed={setTimeElapsed}
        isPaused={isGridCleared}
      />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Current Sum: {currentSum}
      </Typography>
      <Buttons
        onUndo={undoLastClearedSum}
        onClear={resetGame}
        undoDisabled={clearedSets.length === 0}
      />
      {isGridCleared ? (
        <Typography variant="h4" sx={{ color: "green", mt: 3 }}>
          🎉 You cleared the grid in {timeElapsed} seconds! 🎉
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
            gap: 1,
            justifyContent: "center",
            margin: "20px auto",
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <GridTile
                key={`${rowIndex}-${colIndex}`}
                value={value}
                row={rowIndex}
                col={colIndex}
                onClick={() => handleTileClick(rowIndex, colIndex)}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default Grid;
