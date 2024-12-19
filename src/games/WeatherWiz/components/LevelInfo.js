import React from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import { COLORS } from "../constants/config";

const LevelInfo = ({ level, description, moves, moveLimit, progress }) => {
  // Calculate progress percentage
  const getProgress = () => {
    if (progress?.required && progress?.current) {
      return Math.min(100, (progress.current / progress.required) * 100);
    }
    return 0;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6">Level {level}</Typography>
        {moveLimit && (
          <Typography>
            Moves: {moves} / {moveLimit}
          </Typography>
        )}
      </Box>

      <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
        {description}
      </Typography>

      {progress && (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="caption">Progress</Typography>
            <Typography variant="caption">
              {progress.current} / {progress.required}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={getProgress()}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: "grey.200",
              "& .MuiLinearProgress-bar": {
                bgcolor: COLORS.primary,
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default LevelInfo;
