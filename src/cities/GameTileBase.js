import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const GameTileBase = ({ svgLogo, description, title, link, bgColor, isLocked=false }) => {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={link}
      variant="contained"
      sx={{
        width: "100%",
        padding: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        border: "1px solid black",
        backgroundColor: bgColor || theme.palette.background.default,
        borderRadius: "12px",
        boxShadow: theme.shadows[2],
        color: theme.palette.text.primary,
        overflow: "hidden",
        "&:hover": {
          backgroundColor: theme.palette.grey[200],
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, mx: "auto" }}>
        <Box
          component="img"
          src={svgLogo}
          alt={`${title} logo`}
          sx={{
            width: { xs: "30%", sm: "50%" },
            height: { xs: "60px", sm: "70px" },
          }}
        />

        <Typography
          sx={{
            fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem" },
            lineHeight: 1.5,
            fontWeight: 800,
            ml: 2,
            color: theme.palette.text.secondary,
            textTransform: "none",
            textAlign: "center",
            width: "100%",
            whiteSpace: "nowrap", // Prevent text from breaking
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          lineHeight: 1.5,
          color: theme.palette.text.secondary,
          textTransform: "none",
          textAlign: "center",
        }}
      >
        {description}
      </Typography>
    </Button>
  );
};

export default GameTileBase;
