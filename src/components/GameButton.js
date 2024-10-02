import React, { useState } from 'react';
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
        alt={`${title} free online puzzle game logo`}
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
        component="h3"
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

  export default GameButton;