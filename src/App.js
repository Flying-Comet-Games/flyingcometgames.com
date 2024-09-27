import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

import ColorMatcher from './games/ColorMatcher';
import DigitShift from './games/DigitShift';
import WordWizard from './games/WordWizard';
import Home from './components/Home';
import ShapeSorter from './games/ShapeSorter';
import PatternPredictor from './games/PatternPredictor';
import SwampCleanupChallenge from './games/SwampCleanupChallenge';
import TarnishedOrdeal from './games/TarnishedOrdeal';
import ColorFlood from './games/ColorFlood';
import MemoryMaze from './games/MemoryMaze';

import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
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
                  href="mailto:calli@enhancenothing.com,eden@enhancenothing.com"
                  aria-label="Contact"
                >
                  <EmailIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/color-matcher" element={<ColorMatcher />} />
            <Route path="/digit-shift" element={<DigitShift />} />
            <Route path="/word-wizard" element={<WordWizard />} />
            <Route path="/shape-sorter" element={<ShapeSorter />} />
            <Route path="/pattern-predictor" element={<PatternPredictor />} />
            <Route path="/swamp-cleanup-challenge" element={<SwampCleanupChallenge />} />
            <Route path="/tarnished-ordeal" element={<TarnishedOrdeal />} />
            <Route path="/pattern-predictor" element={<PatternPredictor />} />
            <Route path="/color-flood" element={<ColorFlood />} />
            <Route path="/memory-maze" element={<MemoryMaze />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;