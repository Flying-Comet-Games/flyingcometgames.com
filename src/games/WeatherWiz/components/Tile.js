import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "../constants/config";

const Tile = ({ value, isSelected, onClick, row, col }) => {
  const handleClick = () => {
    onClick(); // Call the parent click handler
  };

  return (
    <Box
      onClick={handleClick}
      className={`tile tile-${row}-${col}`}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: isSelected ? COLORS.accent : COLORS.background,
        transition: "background-color 0.3s ease, transform 0.2s ease",
        transform: isSelected ? "scale(1.1)" : "scale(1)", // Slight zoom on selection
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)", // Hover effect
        },
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: "clamp(1.2rem, 2vw, 1.8rem)", // Responsive font size
          fontWeight: "bold",
          color: COLORS.text,
          // textShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)", // Text glow effect
        }}
      >
        {value}
      </Box>
    </Box>
  );
};

export default Tile;
