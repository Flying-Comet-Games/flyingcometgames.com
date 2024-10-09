import React from 'react';
import { Button, Box } from '@mui/material';

const WordSubmit = ({ onSubmit, currentWord }) => {
  const handleSubmit = () => {
    if (currentWord) {
      onSubmit(currentWord); // Pass the current word to the onSubmit callback
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mb: 2, mt:5 }}>
      <Button variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>
        Submit Word
      </Button>
    </Box>
  );
};

export default WordSubmit;