import React from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import { COLORS } from "../constants/config";
import { Star, StarOutline } from "@mui/icons-material";

const LevelInfo = ({
level,
description,
 moves,
 moveLimit,
progress,
 stars,
}) => {
  const getProgress = () => {
    if (progress?.required && progress?.current) {
      return Math.min(100, (progress.current / progress.required) * 100);
    }
    return 0;
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: "600px", p: 2, mb: 2, mx: "auto" }}>
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

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        {[...Array(3)].map((_, index) =>
          index < stars ? (
            <Star
              key={index}
              sx={{
                color: "gold",
                fontSize: "32px",
                transition: "transform 0.3s ease",
                transform: index < stars ? "scale(1.2)" : "scale(1)",
              }}
            />
          ) : (
            <StarOutline
              key={index}
              sx={{
                color: "gold",
                fontSize: "32px",
              }}
            />
          )
        )}
      </Box>

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
                bgcolor: "#4CAF50",
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default LevelInfo;
