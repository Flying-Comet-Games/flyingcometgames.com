import React from 'react';
import Grid from '@mui/material/Grid2';
import GameButton from '../../components/GameButton';

const TopicsBody = () => {
    const backgroundColors = ['#9eb4ad', '#cca59f', '#91b2d1', '#cfc79d'];

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
            { to: "/accounting-wordle", title: "Accounting", logoSrc: "/assets/game-logos/accounting-wordle-icon.png" },
            { to: "/accounting-wordle", title: "Plants", logoSrc: "/assets/game-logos/accounting-wordle-icon.png" },
            { to: "/accounting-wordle", title: "Accounting", logoSrc: "/assets/game-logos/accounting-wordle-icon.png" },
            { to: "/accounting-wordle", title: "Plants", logoSrc: "/assets/game-logos/accounting-wordle-icon.png" },
          ].map((game, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={game.title}>
              <GameButton
                to={game.to}
                title={game.title}
                logoSrc={game.logoSrc}
                backgroundColor={backgroundColors[index % backgroundColors.length]}
              />
            </Grid>
          ))}
        </Grid>
    );
};

export default TopicsBody;
