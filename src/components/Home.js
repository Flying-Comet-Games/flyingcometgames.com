import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PaletteIcon from '@mui/icons-material/Palette';
import GridViewIcon from '@mui/icons-material/GridView';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const GameButton = ({ to, title, description, icon, color }) => (
  <Button
    component={Link}
    to={to}
    variant="contained"
    startIcon={icon}
    sx={{
      width: '100%',
      height: '100%',
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: `linear-gradient(45deg, ${color} 30%, ${color}99 90%)`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0 6px 12px ${color}66`,
      },
    }}
  >
    <Typography variant="h6" component="div" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Button>
);

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        textAlign: 'center',
        px: 2,
        py: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(120deg, #f0f0f0 0%, #e0e0e0 100%)',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 700,
          mb: 4,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        Hybrid Casual Game Portal
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: 800, margin: 'auto', flex: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <GameButton
            to="/color-matcher"
            title="Color Matcher"
            description="Test your color matching skills!"
            icon={<PaletteIcon />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <GameButton
            to="/digit-shift"
            title="Digit Shift"
            description="Shift digits to solve the puzzle!"
            icon={<GridViewIcon />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <GameButton
            to="/word-wizard"
            title="Word Wizard"
            description="Unscramble words against the clock!"
            icon={<AutoFixHighIcon />}
            color="#FFC107"
          />
        </Grid>
      </Grid>

      <Box
        component="footer"
        sx={{
          mt: 4,
          py: 2,
          textAlign: 'center',
          borderTop: '1px solid #ddd',
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