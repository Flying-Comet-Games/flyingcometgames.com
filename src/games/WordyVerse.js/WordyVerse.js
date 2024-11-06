import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import TopicsBody from './TopicsBody';

const WordyVerse = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflowX: 'hidden', // Prevent horizontal overflow
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Helmet>
        <title>Wordy Verse</title>
        <meta name="description" content="Enjoy engaging online puzzle games, word games, and casual games similar to NYT Games. Challenge yourself with our collection of brain teasers and addictive puzzles." />
      </Helmet>

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2,
          py: { xs: 2, sm: 3, md: 4 },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            maxWidth: '600px',
            textAlign: 'left',
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Wordy Verse
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              pb: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            Puzzles from your favorite wordy verse &#127757;
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
            overflow: 'hidden', // Prevent horizontal overflow from content
          }}
        >
          <TopicsBody />
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Flying Comet Games. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default WordyVerse;
