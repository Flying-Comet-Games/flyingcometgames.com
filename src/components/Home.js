import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FeaturedGame from './FeaturedGame';

const GameButton = ({ to, title, description, logoSrc }) => (
  <Button
    component={Link}
    to={to}
    variant="contained"
    sx={{
      width: '100%',
      height: { xs: '160px', sm: '180px', md: '200px' },
      padding: { xs: 1, sm: 2 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
      background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
      color: 'white',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: theme => `0 4px 8px ${theme.palette.primary.main}66`,
        filter: 'brightness(1.1)',
      },
      overflow: 'hidden',
    }}
  >
    <Box
      component="img"
      src={process.env.PUBLIC_URL + logoSrc}
      alt={`${title} logo`}
      sx={{
        width: { xs: '60px', sm: '70px', md: '80px' },
        height: { xs: '60px', sm: '70px', md: '80px' },
        objectFit: 'cover',
        borderRadius: '12px',
        mb: 1,
      }}
    />
    <Typography
      variant="subtitle1"
      component="div"
      fontWeight="bold"
      sx={{
        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
        lineHeight: 1.2,
        mb: 0.5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        color: 'inherit',
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
        lineHeight: 1.2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        color: 'inherit',
      }}
    >
      {description}
    </Typography>
  </Button>
);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'auto',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          py: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: '600px',
            textAlign: 'center',
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Hi, we're{' '}
            <Link
              to="https://twitter.com/CalliFuch"
              color='red'
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.palette.primary.light,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Calli
            </Link>{' '}
            and{' '}
            <Link
              to="https://twitter.com/EntreEden"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: theme.palette.primary.light,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Eden
            </Link>
            .
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 500,
              pb: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            Together we're building hybrid-casual games at lightning speed.
          </Typography>
        </Box>

      {/* Product Hunt Banner */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            fontWeight: 500,
            mb: 2,
            textAlign: 'center',
          }}
        >
          We launched on Product Hunt! <br /> Give us an upvote if you like our games :)
        </Typography>
        <a
          href="https://www.producthunt.com/posts/flying-comet-games?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-flying&#0045;comet&#0045;games"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=493053&theme=light"
            alt="Flying Comet Games - Casual mobile games built at lightning speed | Product Hunt"
            style={{ width: '250px', height: '54px' }}
            width="250"
            height="54"
          />
        </a>
      </Box>

        <FeaturedGame
          title="Keep Bufo Alive"
          description="An addictive clicker game where you can unlock new backgrounds, outfits, and more to create the perfect environment for Bufo!"
          appStoreLink="https://apps.apple.com/us/app/keep-bufo-alive/id6596775642?itscg=30200&itsct=apps_box_artwork"
          appStoreImageSrc="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e3/9c/e4/e39ce4cf-7e03-badc-7b2a-9d0bd4277a22/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/540x540bb.jpg"
        />

        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: '100%',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/color-dash"
              title="Color Dash"
              description="Match colors and shapes to clear obstacles!"
              logoSrc="/assets/game-logos/color-dash-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/cowboy-quest"
              title="Cowboy Quest"
              description="Collect keys, avoid dangers, and find the treasure!"
              logoSrc="/assets/game-logos/cowboy-quest-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/avoid-blocks"
              title="Avoid the Blocks"
              description="Dodge blocks and survive!"
              logoSrc="/assets/game-logos/avoid-the-blocks-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/memory-maze"
              title="Memory Maze"
              description="Remember and recreate the path!"
              logoSrc="/assets/game-logos/memory-maze-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/color-flood"
              title="Color Flood"
              description="Flood the board with colors strategically!"
              logoSrc="/assets/game-logos/color-flood-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/color-matcher"
              title="Color Matcher"
              description="Test your color matching skills!"
              logoSrc="/assets/game-logos/color-matcher-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/digit-shift"
              title="Digit Shift"
              description="Shift digits to solve the puzzle!"
              logoSrc="/assets/game-logos/digit-shift-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/word-wizard"
              title="Word Wizard"
              description="Unscramble words against the clock!"
              logoSrc="/assets/game-logos/word-wizard-logo.png"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <GameButton
              to="/shape-sorter"
              title="Shape Sorter"
              description="Sort shapes by color and type!"
              logoSrc="/assets/game-logos/shape-sorter-logo.png"
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Flying Comet Games. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;