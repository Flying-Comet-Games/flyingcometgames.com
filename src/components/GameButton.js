import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const GameButton = ({ to, title, logoSrc, backgroundColor }) => (
    <Button
      component={Link}
      to={to}
      variant="contained"
      sx={{
        width: '100%',
        height: { xs: '140px', sm: '160px' },
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: '4px',
        border: '1px solid black',
        backgroundColor: backgroundColor,
        borderRadius: '16px',
        // boxShadow: theme => `0 2px 4px ${theme.palette.grey[400]}`,
        '&:hover': {
          backgroundColor: theme => theme.palette.grey[200],
        },
        overflow: 'hidden',
        transition: 'transform 0.2s',
      }}
    >
      <Box
        component="img"
        src={process.env.PUBLIC_URL + logoSrc}
        alt={`${title} free online puzzle game logo`}
        loading='lazy'
        sx={{
          width: { xs: '50px', sm: '60px' },
          height: { xs: '50px', sm: '60px' },
          objectFit: 'contain',
          mb: 1,
        }}
      />
      <Typography
        variant="subtitle1"
        component="h3"
        sx={{
          fontSize: { xs: '1rem', sm: '1rem' },
          color: 'text.primary',
          fontWeight: "500"
        }}
      >
        {title}
      </Typography>
    </Button>
);

export default GameButton;
