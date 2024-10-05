import React, { useState } from 'react';
import { Box, Typography, Button, Collapse, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';

const CollapsibleSEOContent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ maxWidth: '800px', textAlign: 'left', margin: '0 auto', paddingBottom: '2rem' }}>
      <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Online Puzzle Games for All Skill Levels
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Flying Comet Games offers a diverse collection of online puzzle games, word games, and casual games that challenge your mind and entertain for hours. Our games are designed to be similar to popular NYT Games, providing an excellent alternative for puzzle enthusiasts.
      </Typography>
      <Button
        variant="outlined"
        onClick={() => setExpanded(!expanded)}
        sx={{
          textDecoration: 'none',
          // color: 'primary.main',
          marginBottom: 2,
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {expanded ? 'Read Less' : 'Read More About Our Games'}
      </Button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography variant="h3" component="h3" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          Popular Game Categories
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Word Puzzles"
              secondary="Test your vocabulary with our Wordle-style games and crossword challenges."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Number Games"
              secondary="Enjoy Sudoku puzzles and math-based brain teasers."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Strategy Games"
              secondary="Challenge yourself with our collection of strategic puzzle games."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Casual Games"
              secondary="Relax with our selection of easy-to-play casual games."
            />
          </ListItem>
        </List>

        <Typography variant="h3" component="h3" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          Why Choose Flying Comet Games?
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Browser-Based"
              secondary="Play directly in your web browser without any downloads or installations."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Daily Challenges"
              secondary="New puzzles and games added regularly to keep you engaged."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Mobile-Friendly"
              secondary="Enjoy our games on any device, from desktop to smartphone."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Diverse Selection"
              secondary="A wide variety of games to suit different preferences and skill levels."
            />
          </ListItem>
        </List>

        <Typography variant="body1" component="p" gutterBottom>
          Whether you're a casual player or a puzzle aficionado, Flying Comet Games has something for everyone. Start playing today and challenge your brain with our exciting collection of online games!
        </Typography>

        <Typography variant="h3" component="h3" gutterBottom sx={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: 2 }}>
          Our Most Popular Games
        </Typography>
        <List>
          <ListItem>
            <Link to="/word-wizard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText
                primary="Word Wizard"
                secondary="A Wordle-style game that challenges your vocabulary daily."
              />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/digit-shift" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText
                primary="Digit Shift"
                secondary="A number puzzle game that tests your logical thinking."
              />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/color-flood" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText
                primary="Color Flood"
                secondary="A strategic color-based puzzle game."
              />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/startup-speedrun-simulator" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText
                primary="Startup Speedrun Simulator"
                secondary="Build your own tech startup in this addictive clicker game."
              />
            </Link>
          </ListItem>
        </List>
      </Collapse>
    </Box>
  );
};

export default CollapsibleSEOContent;