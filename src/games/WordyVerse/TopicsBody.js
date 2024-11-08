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
          sx={{
            width: { xs: '100%', sm: '80%', md: '80%', lg: '60%' },
          }}
        >
          {[
            { to: wordyVerseBase + "/accounting-wordle", title: "ACCOUNTING", logoSrc: "/assets/wordy-topics/accounting-wordle-icon.png" },
            { to: wordyVerseBase + "/accounting-wordle", title: "HOUSEPLANTS", logoSrc: "/assets/wordy-topics/houseplants.png" },
            { to: wordyVerseBase + "/accounting-wordle", title: "ACCOUNTING", logoSrc: "/assets/wordy-topics/accounting-wordle-icon.png" },
            { to: wordyVerseBase + "/accounting-wordle", title: "HOUSEPLANTS", logoSrc: "/assets/wordy-topics/houseplants.png" },
            { to: wordyVerseBase + "/accounting-wordle", title: "ACCOUNTING", logoSrc: "/assets/wordy-topics/accounting-wordle-icon.png" },
            { to: wordyVerseBase + "/accounting-wordle", title: "HOUSEPLANTS", logoSrc: "/assets/wordy-topics/houseplants.png" },
          ].map((game, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={game.title}>
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
