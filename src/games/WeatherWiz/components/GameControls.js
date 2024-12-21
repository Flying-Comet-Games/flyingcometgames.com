import React from "react";
import { Box, Typography } from "@mui/material";
import { Timer } from "lucide-react";
import { COLORS } from "../constants/config";

const GameControls = ({ score, timeLeft, currentSum, target, sumsLeft }) => {
  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mb: 2, textAlign: "center" }}>
      {/* Timer and Score Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {timeLeft !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Timer size={16} />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Time: {timeLeft}s
            </Typography>
          </Box>
        )}
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>Score: {score}</Typography>
      </Box>

      {/* Current Sum Section */}
      <Typography
        variant="h4"
        sx={{
          color: COLORS.primary,
          fontSize: { xs: "1.5rem", sm: "2rem" },
          mb: 1,
          fontWeight: "bold",
        }}
      >
        Sum: {currentSum} / {target}
      </Typography>

      {/* Sums Left Section */}
      <Typography
        variant="body1"
        sx={{
          color: "grey.600",
          fontSize: { xs: "1rem", sm: "1.25rem" },
          mb: 2,
        }}
      >
        {sumsLeft} sums left
      </Typography>
    </Box>
  );
};

export default GameControls;
