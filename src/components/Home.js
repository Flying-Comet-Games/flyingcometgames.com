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
      height: { xs: '130px', sm: '140px', md: '160px' },
      padding: { xs: 1, sm: 2 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: `linear-gradient(45deg, ${color} 30%, ${color}88 90%)`,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: `0 4px 8px ${color}66`,
        filter: 'brightness(1.1)',
      },
    }}
  >
    {React.cloneElement(icon, { style: { fontSize: '1.5rem', marginBottom: '4px' } })}
    <Typography variant="subtitle1" component="div" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.75rem', lineHeight: 1.2 }}>{description}</Typography>
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
        py: { xs: 2, sm: 3, md: 4 },
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(120deg, #f0f0f0 0%, #e0e0e0 100%)',
      }}
    >
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
        <img src={`${process.env.PUBLIC_URL}/assets/logo.svg`}  alt="Flying Comet Games Logo" style={{ width: '60px', height: 'auto', marginBottom: '0.5rem' }} />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          Hybrid Casual Game Portal
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: '100%',
          margin: 'auto',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameButton
            to="/color-matcher"
            title="Color Matcher"
            description="Test your color matching skills!"
            icon={<PaletteIcon />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameButton
            to="/digit-shift"
            title="Digit Shift"
            description="Shift digits to solve the puzzle!"
            icon={<GridViewIcon />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
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
          mt: { xs: 2, sm: 3, md: 4 },
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