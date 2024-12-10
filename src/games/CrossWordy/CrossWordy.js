import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const SAMPLE_PUZZLE = {
  across: {
    1: {
      clue: "These NFL birds play at Lumen Field",
      answer: "HAWKS",
      row: 0,
      col: 0,
    },
    3: {
      clue: "This local newspaper since 1891",
      answer: "TIMES",
      row: 2,
      col: 0,
    },
    5: { clue: "UW's athletic mascot", answer: "HUSKY", row: 4, col: 0 },
  },
  down: {
    2: {
      clue: "This volcanic peak creates its own weather",
      answer: "BAKER",
      row: 0,
      col: 3,
    },
    4: {
      clue: "This fish dish is a Pike Place favorite",
      answer: "TROUT",
      row: 0,
      col: 1,
    },
  },
};

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

export default function SeattleCrosswordle() {
  const [selectedClue, setSelectedClue] = useState(null);
  const [guesses, setGuesses] = useState({});
  const [currentGuess, setCurrentGuess] = useState("");
  const [grid, setGrid] = useState(
    Array(5)
      .fill()
      .map(() => Array(5).fill({ letter: "", status: "empty" }))
  );
  const [usedLetters, setUsedLetters] = useState({}); // Track letter statuses for keyboard

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleInput(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedClue, currentGuess]);

  const handleInput = (key) => {
    if (!selectedClue) return;

    if (key === "Backspace" || key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (
      (key === "Enter" || key === "ENTER") &&
      currentGuess.length === selectedClue.answer.length
    ) {
      submitGuess();
    } else if (
      /^[A-Za-z]$/.test(key) &&
      currentGuess.length < selectedClue.answer.length
    ) {
      setCurrentGuess((prev) => (prev + key).toUpperCase());
    }
  };

  const submitGuess = () => {
    if (!selectedClue) return;

    const answer = selectedClue.answer;
    const newGuess = currentGuess.toUpperCase();

    // Update guesses state
    setGuesses((prev) => ({
      ...prev,
      [selectedClue.direction + selectedClue.number]: [
        ...(prev[selectedClue.direction + selectedClue.number] || []),
        newGuess,
      ],
    }));

    // Update grid with colors
    const newGrid = [...grid];
    const { row, col } = selectedClue;
    const isAcross = selectedClue.direction === "across";
    const newUsedLetters = { ...usedLetters };

    newGuess.split("").forEach((letter, i) => {
      const currentRow = isAcross ? row : row + i;
      const currentCol = isAcross ? col + i : col;

      let status = "wrong";
      if (letter === answer[i]) {
        status = "correct";
      } else if (answer.includes(letter)) {
        status = "misplaced";
      }

      newGrid[currentRow][currentCol] = { letter, status };

      // Update keyboard letter status
      if (!newUsedLetters[letter] || status === "correct") {
        newUsedLetters[letter] = status;
      }
    });

    setGrid(newGrid);
    setUsedLetters(newUsedLetters);
    setCurrentGuess("");
  };

  const getCellStyle = (status) => {
    switch (status) {
      case "correct":
        return { backgroundColor: "#b8c26c", color: "black" };
      case "misplaced":
        return { backgroundColor: "#ecb061", color: "white" };
      case "wrong":
        return { backgroundColor: "gray", color: "white" };
      default:
        return { backgroundColor: "white", color: "black" };
    }
  };

  const getKeyboardKeyStyle = (key) => {
    if (key === "ENTER" || key === "⌫") {
      return { backgroundColor: "#d3d6da", minWidth: "65px" };
    }

    const status = usedLetters[key];
    switch (status) {
      case "correct":
        return { backgroundColor: "#b8c26c", color: "black" };
      case "misplaced":
        return { backgroundColor: "#ecb061", color: "white" };
      case "wrong":
        return { backgroundColor: "gray", color: "white" };
      default:
        return { backgroundColor: "#d3d6da", color: "black" };
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Seattle Crosswordle
      </Typography>

      <Grid container spacing={3}>
        {/* Game Grid */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "inline-grid",
                gridTemplateColumns: "repeat(5, 60px)",
                gap: 1,
              }}
            >
              {grid.map((row, i) =>
                row.map((cell, j) => (
                  <Paper
                    key={`${i}-${j}`}
                    elevation={2}
                    sx={{
                      width: 60,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      ...getCellStyle(cell.status),
                    }}
                  >
                    {cell.letter}
                  </Paper>
                ))
              )}
            </Box>
          </Box>

          {/* Show current guess */}
          {selectedClue && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography>
                Current guess:{" "}
                {currentGuess.padEnd(selectedClue.answer.length, "_")}
              </Typography>
            </Box>
          )}

          {/* Keyboard */}
          <Box sx={{ mt: 3 }}>
            {KEYBOARD_ROWS.map((row, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                {row.map((key) => (
                  <Box
                    key={key}
                    onClick={() => handleInput(key)}
                    sx={{
                      ...getKeyboardKeyStyle(key),
                      height: "58px",
                      minWidth: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      fontSize: key.length > 1 ? "12px" : "1.25em",
                      fontWeight: "bold",
                      cursor: "pointer",
                      userSelect: "none",
                      "&:hover": {
                        filter: "brightness(0.9)",
                      },
                    }}
                  >
                    {key}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Clues */}
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Across
            </Typography>
            {Object.entries(SAMPLE_PUZZLE.across).map(([number, clue]) => (
              <Box
                key={number}
                onClick={() =>
                  setSelectedClue({ ...clue, direction: "across", number })
                }
                sx={{
                  p: 1,
                  cursor: "pointer",
                  bgcolor:
                    selectedClue?.number === number &&
                    selectedClue?.direction === "across"
                      ? "action.selected"
                      : "transparent",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography>
                  {number}. {clue.clue}
                </Typography>
              </Box>
            ))}

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Down
            </Typography>
            {Object.entries(SAMPLE_PUZZLE.down).map(([number, clue]) => (
              <Box
                key={number}
                onClick={() =>
                  setSelectedClue({ ...clue, direction: "down", number })
                }
                sx={{
                  p: 1,
                  cursor: "pointer",
                  bgcolor:
                    selectedClue?.number === number &&
                    selectedClue?.direction === "down"
                      ? "action.selected"
                      : "transparent",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Typography>
                  {number}. {clue.clue}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
