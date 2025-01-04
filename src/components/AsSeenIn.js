import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AsSeenInSection = () => {
  return (
    <Box
      sx={{
        maxWidth: "600px", // Limits the width of the section
        width: "100%", // Ensures responsiveness
        marginX: "auto", // Centers the section horizontally
        py: 2,
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional contrast
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1, // Spacing between text and logo
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
        }}
      >
        As seen in:
      </Typography>
      <a
        href="https://www.geekwire.com/2024/tech-vets-launch-their-own-game-company-and-create-wordle-style-puzzle-with-a-seattle-focus/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src="https://cdn.geekwire.com/wp-content/uploads/2015/02/GeekWire-logo-transparent.png"
          alt="GeekWire Logo"
          sx={{
            maxWidth: "100px",
            height: "auto",
          }}
        />
      </a>
    </Box>
  );
};

export default AsSeenInSection;
