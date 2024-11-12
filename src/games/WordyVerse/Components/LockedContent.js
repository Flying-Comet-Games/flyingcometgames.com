// src/games/WordyVerse/components/GameBoard/LockedContent.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { Lock } from "lucide-react";

const LockedContent = ({ onSignUp }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: 2,
        py: 8,
        px: 3,
        gap: 2,
        border: "2px dashed rgba(0, 0, 0, 0.1)",
        margin: "20px 0",
      }}
    >
      <Lock size={48} color="#666" />
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          textAlign: "center",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        This puzzle is locked
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          px: { xs: 2, sm: 4 },
          textAlign: "center",
          maxWidth: "600px",
          color: "#666",
        }}
      >
        Only puzzles from the last 7 days are available for guest users. Create
        a free account to unlock all puzzles and track your progress!
      </Typography>

      <Box
        onClick={onSignUp}
        sx={{
          backgroundColor: "black",
          color: "white",
          py: 2,
          px: 4,
          borderRadius: 2,
          cursor: "pointer",
          transition: "all 0.2s ease",
          width: "100%",
          fontWeight: 600,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Typography
          variant="button"
          sx={{
            color: "white",
            fontSize: "1rem",
            letterSpacing: "0.5px",
          }}
        >
          Create Free Account
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          mt: 2,
          opacity: 0.7,
          maxWidth: "400px",
          textAlign: "center",
          color: "#666",
        }}
      >
        No credit card required. Takes less than a minute.
      </Typography>
    </Box>
  );
};

export default LockedContent;