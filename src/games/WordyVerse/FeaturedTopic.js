import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import GameButton from "../../components/GameButton";

const FeaturedTopic = ({ svgLogo, title, link, bgColor }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textTransform: 'none',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        // borderRadius: "12px",
        backgroundColor: bgColor || theme.palette.grey[300],
        width: "100%",
        maxWidth: "600px",


      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: theme.palette.text.primary,
            mb: 1,
            textAlign: "center",
          }}
        >
          Featured Puzzle
        </Typography>

        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/icons/wordy-verse-feature.svg`}
          alt={`${title} logo`}
          sx={{
            mt: {lg: 4},
            mb: {xs: -6.5, lg: -7},
            width: { xs: "30%", sm: "50%" },
            height: { xs: "60px", sm: "70px" },
          }}
        />
      </Box>

      <GameButton
        to={link}
        title={title}
        logoSrc={svgLogo}
        backgroundColor="#ffffff"
      />
    </Box>
  );
};

export default FeaturedTopic;
