import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const CTAButtons = () => {
  return (
    <>
      <Box
        mx={"auto"}
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
          href="https://cal.com/calli-fuchigami/15min"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            width: "80%",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 20,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            backgroundColor: "#000000",
            color: "white",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              backgroundColor: "#333333",
              color: "white"
            },
          }}
        >
          Book a demo
        </Button>
      </Box>

      <Box
        mx={"auto"}
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
          href="/play"
          sx={{
            width: "80%",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 20,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            backgroundColor: "#f8f8f8",
            color: "black",
            border: "2px solid black",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
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
