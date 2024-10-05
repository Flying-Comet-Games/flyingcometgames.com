import React from 'react';
import Grid from '@mui/material/Grid';
import FeaturedGame from './FeaturedGame';
import GameButton from './GameButton';

const GameBody = () => {
    return (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            width: '100%',
          }}
        >
          <Grid item xs={12} sm={10} md={8} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FeaturedGame
              title="Keep Bufo Alive"
              description="An addictive clicker game where you can unlock new backgrounds, outfits, and more to create the perfect environment for Bufo!"
              appStoreLink="https://apps.apple.com/us/app/keep-bufo-alive/id6596775642?itscg=30200&itsct=apps_box_artwork"
              appStoreImageSrc="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e3/9c/e4/e39ce4cf-7e03-badc-7b2a-9d0bd4277a22/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/540x540bb.jpg"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/startup-speedrun-simulator"
              title="Startup Simulator"
              logoSrc="/assets/game-logos/startup-accelerator-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/whack-a-mole"
              title="Whack A Mole"
              logoSrc="/assets/game-logos/whack-a-mole-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/color-dash"
              title="Color Dash"
              logoSrc="/assets/game-logos/color-dash-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/cowboy-quest"
              title="Cowboy Quest"
              logoSrc="/assets/game-logos/cowboy-quest-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/avoid-blocks"
              title="Avoid The Block"
              logoSrc="/assets/game-logos/avoid-the-blocks-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/memory-maze"
              title="Memory Maze"
              logoSrc="/assets/game-logos/memory-maze-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/color-flood"
              title="Color Flood"
              logoSrc="/assets/game-logos/color-flood-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/color-matcher"
              title="Color Matcher"
              logoSrc="/assets/game-logos/color-matcher-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/digit-shift"
              title="Digit Shift"
              logoSrc="/assets/game-logos/digit-shift-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/word-wizard"
              title="Word Wizard"
              logoSrc="/assets/game-logos/word-wizard-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/shape-sorter"
              title="Shape Sorter"
              logoSrc="/assets/game-logos/shape-sorter-logo.png"
            />
          </Grid>
        </Grid>
    );
};

export default GameBody;
