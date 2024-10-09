import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const GameComplete = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Well Done! You've found all the words.
      </Typography>
      <Button variant="outlined">View Results</Button>
    </Box>
  );
};

export default GameComplete;