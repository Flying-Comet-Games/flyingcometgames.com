import React from "react";
import { Button } from "@mui/material";
import { COLORS } from "../constants/config";

const Tile = ({ value, isSelected, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "100%",
        height: "100%",
        minWidth: "unset",
        p: 0,
        backgroundColor: isSelected ? COLORS.accent : "white",
        border: "1px solid rgba(0,0,0,0.1)",
        "&:hover": {
          backgroundColor: isSelected ? COLORS.accent : COLORS.background,
        },
        fontSize: "clamp(1rem, 4vw, 1.2rem)",
      }}
    >
      {value}
    </Button>
  );
};

export default Tile;
