import React from "react";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import { X as CloseIcon, Send as SendIcon } from "lucide-react";
import SignupButton from "../games/WordyVerse/SignupButton";

const ModalContent = ({ children, success }) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "400px",
      bgcolor: success ? "#b8c26c" : "white",
      borderRadius: "8px",
      p: 4,
      outline: "none",
      textAlign: "center",
      position: "relative",
    }}
  >
    {children}
  </Box>
);

export const ShareModal = ({
  open,
  onClose,
  onShare,
  guesses = [],
  word,
  maxGuesses = 5,
  isCorrect = false,
  onCreateAccount,
}) => {
  const isGameOver = guesses.length === maxGuesses || isCorrect;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent success={isCorrect}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Show "Share before solving?" for non-game-over state */}
        {!isGameOver && (
          <>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: "bold", color: "black" }}
            >
              Share before solving?
            </Typography>
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/assets/game-logos/wordy-verse-confused.svg`}
              alt="duck mascot"
              sx={{
                width: "80px",
                height: "80px",
                mb: 2,
                mx: "auto",
                display: "block",
              }}
            />
          </>
        )}

        {/* Game Over states */}
        {isGameOver && (
          <>
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: "bold", color: "black" }}
            >
              {isCorrect ? "YOU SOLVED IT!" : "Better luck next time!"}
            </Typography>

            {/* Score preview grid */}
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 0.75,
                  p: 2,
                }}
              >
                {guesses.map((guess, rowIndex) => (
                  <Box
                    key={rowIndex}
                    sx={{
                      display: "flex",
                      gap: 0.75,
                    }}
                  >
                    {Array.from(guess).map((letter, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 16,
                          height: 16,
                          bgcolor: (() => {
                            if (
                              letter.toUpperCase() ===
                              word[i].toUpperCase()
                            )
                              return "#b8c26c";
                            if (
                              word
                                .toUpperCase()
                                .includes(letter.toUpperCase())
                            )
                              return "#ecb061";
                            return "#d3d6da";
                          })(),
                          borderRadius: 0.5,
                        }}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}

        {/* Action Buttons */}
        <Button
          fullWidth
          startIcon={<SendIcon />}
          variant="contained"
          onClick={onShare}
          sx={{
            mb: 2,
            bgcolor: "black",
            borderRadius: "20px",
            color: "white",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          {!isGameOver ? "Share this puzzle" : "Share my score"}
        </Button>

        {/* <Button
          width="80%"
          variant="contained"
          onClick={onCreateAccount}
          sx={{
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "#333",
            },
          }}
        >
          Create my free account!
        </Button> */}

        <SignupButton />

        {/* Celebration Duck - only show for successful game over */}
        {isGameOver && isCorrect && (
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/assets/game-logos/wordy-verse-party.svg`}
            alt="celebrating duck mascot"
            sx={{
              position: "absolute",
              bottom: -3,
              right: 0,
              width: "30px",
              height: "auto",
            }}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

// In ShareModal component:
const GuessGrid = ({ guesses, word }) => {
  const getLetterBGColor = (letter, letterIndex, guess) => {
    if (!letter) return "#e5e5e5"; // Empty square color

    const guessUpperCase = letter.toUpperCase();
    const targetWord = word.toUpperCase();

    // Exact match
    if (guessUpperCase === targetWord[letterIndex]) {
      return "#b8c26c"; // Green
    }

    // Letter exists but wrong position
    if (targetWord.includes(guessUpperCase)) {
      // Count occurrences in target word
      const targetCount = targetWord.split(guessUpperCase).length - 1;
      // Count exact matches
      let exactMatches = 0;
      // Count previous yellows
      let yellowsSoFar = 0;

      for (let i = 0; i < guess.length; i++) {
        if (guess[i].toUpperCase() === guessUpperCase) {
          if (i === letterIndex) break; // Stop at current letter
          if (guess[i].toUpperCase() === targetWord[i]) {
            exactMatches++;
          } else {
            yellowsSoFar++;
          }
        }
      }

      if (yellowsSoFar + exactMatches < targetCount) {
        return "#ecb061"; // Yellow
      }
    }

    return "#d3d6da"; // Grey - wrong letter
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        p: 2,
      }}
    >
      {Array(5)
        .fill(null)
        .map((_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: "flex",
              gap: 0.5,
              justifyContent: "center",
            }}
          >
            {Array(word.length)
              .fill(null)
              .map((_, colIndex) => {
                const letter = guesses[rowIndex]?.[colIndex] || "";
                return (
                  <Box
                    key={colIndex}
                    sx={{
                      width: "20px",
                      height: "20px",
                      bgcolor: guesses[rowIndex]
                        ? getLetterBGColor(letter, colIndex, guesses[rowIndex])
                        : "#e5e5e5",
                      borderRadius: "2px",
                    }}
                  />
                );
              })}
          </Box>
        ))}
    </Box>
  );
};

export const ShareButton = ({ onClick }) => (
  <Button
    onClick={onClick}
    startIcon={<SendIcon />}
    sx={{
      mt: 2,
      color: "#000",
      textDecoration: "underline",
      "&:hover": {
        bgcolor: "transparent",
      },
    }}
  >
    Send to a friend
  </Button>
);
