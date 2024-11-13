import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CookieConsent from "react-cookie-consent";
import AppContent from "./AppContent";
import {
  initializeAnalytics,
  disableAnalytics,
  logUserLogin,
  enableAnalytics
} from "./analytics";

import ColorMatcher from "./games/ColorMatcher";
import DigitShift from "./games/DigitShift";
import WordWizard from "./games/WordWizard";
import Home from "./components/Home";
import ShapeSorter from "./games/ShapeSorter";
import ColorFlood from "./games/ColorFlood";
import MemoryMaze from "./games/MemoryMaze";
import theme from "./theme";
import AvoidBlocks from "./games/AvoidBlocks";
import wordyVerseTheme from "./wordyVerseTheme";
import EmojiQuest from "./games/EmojiQuest";
import ColorDash from "./games/ColorDash";
import StartupSpeedrunSimulator from "./games/StartupSpeedrunSimulator";
import WhackAMole from "./games/WhackAMole";
import GardenPuzzleGame from "./games/GardenPuzzle";
import TwitterStrands from "./games/TwitterStrands/TwitterStrands";
import WordyVerse from "./games/WordyVerse/WordyVerse";
import WordyVerseToolbar from "./games/WordyVerse/Toolbar";
import AccountingWordy from "./games/WordyVerse/Topics/AccountingWordle/AccountingWordle";
import NYTGuild from "./games/WordyVerse/Topics/NYTGuild/NYTGuild";
import Auth from "./Auth";
import BobaWordy from "./games/WordyVerse/Topics/Boba/Boba";
import GymnasticsWordy from "./games/WordyVerse/Topics/Gymnastics/Gymnastics";
import SeattleWordy from "./games/WordyVerse/Topics/Seattle/Seattle";
import YogaWordy from "./games/WordyVerse/Topics/Yoga/Yoga";
import YCombinatorWordy from "./games/WordyVerse/Topics/YC/YC";
import AmericanDadWordy from "./games/WordyVerse/Topics/AmericanDad/AmericanDad";
import SurvivorWordy from "./games/WordyVerse/Topics/Survivor/Survivor";
import AuthenticatePage from "./AuthenticatePage";
import FriendsWordy from "./games/WordyVerse/Topics/Friends/Friends";
import AnimalCrossingWordy from "./games/WordyVerse/Topics/AnimalCrossing/AnimalCrossing";
import OccupationalTherapyWordy from "./games/WordyVerse/Topics/OccupationalTherapy/OT";
import TermsOfUse from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import WordyVerseAbout from "./games/WordyVerse/About";

const COOKIE_CONSENT_KEY = "analytics_cookie_consent";
const USER_ID_KEY = "user_id";

const getTheme = (pathname) => {
  if (pathname.startsWith("/wordy-verse")) {
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
        {location.pathname.startsWith("/wordy-verse") ? (
          <WordyVerseToolbar />
        ) : (
          <AppContent />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/color-matcher" element={<ColorMatcher />} />
          <Route path="/digit-shift" element={<DigitShift />} />
          <Route path="/word-wizard" element={<WordWizard />} />
          <Route path="/shape-sorter" element={<ShapeSorter />} />
          <Route path="/color-flood" element={<ColorFlood />} />
          <Route path="/memory-maze" element={<MemoryMaze />} />
          <Route path="/avoid-blocks" element={<AvoidBlocks />} />
          <Route path="/cowboy-quest" element={<EmojiQuest />} />
          <Route path="/color-dash" element={<ColorDash />} />
          <Route
            path="/startup-speedrun-simulator"
            element={<StartupSpeedrunSimulator />}
          />
          <Route path="/whack-a-mole" element={<WhackAMole />} />
          <Route path="/garden-puzzle" element={<GardenPuzzleGame />} />
          <Route path="/my-strands" element={<TwitterStrands />} />
          <Route
            path="/wordy-verse/accounting-wordle"
            element={<AccountingWordy />}
          />
          <Route path="/wordy-verse/nyt-guild-support" element={<NYTGuild />} />
          <Route path="/wordy-verse/boba-tea" element={<BobaWordy />} />
          <Route path="/wordy-verse" element={<WordyVerse />} />
          <Route path="/wordy-verse/about" element={<WordyVerseAbout />} />
          <Route path="/wordy-verse/auth" element={<Auth />} />
          <Route path="/wordy-verse/gymnastics" element={<GymnasticsWordy />} />
          <Route path="/wordy-verse/seattle" element={<SeattleWordy />} />
          <Route path="/wordy-verse/yoga" element={<YogaWordy />} />
          <Route path="/wordy-verse/yc" element={<YCombinatorWordy />} />
          <Route
            path="/wordy-verse/american-dad"
            element={<AmericanDadWordy />}
          />
          <Route path="/wordy-verse/survivor" element={<SurvivorWordy />} />
          <Route path="/authenticate" element={<AuthenticatePage />} />
          <Route path="/wordy-verse/friends" element={<FriendsWordy />} />
          <Route
            path="/wordy-verse/animal-crossing"
            element={<AnimalCrossingWordy />}
          />
          <Route
            path="/wordy-verse/occupational-therapy"
            element={<OccupationalTherapyWordy />}
          />
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
            gap: "20px",
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
                },
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
                },
              }}
            />
          )}
        >
          <span style={{ fontSize: "16px", marginRight: "20px" }}>
            This website uses cookies to enhance your experience and analyze
            site traffic.
          </span>
        </CookieConsent>
      </ThemeProvider>
    </>
  );
}

function App() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Check for existing consent on mount
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const userId = localStorage.getItem(USER_ID_KEY);

      // Always initialize analytics
      initializeAnalytics();

      if (consent === "true") {
        setCookiesAccepted(true);
        enableAnalytics();  // Explicitly enable tracking

        if (userId) {
          logUserLogin(userId, {
            returningUser: true,
            consentStatus: "accepted",
          });
        } else {
          const newUserId = generateUserId();
          localStorage.setItem(USER_ID_KEY, newUserId);
          logUserLogin(newUserId, {
            newUser: true,
            consentStatus: "accepted",
          });
        }
      }
    };

    checkConsent();
  }, []);
  const generateUserId = () => {
    return `u_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  };

  const handleAcceptCookie = () => {
    try {
      setCookiesAccepted(true);
      localStorage.setItem(COOKIE_CONSENT_KEY, "true");

      // First initialize analytics
      initializeAnalytics();
      enableAnalytics();  // Explicitly enable tracking

      // Handle user identification
      const existingUserId = localStorage.getItem(USER_ID_KEY);
      const userId = existingUserId || generateUserId();

      if (!existingUserId) {
        localStorage.setItem(USER_ID_KEY, userId);
      }

      // Log the user with consent status
      logUserLogin(userId, {
        newUser: !existingUserId,
        consentStatus: "accepted",
        consentTimestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error handling cookie acceptance:", error);
    }
  };

  const handleDeclineCookie = () => {
    try {
      setCookiesAccepted(false);

      // Clear consent and user data
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      localStorage.removeItem(USER_ID_KEY);

      // Disable analytics tracking
      disableAnalytics();

      // Optionally log the decline (if allowed by your privacy policy)
      if (cookiesAccepted) {
        logUserLogin("anonymous", {
          consentStatus: "revoked",
          consentTimestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error handling cookie decline:", error);
    }
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <CssBaseline />
      <AppRouter
        onAcceptCookie={handleAcceptCookie}
        onDeclineCookie={handleDeclineCookie}
        cookiesAccepted={cookiesAccepted}
      />
    </Router>
  );
}

export default App;
