import React, { useRef } from "react";
import { COLORS } from "../constants/config";

const Tile = ({ value, isSelected, onClick, row, col }) => {
  const tileRef = useRef(null);

  const handleClick = () => {
    if (tileRef.current) {
      // Custom behavior or animation triggering can go here
    }

    onClick(); // Call the parent click handler
  };

  return (
    <div
      ref={tileRef}
      onClick={handleClick}
      className={`tile tile-${row}-${col}`}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: isSelected ? COLORS.accent : "white",
        border: "1px solid rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease, transform 0.3s ease", // Smooth transitions
        fontSize: "clamp(1rem, 4vw, 1.2rem)",
        cursor: "pointer",
      }}
    >
      {value}
    </div>
  );
};

export default Tile;
