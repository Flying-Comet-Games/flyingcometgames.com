// src/games/WordyVerse/components/GameBoard/GameOver.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Share2 } from 'lucide-react';

const GameOver = ({ guesses, wordData, onShare }) => {
  const won = guesses[guesses.length - 1].toUpperCase() === wordData.word.toUpperCase();

  return (
    <Box
      sx={{
        mt: "auto",
        pt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: won ? "success.main" : "error.main",
          fontWeight: "bold",
        }}
      >
        {won
          ? `You won in ${guesses.length} ${guesses.length === 1 ? "try" : "tries"}!`
          : `Game Over! The word was ${wordData.word}`}
      </Typography>

      <Box
        onClick={onShare}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          backgroundColor: "#cca59f",
          color: "black",
          py: 2,
          px: 4,
          borderRadius: 2,
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#d32f2f",
            transform: "scale(1.02)",
          },
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          width: "fit-content",
        }}
      >
        <Share2 size={24} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Share Result
        </Typography>
      </Box>
    </Box>
  );
};

export default GameOver;