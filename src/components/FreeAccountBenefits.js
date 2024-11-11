import React from 'react';
import { Box, Typography } from '@mui/material';

const BenefitItem = ({ iconPath, text }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      mb: 1,
      gap: 2 
    }}
  >
    <img 
      src={`${process.env.PUBLIC_URL}${iconPath}`}
      alt=""
      style={{
        width: 20,
        height: 20,
        objectFit: 'contain'
      }}
    />
    <Typography>{text}</Typography>
  </Box>
);

const FreeAccountBenefitsList = () => {
  const benefits = [
    { iconPath: '/assets/icons/key.svg', text: 'Unlock more puzzles' },
    { iconPath: '/assets/icons/calendar.svg', text: 'Track your streak' },
    { iconPath: '/assets/icons/favorites.svg', text: 'Save your favorites' },
    { iconPath: '/assets/icons/leaderboard.svg', text: 'Get on leaderboards' },
    { iconPath: '/assets/icons/share.svg', text: 'Share your wins' },
    { iconPath: '/assets/icons/buddy.svg', text: 'Add your buddies' },
  ];

  return (
    <Box sx={{ mx: "auto", mb: 4, width: '100%', maxWidth: 360 }}>
      {benefits.map((benefit, index) => (
        <BenefitItem 
          key={index}
          iconPath={benefit.iconPath}
          text={benefit.text}
        />
      ))}
    </Box>
  );
};

export default FreeAccountBenefitsList;