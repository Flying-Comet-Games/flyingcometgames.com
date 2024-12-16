import React from "react";
import Grid from "@mui/material/Grid2";
import FeaturedMobileGame from "./FeaturedMobileGame";
import GameButton from "./GameButton";
import FeaturedGame from "./FeaturedGame";
import TriviaRoundupBeta from "./TriviaRoundupBeta";
import KofiButton from "./KofiButton";
import SignupButton from "../games/WordyVerse/SignupButton";
import FeaturedCity from "./FeaturedCity";
import ComingSoonCity from "./ComingSoonCity";
import { Typography } from "@mui/material";

const GameBody = () => {
  const backgroundColors = ["#9eb4ad", "#cca59f", "#91b2d1", "#cfc79d"];

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      // sx={{
      //   width: { xs: "100%", sm: "80%", md: "80%", lg: "60%" },
      // }}
    >
      <Grid
        sx={{
          width: "100%",
        }}
      >
        <SignupButton />
      </Grid>

      <Grid
        sx={{
          width: "100%",
        }}
      >
        <FeaturedCity
          svgLogo={`${process.env.PUBLIC_URL}/assets/icons/wordy-verse-icon2.svg`}
          description="A collection of themed word puzzles for niche content that’s new each day."
          title="Seattle"
          link="/seattle"
          bgColor="#91b2d1"
        />
      </Grid>

      <Grid
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <ComingSoonCity
          svgLogo={`${process.env.PUBLIC_URL}/assets/icons/wordy-verse-icon2.svg`}
          description="A collection of themed word puzzles for niche content that’s new each day."
          title="Oakland"
          link="/wordy-verse"
          bgColor="#ffd583"
        />
      </Grid>

      <Grid
        sx={{
          width: "100%",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
            fontWeight: 700,
            mb: 2,
          }}
        >
          In the mood for something else?
        </Typography>
      </Grid>

      <Grid>
        <FeaturedMobileGame
          title="Keep Bufo Alive"
          description="A simple clicker game to pass time as you unlock backgrounds, outfits, and more to keep your Bufo happy."
          appStoreLink="https://apps.apple.com/us/app/keep-bufo-alive/id6596775642?itscg=30200&itsct=apps_box_artwork"
          appStoreImageSrc={`${process.env.PUBLIC_URL}/assets/game-logos/kba.svg`}
        />

        <KofiButton />
      </Grid>
    </Grid>
  );
};

export default GameBody;
