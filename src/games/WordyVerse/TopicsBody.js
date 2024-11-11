import React from 'react';
import Grid from '@mui/material/Grid2';
import GameButton from '../../components/GameButton';
import { useTheme } from '@mui/material/styles';

const TopicsBody = () => {
    const backgroundColors = ['#9eb4ad', '#cca59f', '#91b2d1', '#cfc79d'];
    const theme = useTheme();
    const wordyVerseBase = '/wordy-verse'

    return (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          width="100%"
        >
          {[
            { to: wordyVerseBase + "/accounting-wordle", title: "ACCOUNTING", logoSrc: "/assets/wordy-topics/accounting-wordle-icon.png" },
            { to: wordyVerseBase + "/nyt-guild-support", title: "NYT Guild", logoSrc: "/assets/wordy-topics/nyt-guild.svg" },
          ].map((game, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 4 }} key={game.title}>
              <GameButton
                to={game.to}
                title={game.title}
                logoSrc={game.logoSrc}
                backgroundColor="#d1d0c9"
              />
            </Grid>
          ))}
        </Grid>
    );
};

export default TopicsBody;
