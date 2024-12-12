import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const GameTileBase = ({ svgLogo, description, title, link, bgColor, isLocked = false }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: bgColor || theme.palette.background.default,
        borderRadius: "12px",
      }}
    >
      <Button
        component={Link}
        to={link}
        variant="contained"
        disabled={isLocked}
        sx={{
          width: "100%",
          height: "100%",
          padding: { xs: 2, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
          border: "1px solid black",
          backgroundColor: "transparent",
          borderRadius: "12px",
          boxShadow: theme.shadows[2],
          color: theme.palette.text.primary,
          overflow: "hidden",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
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
              whiteSpace: "nowrap",
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

      {isLocked && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: "12px",
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src="/assets/icons/lock.svg"
            alt="Locked"
            sx={{
              width: "40px",
              height: "40px",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default GameTileBase;