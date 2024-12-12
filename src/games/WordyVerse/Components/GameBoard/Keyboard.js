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
  guesses
}) => {
  // Keyboard event handler
  const handleKeyPress = (e) => {
    if (!wordData || gameOver) return;

    const length = wordData.word ? wordData.word.length : wordData.phrase.length;

    if (e.key === "Enter" && currentGuess.length === length) {
      e.preventDefault(); // Prevent form submission
      onGuessUpdate("ENTER");
    } else if (e.key === "Backspace") {
      e.preventDefault();
      onGuessUpdate("BACKSPACE");
    } else if (
      /^[A-Za-z]$/.test(e.key) &&
      currentGuess.length < length
    ) {
      e.preventDefault();
      onGuessUpdate(e.key.toUpperCase());
    }
  };

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, gameOver, wordData, onGuessUpdate]);

  // On-screen keyboard handler
  const handleKeyClick = (key) => {
    if (gameOver) return;
    const length = wordData.word ? wordData.word.length : wordData.phrase.length;

    if (key === "ENTER" && currentGuess.length === length) {
      onGuessUpdate("ENTER");
    } else if (key === "⌫") {
      onGuessUpdate("BACKSPACE");
    } else if (currentGuess.length < length) {
      onGuessUpdate(key);
    }
  };

  const getKeyboardKeyColor = (key) => {
    console.log("This is the word data: ");
    console.log(wordData);
    if (!wordData || !guesses) return ["white", "black"];

    const keyUpperCase = key.toUpperCase();
    const wordUpperCase = wordData.word ? wordData.word.toUpperCase() : wordData.phrase.toUpperCase();
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

    if (correctPosition) return ["#b8c26c", "black"];
    if (letterInWord && keyFound) return ["#ecb061", "white"];
    return guesses.some((guess) => guess.toUpperCase().includes(keyUpperCase))
      ? ["black", "white"]
      : ["white", "black"];
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
                backgroundColor: getKeyboardKeyColor(key)[0],
                color: getKeyboardKeyColor(key)[1],
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
      ))}
    </Box>
  );
};

export default Keyboard;