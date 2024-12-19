import React, { useRef } from "react";
import { ButtonBase } from "@mui/material";
import { COLORS } from "../constants/config";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

const Tile = ({ value, isSelected, onClick }) => {
  const rippleRef = useRef(null);

  const handleClick = (e) => {
    if (rippleRef.current) {
      rippleRef.current.stop(); // Stop the ripple when unselected
    }

    onClick(); // Call the parent click handler
  };

  return (
    <ButtonBase
      onClick={handleClick}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: isSelected ? COLORS.accent : "white",
        border: "1px solid rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease", // Smooth transition for reset
        "&:hover": {
          backgroundColor: isSelected ? COLORS.accent : COLORS.background,
        },
        fontSize: "clamp(1rem, 4vw, 1.2rem)",
      }}
    >
      {value}
      <TouchRipple
        ref={rippleRef}
        style={{
          color: COLORS.primary, // Match the Seattle theme
          opacity: 0.6, // Slightly transparent ripple
        }}
      />
    </ButtonBase>
  );
};

export default Tile;
