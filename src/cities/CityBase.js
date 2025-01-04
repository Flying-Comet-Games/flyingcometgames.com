import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import GameTileBase from "./GameTileBase";
import SignupButton from "../games/WordyVerse/SignupButton";
import Grid from "@mui/material/Grid2";
import AsSeenInSection from "../components/AsSeenIn";
import AboutUs from "../components/About";
import Footer from "../components/Footer";

const CityBase = ({ cityName, cityPath }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: "background.default",
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background.svg)`,
        backgroundRepeat: "no-repeat repeat", // Prevents horizontal repeat but allows vertical repeat
        backgroundSize: "auto", // Keeps the image's original size
        backgroundPosition: "center 40px", // Adds padding (10px from top and left)
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
            gutterBottom
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: 900,
            }}
          >
            Feel-good games for people who know{" "}
            <Box component="span" sx={{ textDecoration: "underline" }}>
              {cityName}.
            </Box>
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

            {/*
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
            </Grid> */}

            <Grid mb={2} size={12}>
              <GameTileBase
                title="Weather Wiz"
                description={`Select adjacent tiles that sum 10 until the board is cleared.`}
                svgLogo={`${process.env.PUBLIC_URL}/assets/game-tiles/weather-wiz.svg`}
                // link={`${cityPath}/til-trivia`}
                link="/"
                bgColor="#91b2d1"
                isLocked={true}
              />
            </Grid>

            {/* <Grid mb={2} size={12}>
              <GameTileBase
                title="TIL Trivia"
                description={`"Today I learned” ${cityName} trivia, increases in difficulty as you win.`}
                svgLogo={`${process.env.PUBLIC_URL}/assets/game-tiles/til-trivia.svg`}
                // link={`${cityPath}/til-trivia`}
                link="/"
                bgColor="#c0abeb"
                isLocked={true}
              />
            </Grid> */}

            <Grid size={12}>
              <GameTileBase
                title="Quick Quack"
                description={`Complete the phrase before the clock fills it in for you, inspired by Wheel of Fortune.`}
                svgLogo={`${process.env.PUBLIC_URL}/assets/game-tiles/quick-quack-seattle.svg`}
                // link={`${cityPath}/til-trivia`}
                link="/"
                bgColor="#b8c26c"
                isLocked={true}
              />
            </Grid>
          </Box>
        </Grid>
      </Box>

      <AsSeenInSection />

      <AboutUs isComponent={true} />

      <Footer />
    </Box>
  );
};

export default CityBase;
