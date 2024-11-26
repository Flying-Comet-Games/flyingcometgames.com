import React from "react";
import Grid from "@mui/material/Grid2";
import FeaturedMobileGame from "./FeaturedMobileGame";
import GameButton from "./GameButton";
import FeaturedGame from "./FeaturedGame";
import TriviaRoundupBeta from "./TriviaRoundupBeta";
import KofiButton from "./KofiButton";

const GameBody = () => {
  const backgroundColors = ["#9eb4ad", "#cca59f", "#91b2d1", "#cfc79d"];

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        width: { xs: "100%", sm: "80%", md: "80%", lg: "60%" },
      }}
    >
      <Grid
        sx={{
          width: "100%",
        }}
      >
        <FeaturedGame
          svgLogo={`${process.env.PUBLIC_URL}/assets/icons/wordy-verse-icon2.svg`}
          description="A collection of themed word puzzles for niche content that’s new each day."
          title="Wordy-verse"
          link="/wordy-verse"
          bgColor="#ffd583"
        />
      </Grid>

      {[
        {
          to: "/color-flood",
          title: "Color Flood",
          logoSrc: "/assets/game-logos/color-flood-logo.svg",
          color: "#91b2d1",
        },
        {
          to: "/cowboy-quest",
          title: "Cowboy Quest",
          logoSrc: "/assets/game-logos/cowboy-quest-logo.svg",
          color: "#e2b48f",
        },
        {
          to: "/digit-shift",
          title: "Digit Shift",
          logoSrc: "/assets/game-logos/digit-shift-logo.svg",
          color: "#c9bbde",
        },
        {
          to: "/memory-maze",
          title: "Memory Maze",
          logoSrc: "/assets/game-logos/memory-maze-logo.svg",
          color: "#b8c26c",
        },
        {
          to: "/color-matcher",
          title: "Color Matcher",
          logoSrc: "/assets/game-logos/color-matcher-logo.svg",
          color: "#ffd583",
        },
        {
          to: "/raining-blocks",
          title: "Raining Blocks",
          logoSrc: "/assets/game-logos/avoid-the-blocks-logo.svg",
          color: "#91b2d1",
        },
        {
          to: "/startup-speedrun-simulator",
          title: "Startup Simulator",
          logoSrc: "/assets/game-logos/startup-accelerator-logo.svg",
          color: "#b8c26c",
        },
        // {
        //   to: "/whack-a-mole",
        //   title: "Whack A Mole",
        //   logoSrc: "/assets/game-logos/whack-a-mole-logo.svg",
        //   color: "#c9bbde",
        // },
        {
          to: "/color-dash",
          title: "Color Dash",
          logoSrc: "/assets/game-logos/color-dash-logo.svg",
          color: "#c9bbde",
        },
        // {
        //   to: "/word-wizard",
        //   title: "Word Wizard",
        //   logoSrc: "/assets/game-logos/word-wizard-logo.svg",
        // },
        // {
        //   to: "/shape-sorter",
        //   title: "Shape Sorter",
        //   logoSrc: "/assets/game-logos/shape-sorter-logo.svg",
        // },
      ].map((game, index) => (
        <React.Fragment key={game.title}>
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
            <GameButton
              to={game.to}
              title={game.title}
              logoSrc={game.logoSrc}
              backgroundColor={game.color}
            />
          </Grid>
          {index === 3 && <TriviaRoundupBeta />}
        </React.Fragment>
      ))}

      <Grid>
        <FeaturedMobileGame
          title="Keep Bufo Alive"
          description="A simple clicker game where you unlock backgrounds, outfits, and more to create the perfect environment for your Bufo."
          appStoreLink="https://apps.apple.com/us/app/keep-bufo-alive/id6596775642?itscg=30200&itsct=apps_box_artwork"
          appStoreImageSrc={`${process.env.PUBLIC_URL}/assets/game-logos/bufo-logo.svg`}
        />

        <KofiButton />
      </Grid>

    </Grid>
  );
};

export default GameBody;
