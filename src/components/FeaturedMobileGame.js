import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const FeaturedMobileGame = ({ title, description, appStoreLink, appStoreImageSrc }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        padding: { xs: 3, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        background: "#b8c26c",
        color: theme.palette.text.primary,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: theme.shadows[2],
        mb: 0.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          component="img"
          src={appStoreImageSrc}
          alt={`${title} logo`}
          sx={{
            width: { xs: '60px', sm: '70px' },
            height: { xs: '60px', sm: '70px' },
            // objectFit: 'cover',
            mr: 1,
          }}
        />
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2rem' },
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
          lineHeight: 1.5,
          color: theme.palette.text.secondary,
          mb: 3,
        }}
      >
        {description}
      </Typography>
      <Box
        sx={{
          mt: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 2,
          mx: 'auto',
        }}
      >
        <Link to={appStoreLink}>
          <Box
            component="img"
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1726963200"
            alt="Download on the App Store"
            sx={{
              height: { xs: '35px', sm: '40px' },
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
              height: { xs: '35px', sm: '40px' },
              width: 'auto',
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default FeaturedMobileGame;
