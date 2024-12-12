import React, { useEffect, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';

const KEYBOARD_KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const Keyboard = ({
  onGuessUpdate,
  currentGuess = "",
  answerText = "",
  gameOver = false,
  guesses = []
}) => {
  const targetWord = useMemo(() => answerText.toUpperCase(), [answerText]);
  const targetLength = useMemo(() => answerText.length, [answerText]);

  const handleKeyPress = useCallback((e) => {
    if (!answerText || gameOver) return;

    if (e.key === "Enter" && currentGuess.length === targetLength) {
      e.preventDefault();
      onGuessUpdate("ENTER");
    } else if (e.key === "Backspace") {
      e.preventDefault();
      onGuessUpdate("BACKSPACE");
    } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < targetLength) {
      e.preventDefault();
      onGuessUpdate(e.key.toUpperCase());
    }
  }, [currentGuess, gameOver, answerText, targetLength, onGuessUpdate]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const getKeyColor = useCallback((key) => {
    if (!answerText || !guesses.length) return ["white", "black"];

    const keyUpper = key.toUpperCase();
    const isCorrectPosition = guesses.some(guess =>
      guess.toUpperCase().split("").some((letter, i) =>
        letter === keyUpper && letter === targetWord[i]
      )
    );

    if (isCorrectPosition) return ["#b8c26c", "black"];
    if (targetWord.includes(keyUpper)) return ["#ecb061", "white"];
    return guesses.some(guess => guess.toUpperCase().includes(keyUpper))
      ? ["black", "white"]
      : ["white", "black"];
  }, [answerText, guesses, targetWord]);

  const keyColors = useMemo(() =>
    KEYBOARD_KEYS.flat().reduce((acc, key) => ({
      ...acc,
      [key]: getKeyColor(key)
    }), {}),
    [getKeyColor]
  );

  return (
    <Box
      component="section"
      role="group"
      aria-label="Virtual Keyboard"
      sx={{ mt: 2, mb: 4 }}
    >
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
              role="button"
              tabIndex={0}
              aria-label={key}
              onClick={() => !gameOver && onGuessUpdate(key)}
              onKeyPress={(e) => e.key === "Enter" && !gameOver && onGuessUpdate(key)}
              sx={{
                backgroundColor: keyColors[key][0],
                color: keyColors[key][1],
                minWidth: key.length > 1 ? "55px" : "36px",
                height: "58px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontSize: key.length > 1 ? "12px" : "1.25em",
                fontWeight: "bold",
                cursor: gameOver ? "not-allowed" : "pointer",
                userSelect: "none",
                textTransform: "uppercase",
                transition: "transform 0.1s",
                "&:hover": {
                  transform: gameOver ? "none" : "scale(1.1)",
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