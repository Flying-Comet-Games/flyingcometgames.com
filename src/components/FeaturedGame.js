import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const FeaturedGame = ({ title, description, appStoreLink, appStoreImageSrc }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '200px', sm: '220px', md: '200px' }, // Increased height to accommodate buttons
        padding: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.primary.main,
        color: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative', // For absolute positioning of buttons
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Box
          component="img"
          src={appStoreImageSrc}
          alt={`${title} logo`}
          sx={{
            width: { xs: '60px', sm: '70px', md: '80px' },
            height: { xs: '60px', sm: '70px', md: '80px' },
            objectFit: 'cover',
            borderRadius: '12px',
            mr: 2,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            color="white"
            component="div"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
              lineHeight: 1.2,
              display: '-webkit-box',
              // WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          display: 'flex',
          alignItems: 'center', // Align buttons vertically
          gap: 2,
        }}
      >
        <Link to={appStoreLink}>
          <img
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1726963200"
            alt="Download on the App Store"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
        <img
          src={`${process.env.PUBLIC_URL}/assets/google-play.png`}
          alt="Coming Soon to Google Play"
          style={{ height: '40px', width: 'auto', marginBottom: '7.5px'}}
        />
          <img
            src={`${process.env.PUBLIC_URL}/assets/coming-soon.png`}
            alt="Coming Soon Ribbon"
            style={{
              position: 'absolute',
              top: '20px', // Adjust as needed to align the ribbon properly
              right: '-10px', // Adjust as needed to align the ribbon properly
              height: '25px', // Adjust size as needed
              width: 'auto',
            }}
          />
      </Box>

    </Box>
  );
};

export default FeaturedGame;