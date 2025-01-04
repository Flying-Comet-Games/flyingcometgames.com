import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CityCTASection = () => {
  return (
    <Box
      sx={{
        pt: 10,
        pb: 4,
        px: 2,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Want games for your community?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
          }}
        >
          Get feel-good games for your community to build engagement and keep
          people involved.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            href="https://cal.com/calli-fuchigami/15min"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: "80%",
              maxWidth: "300px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 20,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
                color: "white"
              },
            }}
          >
            Book a demo
          </Button>

          <Button
            variant="outlined"
            href="mailto:calli@flyingcometgames.com"
            sx={{
              width: "80%",
              maxWidth: "300px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 20,
              borderColor: "black",
              borderWidth: "2px",
              color: "black",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Email us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CityCTASection;
