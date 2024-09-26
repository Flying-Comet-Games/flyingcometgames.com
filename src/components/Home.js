import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
            Hi, we're Calli and Eden.
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 500,
              mb: 2,
            }}
          >
            Together we're building hybrid-casual games at lightning speed.
          </Typography>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
              fontWeight: 400,
            }}
          >
            We call this venture Flying Comet Games.
          </Typography>
        </Box>

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