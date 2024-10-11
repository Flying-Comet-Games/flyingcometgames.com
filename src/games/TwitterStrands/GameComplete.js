import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const GameComplete = ({ timeTaken }) => {
  const handleShare = () => {
    const shareText = `
I solved "Line by Line" in ${timeTaken} minutes!

Check out this project made at the @fdotinc Horizon SF hackathon

https://flyingcometgames.com/my-strands
    `;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Box sx={{ textAlign: 'center', py: 3, px: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontSize: '1.2rem' }}> {/* Reduced font size */}
        Well Done!
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}> {/* Reduced font size */}
        You solved "Line by Line" in {timeTaken}.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleShare}
        sx={{ mb: 3, fontSize: '0.85rem', padding: '6px 12px' }}
      >
        Share your results on X
      </Button>
    </Box>
  );
};

export default GameComplete;