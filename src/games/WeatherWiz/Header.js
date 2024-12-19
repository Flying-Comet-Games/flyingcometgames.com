import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { GAME_RULES } from './types';

const Header = ({ currentLevel, score }) => {
  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: 'white', borderRadius: 1, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h5">☔️ Weather Whiz</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2">Level {currentLevel}</Typography>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            {[...Array(GAME_RULES.MAX_LEVELS)].map((_, i) => (
              <React.Fragment key={i}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: i < currentLevel ? '#FF6B6B' : 'grey.300'
                  }}
                />
                {i < GAME_RULES.MAX_LEVELS - 1 && (
                  <Box
                    sx={{
                      height: 1,
                      width: 16,
                      bgcolor: i < currentLevel - 1 ? '#FF6B6B' : 'grey.300'
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={Math.min(100, (score / GAME_RULES.MIN_SCORE_TO_ADVANCE) * 100)}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#FF6B6B'
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;