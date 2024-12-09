import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { logGameStarted, logGameEnded, logGameShared } from "../../analytics";
import { getPTDate, formatPTDateString } from "../utils/date";

const GAME_STATES = {
  WELCOME: "welcome",
  PLAYING: "playing",
  COMPLETED: "completed",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calculateScore = (
  guessYear,
  actualYear,
  guessMonth,
  actualMonth,
  isBonus
) => {
  const yearDiff = Math.abs(guessYear - actualYear);
  let score = 0;

  if (yearDiff === 0) {
    score = 100;
  } else if (yearDiff === 1) {
    score = 75;
  } else if (yearDiff <= 3) {
    score = 50;
  } else if (yearDiff <= 5) {
    score = 25;
  } else if (yearDiff <= 10) {
    score = 10;
  }

  if (isBonus && guessMonth === actualMonth && yearDiff === 0) {
    score += 50;
  }

  return score;
};

const getFeedbackMessage = (yearDiff) => {
  if (yearDiff === 0) return "Time lord status achieved! 🎯";
  if (yearDiff === 1) return "So close! Just a year off!";
  if (yearDiff <= 3) return "Pretty good! Only a few years away!";
  if (yearDiff <= 5) return "You're in the right era at least!";
  if (yearDiff <= 10) return "Well, you got the right decade!";
  return "Time is a mysterious thing, isn't it?";
};

const MediaDisplay = ({ item }) => {
  if (item.category === "Movie") {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          maxHeight: 350,
          mx: "auto",
          aspectRatio: "2/3",
          position: "relative",
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.displayTitle}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            // borderRadius: "8px",
            // boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        />
      </Box>
    );
  }

  // For Games and Music, show YouTube embed
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        aspectRatio: "16/9",
        position: "relative",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${item.youtubeId}`}
        title={item.trailerTitle || item.displayTitle}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
};

const BaseTempus = ({ title, items, theme, shareText, shareUrl }) => {
  const [gameState, setGameState] = useState(GAME_STATES.WELCOME);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [guessYear, setGuessYear] = useState(1987);
  const [guessMonth, setGuessMonth] = useState(0);
  const [scores, setScores] = useState([]);
  const [showShareToast, setShowShareToast] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const themeInstance = useTheme();

  const currentItem = items?.[currentItemIndex];
  const isBonus = currentItem?.isBonus;
  const totalScore = scores.reduce((sum, score) => sum + score, 0);

  const handleStartGame = () => {
    logGameStarted("Tempus", { theme: title });
    setGameState(GAME_STATES.PLAYING);
  };

  const handleYearChange = (_, newValue) => {
    setGuessYear(newValue);
  };

  const handleMonthChange = (event) => {
    setGuessMonth(event.target.value);
  };

  const handleSubmit = () => {
    if (!currentItem) return;

    const score = calculateScore(
      guessYear,
      currentItem.year,
      guessMonth,
      currentItem.month,
      isBonus
    );

    setScores([...scores, score]);
    setHasSubmitted(true);

    setTimeout(() => {
      if (currentItemIndex < items.length - 1) {
        setCurrentItemIndex((prev) => prev + 1);
        setGuessYear(1987);
        setGuessMonth(0);
        setHasSubmitted(false);
      } else {
        setGameState(GAME_STATES.COMPLETED);
        logGameEnded("Tempus", { theme: title, score: totalScore + score });
      }
    }, 3000);
  };

  const getShareText = () => {
    const date = formatPTDateString(new Date());
    return `${shareText} ${date}\nScore: ${totalScore}/750\n\nPlay at: ${shareUrl}`;
  };

  const handleShare = async () => {
    const text = getShareText();
    logGameShared("Tempus", { theme: title, score: totalScore });

    try {
      await navigator.clipboard.writeText(text);
      setShowShareToast(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderWelcomeScreen = () => (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Box>
        <Typography
          sx={{
            fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Welcome to
        </Typography>

        <Typography
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
            textAlign: "center",
            fontWeight: 900,
          }}
        >
          Tempus!
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Today's theme: {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Tempus is a game inspired by{" "}
        <a
          href="https://playdopple.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "underline",
          }}
        >
          Dopple
        </a>
        . You are shown five different forms of media and have to guess what
        year that media was published. The closer you are to the correct year
        the better your score will be.
      </Typography>
      <Button variant="contained" onClick={handleStartGame} sx={{ mt: 2 }}>
        Start Game
      </Button>
    </Box>
  );

  const renderPlayingScreen = () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Current Score: {totalScore}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <MediaDisplay item={currentItem} />
      </Box>

      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        {currentItem.displayTitle}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom>Select Year:</Typography>
        <Slider
          value={guessYear}
          onChange={handleYearChange}
          min={1950}
          max={2024}
          valueLabelDisplay="on"
          disabled={hasSubmitted}
          marks={[
            { value: 1950, label: "1950" },
            { value: 2024, label: "2024" },
          ]}
        />
      </Box>

      {isBonus && (
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Select Month</InputLabel>
            <Select
              value={guessMonth}
              onChange={handleMonthChange}
              label="Select Month"
              disabled={hasSubmitted}
            >
              {MONTHS.map((month, index) => (
                <MenuItem key={month} value={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {!hasSubmitted ? (
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            py: 2,
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Submit Guess
        </Button>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Correct Answer: {MONTHS[currentItem.month]} {currentItem.year}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {getFeedbackMessage(Math.abs(guessYear - currentItem.year))}
          </Typography>
          <Typography variant="body1">
            You scored: {scores[scores.length - 1]} points
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderCompletedScreen = () => (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Game Complete!
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Final Score: {totalScore}
      </Typography>
      <Button variant="contained" onClick={handleShare} sx={{ mb: 2 }}>
        Share Result
      </Button>
      <Typography variant="body2" sx={{ mt: 4 }}>
        Come back tomorrow for a new challenge!
      </Typography>
    </Box>
  );

  const renderCurrentScreen = () => {
    switch (gameState) {
      case GAME_STATES.WELCOME:
        return renderWelcomeScreen();
      case GAME_STATES.PLAYING:
        return renderPlayingScreen();
      case GAME_STATES.COMPLETED:
        return renderCompletedScreen();
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          maxWidth: "sm",
          mx: "auto",
          width: "100%",
        }}
      >
        {renderCurrentScreen()}
      </Box>
      <Snackbar
        open={showShareToast}
        autoHideDuration={3000}
        onClose={() => setShowShareToast(false)}
      >
        <Alert severity="success">Result copied to clipboard!</Alert>
      </Snackbar>
    </Box>
  );
};

export default BaseTempus;
