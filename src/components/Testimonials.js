import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: "center",
        backgroundColor: "background.default",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "600px", // Limits the section width
          width: "100%", // Ensures responsiveness
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Players love us
        </Typography>

        <Box
          sx={{
            position: "relative",
            backgroundColor: "#b8c26c",
            border: "2px solid black",
            borderRadius: 2,
            px: 3,
            py: 4,
            color: "text.primary",
          }}
        >
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/icons/left-quote.svg`}
            alt="Left Quote"
            sx={{
              position: "absolute",
              top: -15,
              left: 15,
              width: "30px",
              height: "30px",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
            }}
          >
            Really fun!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: "right",
              mb: 2,
            }}
          >
            This is very cool!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              mb: 2,
            }}
          >
            So fun! I’m playing the archive now.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: "right",
            }}
          >
            Stop! I’m sharing this with my team tomorrow.
          </Typography>

          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/icons/right-quote.svg`}
            alt="Right Quote"
            sx={{
              position: "absolute",
              bottom: -15,
              right: 15,
              width: "30px",
              height: "30px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials;
