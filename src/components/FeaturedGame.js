import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FeaturedGame = ({ title, description, appStoreLink, appStoreImageSrc }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      py: 4,
      px: 2,
      backgroundColor: theme => theme.palette.primary.main,
      borderRadius: 2,
      color: 'white',
      mb: 4,
    }}
  >
    <a
      href={appStoreLink}
      style={{
        width: '170px',
        height: '170px',
        borderRadius: '22px',
        overflow: 'hidden',
        display: 'inline-block',
        verticalAlign: 'middle',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={appStoreImageSrc}
        alt={title}
        style={{
          width: '170px',
          height: '170px',
          borderRadius: '22px',
          overflow: 'hidden',
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      />
    </a>
    <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '500px' }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" color="white">
        {title}
      </Typography>
      <Typography variant="body1" paragraph color="white">
        {description}
      </Typography>
      <a href={`${appStoreLink}&itsct=apps_box_badge`} style={{ display: 'inline-block', marginTop: '16px' }}>
        <img 
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1726963200"
          alt="Download on the App Store"
          style={{ width: '200px', height: 'auto' }}
        />
      </a>
    </Box>
  </Box>
);

export default FeaturedGame;