import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CookieConsent from 'react-cookie-consent';
import AppContent from './AppContent';
import { initGA, logPageView, setUserId } from './analytics';

import ColorMatcher from './games/ColorMatcher';
import DigitShift from './games/DigitShift';
import WordWizard from './games/WordWizard';
import Home from './components/Home';
import ShapeSorter from './games/ShapeSorter';
import ColorFlood from './games/ColorFlood';
import MemoryMaze from './games/MemoryMaze';
import AvoidBlocks from './games/AvoidBlocks';
import theme from './theme';
import wordyVerseTheme from './wordyVerseTheme'
import EmojiQuest from './games/EmojiQuest';
import ColorDash from './games/ColorDash';
import StartupSpeedrunSimulator from './games/StartupSpeedrunSimulator';
import WhackAMole from './games/WhackAMole';
import GardenPuzzleGame from './games/GardenPuzzle';
import TwitterStrands from './games/TwitterStrands/TwitterStrands';
import WordyVerse from './games/WordyVerse/WordyVerse';
import WordyVerseToolbar from './games/WordyVerse/Toolbar';
import AccountingWordle from './games/WordyVerse/Topics/AccountingWordle/AccountingWordle';
import NYTGuild from './games/WordyVerse/Topics/NYTGuild/NYTGuild';

const getTheme = (pathname) => {
  if (pathname.startsWith('/wordy-verse')) {
    return wordyVerseTheme;
  }
  return theme;
};

// Create a separate component for the router content
function AppRouter({ onAcceptCookie, onDeclineCookie }) {
  const location = useLocation();

  return (
    <>
      <ThemeProvider theme={getTheme(location.pathname)}>
        {location.pathname.startsWith('/wordy-verse') ? <WordyVerseToolbar /> : <AppContent />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/color-matcher" element={<ColorMatcher />} />
          <Route path="/digit-shift" element={<DigitShift />} />
          <Route path="/word-wizard" element={<WordWizard />} />
          <Route path="/shape-sorter" element={<ShapeSorter />} />
          <Route path="/color-flood" element={<ColorFlood />} />
          <Route path="/memory-maze" element={<MemoryMaze />} />
          <Route path="/avoid-blocks" element={<AvoidBlocks />} />
          <Route path="/cowboy-quest" element={<EmojiQuest />} />
          <Route path="/color-dash" element={<ColorDash />} />
          <Route path="/startup-speedrun-simulator" element={<StartupSpeedrunSimulator />} />
          <Route path="/whack-a-mole" element={<WhackAMole />} />
          <Route path="/garden-puzzle" element={<GardenPuzzleGame />} />
          <Route path="/my-strands" element={<TwitterStrands />} />
          <Route path="/wordy-verse/accounting-wordle" element={<AccountingWordle />} />
          <Route path="/wordy-verse/nyt-guild-support" element={<NYTGuild />} />
          <Route path="/wordy-verse" element={<WordyVerse />} />
        </Routes>

        <CookieConsent
          location="bottom"
          buttonText="Accept All"
          declineButtonText="Reject All"
          cookieName="ga_cookie_consent"
          style={{
            background: "rgba(53, 53, 53, 0.9)",
            padding: "20px",
            alignItems: "center",
            gap: "20px"
          }}
          buttonStyle={{
            background: "#4CAF50",
            color: "#ffffff",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
          declineButtonStyle={{
            background: "transparent",
            color: "#ffffff",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "1px solid #ffffff",
            transition: "all 0.3s ease",
          }}
          enableDeclineButton
          onAccept={onAcceptCookie}
          onDecline={onDeclineCookie}
          expires={150}
          ButtonComponent={({ style, ...props }) => (
            <button
              {...props}
              style={{
                ...style,
                ":hover": {
                  background: "#45a049",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }
              }}
            />
          )}
          DeclineButtonComponent={({ style, ...props }) => (
            <button
              {...props}
              style={{
                ...style,
                ":hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                }
              }}
            />
          )}
        >
          <span style={{ fontSize: "16px", marginRight: "20px" }}>
            This website uses cookies to enhance your experience and analyze site traffic.
          </span>
        </CookieConsent>
      </ThemeProvider>
    </>
  );
}

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ga_cookie_consent');
    if (consent === 'true') {
      initializeAnalytics();
    }
  }, []);

  const initializeAnalytics = () => {
    initGA('G-1SN5WZ4TEC');
    logPageView();

    const userId = localStorage.getItem('userId') || Math.random().toString(36).substring(2, 15);
    localStorage.setItem('userId', userId);
    setUserId(userId);
  };

  const handleAcceptCookie = () => {
    setCookiesAccepted(true);
    initializeAnalytics();
  };

  const handleDeclineCookie = () => {
    setCookiesAccepted(false);
    localStorage.removeItem('ga_cookie_consent');
    localStorage.removeItem('userId');
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <CssBaseline />
      <AppRouter
        onAcceptCookie={handleAcceptCookie}
        onDeclineCookie={handleDeclineCookie}
      />
    </Router>
  );
}

export default App;