import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import GameTileBase from "./GameTileBase";
import SignupButton from "../games/WordyVerse/SignupButton";
import Grid from "@mui/material/Grid2";

const CityBase = ({ cityName, cityPath }) => {
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
      <Helmet>
        <title>Wordy Verse</title>
        <meta
          name="description"
          content="Enjoy engaging online puzzle games, word games, and casual games similar to NYT Games. Challenge yourself with our collection of brain teasers and addictive puzzles."
        />
      </Helmet>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 4,
          py: { xs: 2, sm: 3, md: 4 },
          maxWidth: "600px",
          mx: "auto",
          boxSizing: "border-box",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
              textAlign: "left",
            }}
          >
            Welcome stranger!
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "2.75rem", sm: "2.25rem", md: "2.5rem" },
              textAlign: "left",
              fontWeight: 900,
            }}
          >
            {cityName} Word & Puzzle Games
          </Typography>
        </Box>

        <Grid container justifyContent="center" width="100%">
          <Box>
            <Grid size={12} mb={2}>
              <GameTileBase
                title="The Wordy"
                description="Guess the 5-letter word in six guesses, inspired by NY Times Wordle."
                svgLogo={`${process.env.PUBLIC_URL}/assets/game-tiles/wordyverse.svg`}
                // link={`${cityPath}/wordy-verse`}
                link="/wordy-verse/seattle"
                bgColor="#ffd583"
              />
            </Grid>

            <Grid mb={4} size={12}>
              <SignupButton />
            </Grid>

            <Grid mb={2} size={12}>
              <Typography
                sx={{
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                  textAlign: "center",
                  fontWeight: 900,
                }}
              >
                Coming Soon!
              </Typography>
            </Grid>

            <Grid mb={2} size={12}>
              <GameTileBase
                title="TIL Trivia"
                description={`Today I learned” ${cityName} trivia, increases in difficulty as you win.`}
                svgLogo={`${process.env.PUBLIC_URL}/assets/game-tiles/til-trivia.svg`}
                // link={`${cityPath}/til-trivia`}
                link="/"
                bgColor="#c0abeb"
                isLocked={true}
              />
            </Grid>

            <Grid mb={2} size={12}>
              <GameTileBase
                title="Quick Quack"
                description={`Complete the phrase before the clock fills it in for you, inspired by Wheel of Fortune.`}
                svgLogo={`${process.env.PUBLIC_URL}/assets/game-tiles/quick-quack-seattle.svg`}
                // link={`${cityPath}/til-trivia`}
                link="/"
                bgColor="#91b2d1"
                isLocked={true}
              />
            </Grid>
          </Box>
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
  );
};

export default CityBase;
