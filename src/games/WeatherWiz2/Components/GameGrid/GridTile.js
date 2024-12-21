import React from "react";
import { Button } from "@mui/material";

const GridTile = ({ value, row, col, onClick }) => {
  return value === null ? (
    <div
      className={`grid-tile tile-${row}-${col}`}
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: "#e0e0e0",
        border: "1px solid #ccc",
      }}
    ></div>
  ) : (
    <Button
      className={`grid-tile tile-${row}-${col}`}
      onClick={onClick}
      variant="contained"
      disableElevation
      sx={{
        width: "60px",
        height: "60px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        border: "1px solid #ccc",
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      }}
    >
      {value}
    </Button>
  );
};

export default GridTile;
