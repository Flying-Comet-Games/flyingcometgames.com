import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Tooltip, Snackbar } from "@mui/material";
import { ChevronLeft, ChevronRight, Lightbulb, Share2 } from "lucide-react";
import { getWordForDate, findLatestAvailableDate } from "./Data";
import { keyframes } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const shakeTiles = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  40% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const flipTile = keyframes`
  0% { transform: rotateX(0); }
  50% { transform: rotateX(90deg); }
  100% { transform: rotateX(0); }
`;

const KEYBOARD_KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function NYTGuild() {
  const [currentDate, setCurrentDate] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [invalidGuess, setInvalidGuess] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isGuessFocused, setIsGuessFocused] = useState(false);
  const theme = useTheme();

  // Initial mount effect
  useEffect(() => {
    const latestWordData = findLatestAvailableDate();
    if (latestWordData) {
      const ptDate = new Date(latestWordData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
      setWordData(latestWordData);
    }
  }, []);

  // Date change effect
  useEffect(() => {
    if (!currentDate) return;

    const data = getWordForDate(currentDate);
    if (!data) {
      const latestWordData = findLatestAvailableDate();
      if (latestWordData) {
        setCurrentDate(new Date(latestWordData.date));
        setWordData(latestWordData);
      }
      return;
    }

    setWordData(data);
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setShowHint(false);
  }, [currentDate]);

  const getKeyboardKeyColor = (key) => {
    if (!wordData) return "#d3d6da"; // Default gray

    const keyUpperCase = key.toUpperCase();
    const wordUpperCase = wordData.word.toUpperCase();
    let keyFound = false;
    let correctPosition = false;

    // First check if the letter exists in the target word at all
    const letterInWord = wordUpperCase.includes(keyUpperCase);

    // Only proceed with position checking if the letter is in the word
    if (letterInWord) {
      for (let guess of guesses) {
        const guessArray = guess.toUpperCase().split("");
        for (let i = 0; i < guessArray.length; i++) {
          if (guessArray[i] === keyUpperCase) {
            keyFound = true;
            if (keyUpperCase === wordUpperCase[i]) {
              correctPosition = true;
              break;
            }
          }
        }
        if (correctPosition) break;
      }
    }

    if (correctPosition) return "#B4D5A7"; // Green for correct position
    if (letterInWord && keyFound) return "#F5DEB3"; // Yellow for found but wrong position
    return guesses.some((guess) => guess.toUpperCase().includes(keyUpperCase))
      ? "#787c7e"
      : "#d3d6da"; // Dark gray for used, light gray for unused
  };

  const handleKeyClick = (key) => {
    if (gameOver) return;

    if (key === "ENTER") {
      handleKeyPress({ key: "Enter" }); // Changed from 'ENTER' to 'Enter'
    } else if (key === "⌫") {
      handleKeyPress({ key: "Backspace" });
    } else {
      handleKeyPress({ key: key.toLowerCase() }); // Ensure we're passing lowercase for letter keys
    }
  };

  const renderKeyboard = () => {
    return KEYBOARD_KEYS.map((row, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.25,
          m: 0.5,
        }}
      >
        {row.map((key) => (
          <Box
            key={key}
            onClick={() => handleKeyClick(key)}
            sx={{
              backgroundColor: getKeyboardKeyColor(key),
              color: "black",
              minWidth: key === "ENTER" || key === "⌫" ? "55px" : "36px",
              height: "58px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              fontSize: key === "ENTER" || key === "⌫" ? "12px" : "1.25em",
              fontWeight: "bold",
              cursor: "pointer",
              userSelect: "none",
              textTransform: "uppercase",
              transition: "transform 0.1s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            {key}
          </Box>
        ))}
      </Box>
    ));
  };

  const formatDateString = (date) => {
    const ptDate = new Date(
      date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
    return (
      ptDate.getFullYear() +
      "-" +
      String(ptDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(ptDate.getDate()).padStart(2, "0")
    );
  };

  const changeDate = (increment) => {
    if (!currentDate) return;

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);

    const newWordData = getWordForDate(newDate);
    if (newWordData && newWordData.date) {
      // Create new date object from the date string, forcing PT interpretation
      const ptDate = new Date(newWordData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
    }
  };

  const handleKeyPress = (e) => {
    if (!wordData) return;

    // Remove the isGuessFocused check since virtual keyboard clicks should always work
    if (e.key === "Enter" && currentGuess.length === wordData.word.length) {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      // Check for win
      if (currentGuess.toUpperCase() === wordData.word.toUpperCase()) {
        setGameOver(true);
        setCurrentGuess("");
        return;
      }

      // Check for game over (used all attempts)
      if (newGuesses.length >= 5) {
        setGameOver(true);
      }

      setCurrentGuess("");
    } else if (e.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (
      /^[A-Za-z]$/.test(e.key) &&
      currentGuess.length < wordData.word.length
    ) {
      setCurrentGuess((prev) => (prev + e.key).toUpperCase());
    }
  };

  useEffect(() => {
    const handleFocus = () => setIsGuessFocused(true);
    const handleBlur = () => setIsGuessFocused(false);

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [currentGuess, gameOver, wordData, isGuessFocused]);

  const getLetterBGColor = (letter, index, isGuessed) => {
    if (!isGuessed || !wordData) return "white";
    if (letter.toUpperCase() === wordData.word[index].toUpperCase())
      return "#B4D5A7";
    if (wordData.word.toUpperCase().includes(letter.toUpperCase()))
      return "#F5DEB3";
    return "#d3d6da";
  };

  const getShareEmoji = (letter, index, word) => {
    if (letter.toUpperCase() === word[index].toUpperCase()) return "🟩";
    if (word.toUpperCase().includes(letter.toUpperCase())) return "🟨";
    return "⬛";
  };

  const handleShare = () => {
    const dateStr = currentDate.toLocaleDateString("en-US");
    const attemptCount = guesses.length;
    const won =
      guesses[guesses.length - 1].toUpperCase() === wordData.word.toUpperCase();

    let shareText = `NYT Guild Support Wordy ${dateStr} ${
      won ? attemptCount : "X"
    }/5\n\n`;

    shareText += guesses
      .map((guess) =>
        Array.from(guess)
          .map((letter, i) => getShareEmoji(letter, i, wordData.word))
          .join("")
      )
      .join("\n");

    shareText +=
      "\n\nPlay at: https://flyingcometgames.com/wordy-verse/nyt-guild-support";

    navigator.clipboard
      .writeText(shareText)
      .then(() => setShowShareToast(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  const renderGrid = () => {
    if (!wordData) return null;

    const rows = 5;
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < wordData.word.length; j++) {
        let letter = "";
        let bgcolor = "white";
        let isRevealed = false;

        if (i < guesses.length) {
          letter = guesses[i][j];
          bgcolor = getLetterBGColor(letter, j, true);
          isRevealed = true;
        } else if (i === guesses.length && j < currentGuess.length) {
          letter = currentGuess[j];
        }

        row.push(
          <Box
            key={`${i}-${j}`}
            sx={{
              width: 60,
              height: 60,
              border: "2px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: bgcolor,
              fontSize: "2rem",
              fontWeight: "bold",
              m: 0.5,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              animation: isRevealed
                ? `${flipTile} 0.6s ${j * 0.1}s`
                : letter
                ? `${popIn} 0.1s ease-in-out`
                : "none",
              "&.shake": {
                animation: `${shakeTiles} 0.3s ease-in-out`,
              },
            }}
          >
            {letter}
          </Box>
        );
      }
      grid.push(
        <Box key={i} sx={{ display: "flex", justifyContent: "center" }}>
          {row}
        </Box>
      );
    }
    return grid;
  };

  if (!wordData) return null;

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/wordy-topics/nyt-guild.svg`}
          alt="NYT Guild Logo"
          style={{
            width: "64px",
            height: "54px",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            variant="h4"
           sx={{ fontWeight: "bold", color: "black", lineHeight: 1 }}
          >
            NYT Guild
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          textAlign: "center", // Ensures left alignment with "ACCOUNTING"
        }}
      >
        Play games made by the NYT Guild workers on strike <Link to="/">here</Link>.
        Donate to the strike <Link to="/">here.</Link>
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() => changeDate(-1)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1} // Prevent tab focus
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ mx: 2, color: "black" }}>
            {currentDate.toLocaleDateString("en-US")}
          </Typography>
          <IconButton
            onClick={() => changeDate(1)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1} // Prevent tab focus
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Tooltip
          title={showHint ? `Topic: ${wordData.theme}` : "Need a hint?"}
          arrow
          placement="top"
        >
          <IconButton
            onClick={() => setShowHint(!showHint)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1} // Prevent tab focus
            sx={{
              color: showHint ? "#F93854" : "action.disabled",
              "&:hover": { color: "#F93854" },
              transition: "color 0.3s ease",
            }}
          >
            <Lightbulb size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {showHint && (
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            color: "#F93854",
            fontStyle: "italic",
            animation: `${popIn} 0.3s ease-in`,
          }}
        >
          Hint: {wordData.theme}
        </Typography>
      )}

      {renderGrid()}

      <Box sx={{ mt: 2, mb: 4 }}>{renderKeyboard()}</Box>

      {gameOver && (
        <Box
          sx={{
            mt: "auto",
            pt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color:
                guesses[guesses.length - 1].toUpperCase() ===
                wordData.word.toUpperCase()
                  ? "success.main"
                  : "error.main",
              fontWeight: "bold",
            }}
          >
            {guesses[guesses.length - 1].toUpperCase() ===
            wordData.word.toUpperCase()
              ? `You won in ${guesses.length} ${
                  guesses.length === 1 ? "try" : "tries"
                }!`
              : `Game Over! The word was ${wordData.word}`}
          </Typography>

          <Box
            onClick={handleShare}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              backgroundColor: "#cca59f",
              color: "black",
              py: 2,
              px: 4,
              borderRadius: 2,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#d32f2f",
                transform: "scale(1.02)",
              },
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              width: "fit-content",
            }}
          >
            <Share2 size={24} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Share Result
            </Typography>
          </Box>
        </Box>
      )}

      <Snackbar
        open={showShareToast}
        autoHideDuration={3000}
        onClose={() => setShowShareToast(false)}
        message="Results copied to clipboard!"
      />
    </Box>
  );
}
