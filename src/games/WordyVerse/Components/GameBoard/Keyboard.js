import React, { useEffect } from 'react';
import { Box } from '@mui/material';

const KEYBOARD_KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const Keyboard = ({
  onGuessUpdate,
  currentGuess,
  wordData,
  gameOver,
  isGuessFocused,
  isLocked,
  guesses
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!wordData || gameOver || !isGuessFocused || isLocked) return;

      if (e.key === "Enter" && currentGuess.length === wordData.word.length) {
        onGuessUpdate('ENTER');
      } else if (e.key === "Backspace") {
        onGuessUpdate('BACKSPACE');
      } else if (
        /^[A-Za-z]$/.test(e.key) &&
        currentGuess.length < wordData.word.length
      ) {
        onGuessUpdate(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, gameOver, wordData, isGuessFocused, isLocked, onGuessUpdate]);

  const handleKeyClick = (key) => {
    if (gameOver || isLocked) return;

    if (key === "ENTER") {
      onGuessUpdate('ENTER');
    } else if (key === "⌫") {
      onGuessUpdate('BACKSPACE');
    } else {
      onGuessUpdate(key);
    }
  };

  const getKeyboardKeyColor = (key) => {
    if (!wordData || !guesses) return "#d3d6da";

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

  return (
    <Box sx={{ mt: 2, mb: 4 }}>
      {KEYBOARD_KEYS.map((row, i) => (
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
                cursor: isLocked ? "not-allowed" : "pointer",
                userSelect: "none",
                textTransform: "uppercase",
                transition: "transform 0.1s",
                "&:hover": {
                  transform: isLocked ? "none" : "scale(1.1)",
                },
                opacity: isLocked ? 0.7 : 1,
              }}
            >
              {key}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Keyboard;