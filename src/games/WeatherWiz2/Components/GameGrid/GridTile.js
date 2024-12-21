import React from "react";
import { Button } from "@mui/material";

const GridTile = ({ value, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        width: "60px",
        height: "60px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
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
