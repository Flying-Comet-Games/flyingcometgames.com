import React from "react";
import Grid from "@mui/material/Grid2";
import GameButton from "../../components/GameButton";
import GoogleAdTopic from "../WordyVerse/Components/GoogleAdTopic";

const TriviaRoundupTopicsBody = () => {
  const triviaBase = "/trivia-roundup";

  const games = [
    {
      to: triviaBase + "/seattle",
      title: "SEATTLE",
      logoSrc: "/assets/wordy-topics/seattle.svg",
    },
  ];

  return (
    <Grid container spacing={3} justifyContent="center" width="100%">
      {games.map((game, index) => (
        <React.Fragment key={game.title}>
          <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }}>
            <GameButton
              to={game.to}
              title={game.title}
              logoSrc={game.logoSrc}
              backgroundColor="#d1d0c9"
            />
          </Grid>

          {/* Add ad after every 6 items */}
          {(index + 1) % 6 === 0 && index < games.length - 1 && (
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <GoogleAdTopic />
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};
export default TriviaRoundupTopicsBody;
