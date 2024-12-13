import React, { useEffect, useMemo, useCallback } from "react";
import { Box } from "@mui/material";

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
  const handleKeyPress = useCallback(
    (e) => {
      if (!answerText || gameOver) return;

      if (e.key === "Enter") {
        e.preventDefault();
        onGuessUpdate("ENTER");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        onGuessUpdate("BACKSPACE");
      } else if (/^[A-Za-z]$/.test(e.key)) {
        e.preventDefault();
        onGuessUpdate(e.key.toUpperCase());
      }
    },
    [gameOver, answerText, onGuessUpdate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const getKeyColor = useCallback(
    (key) => {
      if (!answerText || key === "⌫" || key === "ENTER")
        return ["#FFFFFF", "#000000"];

      const keyUpper = key.toUpperCase();
      const isInAnswer = answerText.toUpperCase().includes(keyUpper);
      const isGuessed = guessedLetters.has(keyUpper);

      if (!isGuessed) return ["#FFFFFF", "#000000"];
      if (isInAnswer) return ["#b8c26c", "#000000"]; // Correct guess
      return ["#010101", "#FFFFFF"]; // Wrong guess
    },
    [answerText, guessedLetters]
  );

  const keyColors = useMemo(
    () =>
      KEYBOARD_KEYS.flat().reduce(
        (acc, key) => ({
          ...acc,
          [key]: getKeyColor(key),
        }),
        {}
      ),
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
                minWidth: key === "ENTER" || key === "⌫" ? "55px" : "36px",
                height: "58px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                fontSize:
                  key === "ENTER" || key === "⌫" ? "0.875rem" : "1.25em",
                fontWeight: "bold",
                cursor: gameOver ? "not-allowed" : "pointer",
                userSelect: "none",
                textTransform: "uppercase",
                transition: "transform 0.1s, background-color 0.2s",
                border: "1px solid #00000030",
                "&:focus": {
                  outline: "2px solid #000",
                  outlineOffset: "2px",
                },
                "&:hover": {
                  transform: gameOver ? "none" : "scale(1.1)",
                  backgroundColor: keyColors[key][0],
                  opacity: 0.9,
                },
                "&:active": {
                  transform: "scale(0.95)",
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
