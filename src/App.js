import React, {useEffect } from 'react';
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
import CookieConsent from 'react-cookie-consent';
import AppContent from './AppContent';
import { initGA, logPageView, setUserId } from './Analytics';

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
  useEffect(() => {
    initGA('G-1SN5WZ4TEC');
    logPageView();

    // Generate a unique user ID and set it
    const userId = localStorage.getItem('userId') || Math.random().toString(36).substring(2, 15);
    localStorage.setItem('userId', userId);
    setUserId(userId);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
        <AppContent />
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

          <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="ga_cookie_consent"
            style={{ background: "#2B373B" }}
            buttonStyle={{ background: theme.palette.primary.main, color: "#ffffff", fontSize: "13px" }}
            expires={150}
          >
            This website uses cookies to enhance the user experience and analyze site traffic.
          </CookieConsent>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;