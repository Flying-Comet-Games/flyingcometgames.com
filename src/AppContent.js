import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import { logPageView } from './analytics';

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box
            component={Link}
            to="/"
            sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
            }}
            >
            <img
                src={`${process.env.PUBLIC_URL}/assets/logo-vertical.svg`}
                alt="Flying Comet Games Logo"
                style={{ height: '40px', marginRight: '10px' }}
            />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                color="inherit"
                component={Link}
                to="/"
                aria-label="Home"
            >
                <HomeIcon />
            </IconButton>
            <IconButton
                color="inherit"
                href="mailto:calli@flyingcometgames.com,eden@flyingcometgames.com"
                aria-label="Contact"
            >
                <EmailIcon />
            </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
    </Box>
  );
};

export default AppContent;