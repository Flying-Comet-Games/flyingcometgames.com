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
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2, // Space between buttons
        }}
      >
        <Link to={appStoreLink}>
          <Box
            component="img"
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1726963200"
            alt="Download on the App Store"
            sx={{
              height: '40px',
              width: 'auto',
            }}
          />
        </Link>
        <Link to="https://play.google.com/store/apps/details?id=com.enhancenothing.com.android.keepbufoalive">
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/google-play.png`}
            alt="Download on the Google Play Store"
            sx={{
              height: '40px',
              width: 'auto',
            }}
          />
        </Link>
      </Box>


    </Box>
  );
};

export default FeaturedGame;