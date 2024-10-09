import React from 'react';
import { Typography, Box } from '@mui/material';

const ProgressTracker = ({ foundWords, totalWords }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography>
        {foundWords.length} of {totalWords} theme words found.
      </Typography>
    </Box>
  );
};

export default ProgressTracker;