import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { Heart, Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GAME_RULES } from './types';

const LevelInfo = ({ currentLevel, attemptsRemaining, goal, score, completedSums = 0 }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <Typography>Level {currentLevel}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1, mx: 2 }}>
            {[...Array(GAME_RULES.MAX_LEVELS)].map((_, i) => (
              <motion.div
                key={i}
                animate={i === currentLevel ? {
                  scale: [1, 1.2, 1],
                  transition: { repeat: Infinity, duration: 2 }
                } : {}}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: i < currentLevel ? '#FF6B6B' : 'grey.300',
                    flexShrink: 0
                  }}
                />
              </motion.div>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
          {[...Array(GAME_RULES.ATTEMPTS_PER_LEVEL)].map((_, i) => (
            <Heart
              key={i}
              size={16}
              color={i < attemptsRemaining ? '#FF6B6B' : '#E0E0E0'}
              fill={i < attemptsRemaining ? '#FF6B6B' : 'none'}
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ bgcolor: 'rgba(0,0,0,0.05)', p: 1.5, borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2">
            Goal: {goal.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, ml: 'auto' }}>
            {[...Array(goal.target)].map((_, i) => (
              <CheckCircle2
                key={i}
                size={16}
                color={i < completedSums ? '#FF6B6B' : '#E0E0E0'}
                fill={i < completedSums ? '#FF6B6B' : 'none'}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          Score Progress: {score} / {GAME_RULES.MIN_SCORE_TO_ADVANCE}
          {goal.target - completedSums > 0 && (
            <span style={{ color: '#FF6B6B', marginLeft: 8 }}>
              ({goal.target - completedSums} more to go!)
            </span>
          )}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, (score / GAME_RULES.MIN_SCORE_TO_ADVANCE) * 100)}
          sx={{
            height: 6,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#FF6B6B'
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default LevelInfo;