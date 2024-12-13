import React, { useEffect, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';

const KEYBOARD_KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const Keyboard = ({
  onGuessUpdate,
  answerText = "",
  gameOver = false,
  guessedLetters = new Set(),
}) => {
  const handleKeyPress = useCallback((e) => {
    if (!answerText || gameOver) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      onGuessUpdate("BACKSPACE");
    } else if (/^[A-Za-z]$/.test(e.key)) {
      e.preventDefault();
      onGuessUpdate(e.key.toUpperCase());
    }
  }, [gameOver, answerText, onGuessUpdate]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const getKeyColor = useCallback((key) => {
    if (!answerText || key === "⌫") return ["#FFFFFF", "#000000"];

    const keyUpper = key.toUpperCase();
    const isInAnswer = answerText.toUpperCase().includes(keyUpper);
    const isGuessed = guessedLetters.has(keyUpper);

    if (!isGuessed) return ["#FFFFFF", "#000000"];
    if (isInAnswer) return ["#b8c26c", "#000000"];
    return ["#010101", "#FFFFFF"];
  }, [answerText, guessedLetters]);

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
      aria-label="Quick Quack Keyboard"
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
              onClick={() => !gameOver && onGuessUpdate(key)}
              sx={{
                backgroundColor: keyColors[key][0],
                color: keyColors[key][1],
                minWidth: key === "⌫" ? "55px" : "36px",
                height: "58px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontSize: key === "⌫" ? "12px" : "1.25em",
                fontWeight: "bold",
                cursor: gameOver ? "not-allowed" : "pointer",
                userSelect: "none",
                textTransform: "uppercase",
                transition: "all 0.1s",
                "&:hover": {
                  transform: gameOver ? "none" : "scale(1.1)",
                  backgroundColor: keyColors[key][0],
                },
                "&:active": {
                  transform: "scale(0.95)",
                }
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