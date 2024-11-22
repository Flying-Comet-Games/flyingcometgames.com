import React from "react";
import { Box, Typography } from "@mui/material";
import GameButton from "../../components/GameButton";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet";

const TriviaRoundUp = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflowX: "hidden",
          backgroundColor: "background.default",
        }}
      >
        <Helmet>
          <title>Trivia Round Up - Daily Trivia Games</title>
          <meta
            name="description"
            content="Test your knowledge with our daily trivia games. New questions every day about different topics!"
          />
        </Helmet>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 2,
            py: { xs: 2, sm: 3, md: 4 },
            maxWidth: "1024px",
            mx: "auto",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              maxWidth: "600px",
              textAlign: "left",
              mb: { xs: 3, sm: 4, md: 5 },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              Test your knowledge with our daily trivia challenges!
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{
              width: "100%",
            }}
          >
            {[
              {
                to: "/trivia-roundup/seattle",
                title: "Seattle",
                logoSrc: "/assets/wordy-topics/seattle.svg",
              },
              // Add more topics here as they become available
            ].map((topic) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={topic.title}>
                <GameButton
                  to={topic.to}
                  title={topic.title}
                  logoSrc={topic.logoSrc}
                  backgroundColor="primary.light"
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: "auto",
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Flying Comet Games. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TriviaRoundUp;
