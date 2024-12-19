import React from "react";
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import { Heart, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { GAME_RULES } from "./types";

const LevelInfo = ({
  currentLevel,
  attemptsRemaining,
  goal,
  levelProgress,
}) => {
  const getCurrentProgress = () => {
    const { type, target } = goal;
    const progress = levelProgress[type.toLowerCase()];
    return `${progress} / ${target}`;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <Typography>Level {currentLevel}</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flex: 1,
              mx: 2,
            }}
          >
            {[...Array(GAME_RULES.MAX_LEVELS)].map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: i < currentLevel ? "#FF6B6B" : "grey.300",
                  flexShrink: 0,
                }}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
          {[...Array(GAME_RULES.ATTEMPTS_PER_LEVEL)].map((_, i) => (
            <Heart
              key={i}
              size={16}
              color={i < attemptsRemaining ? "#FF6B6B" : "#E0E0E0"}
              fill={i < attemptsRemaining ? "#FF6B6B" : "none"}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ bgcolor: "rgba(0,0,0,0.05)", p: 1.5, borderRadius: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="body2">{goal.description}</Typography>
          <Typography variant="body2" sx={{ ml: "auto", color: "#FF6B6B" }}>
            {getCurrentProgress()}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(
            100,
            (levelProgress[goal.type.toLowerCase()] / goal.target) * 100
          )}
          sx={{
            height: 6,
            borderRadius: 1,
            bgcolor: "grey.200",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#FF6B6B",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default LevelInfo;
