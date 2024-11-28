import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LogIn, LogOut } from 'lucide-react';
import { useStytch, useStytchUser } from '@stytch/react';

const AuthListItem = () => {
  const { user } = useStytchUser();
  const stytch = useStytch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (user) {
      try {
        await stytch.session.revoke();
        // Optionally redirect to home page after logout
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    } else {
      // Navigate to auth page for login
      navigate('/wordy-verse/auth');
    }
  };

  return (
    <ListItem
      button
      onClick={handleAuth}
      component={Button}
      sx={{
        py: 2,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        {user ? <LogOut /> : <LogIn />}
      </ListItemIcon>
      <ListItemText
        primary={user ? 'Sign Out' : 'Sign In'} 
      />
    </ListItem>
  );
};

export default AuthListItem;