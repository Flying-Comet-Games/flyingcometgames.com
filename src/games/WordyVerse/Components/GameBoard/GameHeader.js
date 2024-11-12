// src/games/WordyVerse/components/GameBoard/GameHeader.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const GameHeader = ({ title, subtitle, iconPath }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mb: 2,
      }}
    >
      <img
        src={iconPath}
        alt={`${title} Logo`}
        style={{
          width: "64px",
          height: "54px",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "black", lineHeight: 1 }}
        >
          {title}
        </Typography>
        {typeof subtitle === "string" ? (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {subtitle}
          </Typography>
        ) : (
          subtitle
        )}
      </Box>
    </Box>
  );
};

export default GameHeader;