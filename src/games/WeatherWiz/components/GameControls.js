import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Timer } from "lucide-react";
import { COLORS } from "../constants/config";

const GameControls = ({ score, timeLeft, currentSum, target }) => {
  return (
    <Paper elevation={3} sx={{ maxWidth: "600px", mx: "auto", p: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {timeLeft !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Timer size={16} />
            <Typography>Time: {timeLeft}s</Typography>
          </Box>
        )}
        <Typography>Score: {score}</Typography>
      </Box>

      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: COLORS.primary,
          fontSize: { xs: "1.125rem", sm: "1.25rem" },
        }}
      >
        Sum: {currentSum} / {target}
      </Typography>
    </Paper>
  );
};

export default GameControls;
