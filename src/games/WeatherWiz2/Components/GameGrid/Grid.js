import React from "react";
import GridTile from "./GridTile";
import { Box } from "@mui/material";

const hardcodedGrid = [
  [2, 1, 4, 4, 3],
  [2, 1, 3, 5, 3],
  [3, 2, 5, 1, 2],
  [4, 1, 4, 2, 5],
  [1, 3, 3, 4, 1],
];

const Grid = () => {
  const handleTileClick = (row, col) => {
    console.log(`Tile clicked: (${row}, ${col})`);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 60px)",
        gap: 1, // Spacing between tiles
        justifyContent: "center",
        margin: "20px auto",
      }}
    >
      {hardcodedGrid.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <GridTile
            key={`${rowIndex}-${colIndex}`}
            value={value}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          />
        ))
      )}
    </Box>
  );
};

export default Grid;
