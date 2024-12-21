import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "./Components/GameGrid/Grid";

const WeatherWiz = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 3,
        backgroundColor: 'background.default',
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          mb: 3,
        }}
      >
        &#9748; WeatherWiz
      </Typography>
      <Grid />
    </Box>
  );
};

export default WeatherWiz;
