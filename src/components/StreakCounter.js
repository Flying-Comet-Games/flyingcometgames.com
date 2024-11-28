import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Tooltip } from "@mui/material";

const StreakCounter = ({ streak = 0, isLoggedIn = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/wordy-verse/auth");
    }
  };

  return (
    <Tooltip
      title={
        isLoggedIn ? "Your current streak!" : "Sign in to track your streak"
      }
    >
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "4px",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <span role="img" aria-label="fire">
          🔥
        </span>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          {streak}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default StreakCounter;
