import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const WhyGames = () => {
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
        {/* Section Title */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Why games?
        </Typography>

        {/* Stats Section */}
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#91b2d1", // Updated background color
            border: "2px solid black",
            borderRadius: 2,
            px: 3,
            py: 4,
            mb: 4,
            color: "text.primary",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 2,
              pb: 2,
            }}
          >
            <Box sx={{ textAlign: "center", flex: "1 1 40%" }}>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                30%
              </Typography>
              <Typography variant="body1">increase in session duration</Typography>
            </Box>
            <Box sx={{ textAlign: "center", flex: "1 1 40%" }}>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                400%
              </Typography>
              <Typography variant="body1">higher click through rate</Typography>
            </Box>
            <Box sx={{ textAlign: "center", flex: "1 1 40%" }}>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                230%
              </Typography>
              <Typography variant="body1">boost in repeat visits</Typography>
            </Box>
            <Box sx={{ textAlign: "center", flex: "1 1 40%" }}>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                &gt; 2x
              </Typography>
              <Typography variant="body1">more social <br /> shares</Typography>
            </Box>
          </Box>

          {/* Source Link */}
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 70,
              fontStyle: "italic",
            }}
          >
            <a
              href="https://www.marketingscoop.com/marketing/the-state-of-interactive-content-marketing-in-2024-25-stats-trends-to-know/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Source 2024
            </a>
          </Typography>

          {/* Goose Image */}
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/ducks/staring.svg`}
            alt="Goose"
            sx={{
              position: "absolute",
              bottom: -2,
              right: 10,
              width: "40px",
              height: "auto",
            }}
          />
        </Box>

        {/* Retention and Loyalty Section */}
        <Box
          sx={{
            textAlign: "left",
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span>✨</span> Boost retention
            </Typography>
            <Typography variant="body1">
              Make your site a daily destination for readers with fun,
              habit-building content that delights.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span>✨</span> Build loyalty
            </Typography>
            <Typography variant="body1">
              Build a lasting connection through shared experiences that connect
              readers to your publication.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WhyGames;
