import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const ComingSoonCity = ({ title, bgColor }) => {
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
        minHeight: "175px",
        border: "1px black solid",
        borderRadius: "2px",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "3rem", sm: "2rem", md: "2.5rem" },
          fontWeight: 800,
          color: "black",
          mb: 2
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "2rem", md: "2.5rem" },
          color: "black",
          mb: 2
        }}
      >
        COMING SOON!
      </Typography>

      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/ducks/quack.svg`}
        alt="Duck logo"
        sx={{
          width: "80px",
          height: "80px",
          position: "absolute",
          bottom: -2,
          left: "80%",
          transform: "translateX(-50%)"
        }}
      />
    </Box>
  );
};

export default ComingSoonCity;