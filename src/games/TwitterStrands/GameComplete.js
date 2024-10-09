import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const GameComplete = ({ timeTaken }) => {
  const handleShare = () => {
    const shareText = `
I solved "Line by Line" in ${timeTaken} minutes!

Check out this project made at the @fdotinc Horizon SF hackathon

https://flyingcometgames.com/twitter-strands
    `;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Well Done!
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        You solved "Line by Line" in {timeTaken}.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleShare}
        sx={{ mb: 4 }}
      >
        Share your results on X
      </Button>
    </Box>
  );
};

export default GameComplete;