import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Tooltip, Snackbar } from "@mui/material";
import { ChevronLeft, ChevronRight, Lightbulb, Share2 } from "lucide-react";
import { keyframes } from "@mui/system";

// Keyboard layout configuration
const KEYBOARD_KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

// Animation keyframes
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

const BaseWordyGame = ({
  title,
  iconPath,
  subtitle,
  shareText,
  shareUrl,
  getWordForDate,
  findLatestAvailableDate,
}) => {
  const [currentDate, setCurrentDate] = useState(null);
  const [wordData, setWordData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isGuessFocused, setIsGuessFocused] = useState(false);

  // Initial game setup
  useEffect(() => {
    const latestWordData = findLatestAvailableDate();
    if (latestWordData) {
      const ptDate = new Date(latestWordData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
      setWordData(latestWordData);
    }
  }, []);

  // Handle date changes
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

  // Keyboard event handling
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

  const handleKeyPress = (e) => {
    if (!wordData || gameOver) return;

    if (e.key === "Enter" && currentGuess.length === wordData.word.length) {
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      if (currentGuess.toUpperCase() === wordData.word.toUpperCase()) {
        setGameOver(true);
        setCurrentGuess("");
        return;
      }

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

  const handleKeyClick = (key) => {
    if (gameOver) return;

    if (key === "ENTER") {
      handleKeyPress({ key: "Enter" });
    } else if (key === "⌫") {
      handleKeyPress({ key: "Backspace" });
    } else {
      handleKeyPress({ key: key.toLowerCase() });
    }
  };

  const getKeyboardKeyColor = (key) => {
    if (!wordData) return "#d3d6da";

    const keyUpperCase = key.toUpperCase();
    const wordUpperCase = wordData.word.toUpperCase();
    let keyFound = false;
    let correctPosition = false;

    const letterInWord = wordUpperCase.includes(keyUpperCase);

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

    if (correctPosition) return "#B4D5A7";
    if (letterInWord && keyFound) return "#F5DEB3";
    return guesses.some((guess) => guess.toUpperCase().includes(keyUpperCase))
      ? "#787c7e"
      : "#d3d6da";
  };

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

    let shareString = `${shareText} ${dateStr} ${
      won ? attemptCount : "X"
    }/5\n\n`;
    shareString += guesses
      .map((guess) =>
        Array.from(guess)
          .map((letter, i) => getShareEmoji(letter, i, wordData.word))
          .join("")
      )
      .join("\n");
    shareString += `\n\nPlay at: ${shareUrl}`;

    navigator.clipboard
      .writeText(shareString)
      .then(() => {
        setShowShareToast(true);
        // Log the share event with game details
        logEvent('Game', 'Share', title, {
          game_name: title,
          won: won,
          attempts: attemptCount,
          word: wordData.word,
          date: dateStr
        });
      })
      .catch((err) => console.error("Failed to copy:", err));
  };
  const changeDate = (increment) => {
    if (!currentDate) return;

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);

    const newWordData = getWordForDate(newDate);
    if (newWordData && newWordData.date) {
      const ptDate = new Date(newWordData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
    }
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
      {/* Game Header */}
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
          src={iconPath}
          alt={`${title} Logo`}
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
            {title}
          </Typography>
          {typeof subtitle === "string" ? (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )}
        </Box>
      </Box>

      {/* Game Controls */}
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
            tabIndex={-1}
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ mx: 2, color: "black" }}>
            {currentDate.toLocaleDateString("en-US")}
          </Typography>
          <IconButton
            onClick={() => changeDate(1)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            tabIndex={-1}
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
            tabIndex={-1}
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

      {/* Hint Display */}
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

      {/* Game Grid */}
      {renderGrid()}

      {/* Keyboard */}
      <Box sx={{ mt: 2, mb: 4 }}>{renderKeyboard()}</Box>

      {/* Game Over State */}
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

      {/* Toast Notification */}
      <Snackbar
        open={showShareToast}
        autoHideDuration={3000}
        onClose={() => setShowShareToast(false)}
        message="Results copied to clipboard!"
      />
    </Box>
  );
};

export default BaseWordyGame;
