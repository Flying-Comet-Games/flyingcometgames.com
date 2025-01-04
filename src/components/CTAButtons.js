import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const CTAButtons = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "sm",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
          paddingBottom: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "80%",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 20,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            },
          }}
        >
          Book a demo
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "sm",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
          paddingBottom: 2,
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "80%",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 20,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            },
          }}
        >
          Explore ready-to-play games
        </Button>
      </Box>
    </>
  );
};

export default CTAButtons;
