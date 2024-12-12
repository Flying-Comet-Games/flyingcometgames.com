import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const FeaturedCity = ({ title, bgColor }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: bgColor || "#91b2d1",
        position: "relative",
        border: "1px black solid",
        borderRadius: "5px",
        minHeight: "175px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "3rem", sm: "3.15rem", md: "3.5rem" },
          fontWeight: 800,
          color: "black",
          mb: 2
        }}
      >
        {title}
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/${title}`}
        sx={{
          width: "50%",
          fontWeight: 500,
          borderRadius: 20,
          backgroundColor: "black",
          color: "white",
          "&:hover": {
            backgroundColor: "#333"
          }
        }}
      >
        PLAY NOW!
      </Button>

      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/ducks/staring.svg`}
        alt="Duck logo"
        sx={{
          width: "60px",
          height: "60px",
          position: "absolute",
          bottom: -2,
          left: "10%",
          transform: "translateX(-50%)"
        }}
      />
    </Box>
  );
};

export default FeaturedCity;