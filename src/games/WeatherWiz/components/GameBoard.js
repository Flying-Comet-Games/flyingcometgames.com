import React from "react";
import { Box } from "@mui/material";
import Tile from "./Tile";

const GameBoard = ({ grid, selectedTiles, onTileSelect }) => {
  const isSelected = (row, col) =>
    selectedTiles.some((tile) => tile.row === row && tile.col === col);

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
          gap: { xs: "4px", sm: "8px" },
          width: "100%",
          height: "100%",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={tile.id}
              value={tile.value}
              isSelected={isSelected(rowIndex, colIndex)}
              onClick={() => onTileSelect(rowIndex, colIndex)}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default GameBoard;
