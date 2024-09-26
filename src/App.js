import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import ColorMatcher from './games/ColorMatcher';
import DigitShift from './games/DigitShift';
import WordWizard from './games/WordWizard';
import Home from './components/Home';
import ShapeSorter from './games/ShapeSorter';
import PatternPredictor from './games/PatternPredictor';
import SwampCleanupChallenge from './games/SwampCleanupChallenge';
import TarnishedOrdeal from './games/TarnishedOrdeal';

import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0}>
            <Toolbar>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/logo-vertical.svg`}
                  alt="Flying Comet Games Logo"
                  style={{ height: '40px', marginRight: '10px' }}
                />
              </Box>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
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
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;