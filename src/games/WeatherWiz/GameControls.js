// src/components/WeatherWhiz/GameControls.js

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Timer } from 'lucide-react';
import { COLORS } from './types';

const GameControls = ({ timeLeft, score, currentSum, targetNumber, combo, message }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Timer size={16} />
          <Typography>Time: {timeLeft}s</Typography>
        </Box>
        <Typography>Score: {score}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.125rem", sm: "1.25rem" },
          }}
        >
          Sum: {currentSum} / {targetNumber}
          {combo > 1 && <span> • {combo}x Combo!</span>}
        </Typography>
      </Box>

      <Typography
        sx={{
          textAlign: "center",
          color: COLORS.primary,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};

export default GameControls;