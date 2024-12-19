// src/components/WeatherWhiz/LevelInfo.js

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Heart } from 'lucide-react';
import { GAME_RULES } from './types';

const LevelInfo = ({ currentLevel, attemptsRemaining, goal }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Level {currentLevel}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[...Array(GAME_RULES.ATTEMPTS_PER_HOUR)].map((_, i) => (
            <Heart
              key={i}
              size={16}
              className={i < attemptsRemaining ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-gray-300'}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'rgba(0,0,0,0.05)', p: 1, borderRadius: 1 }}>
        <Typography variant="body2">
          Goal: {goal.description}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
          Score at least {GAME_RULES.MIN_SCORE_TO_ADVANCE} to advance
        </Typography>
      </Box>
    </Paper>
  );
};

export default LevelInfo;