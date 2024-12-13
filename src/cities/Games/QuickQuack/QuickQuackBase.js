import React, { useState, useEffect } from "react";
import { Box, Typography, Snackbar, Button, TextField } from "@mui/material";
import { useStytchUser } from "@stytch/react";
import { useNavigate } from "react-router-dom";
import {
  logGameStarted,
  logGameEnded,
  logGameShared,
} from "../../../analytics";
import GameHeader from "../../../games/WordyVerse/Components/GameBoard/GameHeader";
import GameControls from "../../../games/WordyVerse/Components/GameBoard/GameControls";
import Keyboard from "./Keyboard";
import { ShareButton, ShareModal } from "./ShareModal";
import {
  getStreakFromStorage,
  updateStreak,
} from "../../../components/StreakUtil";
import GoogleAd from "../../../games/WordyVerse/Components/GoogleAd";

const REVEAL_INTERVAL = 2500;
const GAME_DURATION = 45000;
const WRONG_GUESS_PENALTY = 150;
const MIN_SCORE_TO_WIN = 500;
const MAX_WRONG_GUESSES = 5;
const COMBO_THRESHOLD = 3;
const MAX_MULTIPLIER = 4;

const QuickQuackBase = ({
  title,
  iconPath,
  subtitle,
  shareText,
  shareUrl,
  getPhraseForDate,
  findLatestAvailableDate,
}) => {
  const { user } = useStytchUser();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(null);
  const [phraseData, setPhraseData] = useState(null);
  const [revealedLetters, setRevealedLetters] = useState(new Set());
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [combo, setCombo] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(getStreakFromStorage().count);

  // Game initialization effect
  useEffect(() => {
    const latestPhraseData = findLatestAvailableDate();
    if (latestPhraseData) {
      const ptDate = new Date(latestPhraseData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
      setPhraseData(latestPhraseData);
    }
  }, []);

  // Date change effect
  useEffect(() => {
    if (!currentDate) return;
    const data = getPhraseForDate(currentDate);
    if (!data) {
      const latestPhraseData = findLatestAvailableDate();
      if (latestPhraseData) {
        setCurrentDate(new Date(latestPhraseData.date));
        setPhraseData(latestPhraseData);
      }
      return;
    }
    resetGame(data);
  }, [currentDate]);

  // Game timer effect
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          endGame(false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Auto-reveal effect
  useEffect(() => {
    if (!gameStarted || gameOver || !phraseData) return;
    const revealTimer = setInterval(() => {
      const unrevealedLetters = [...phraseData.phrase.toUpperCase()].filter(
        (char) => /[A-Z]/.test(char) && !revealedLetters.has(char)
      );
      if (unrevealedLetters.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * unrevealedLetters.length
        );
        const newLetter = unrevealedLetters[randomIndex];
        setRevealedLetters((prev) => new Set([...prev, newLetter]));
        setGuessedLetters((prev) => new Set([...prev, newLetter]))
        checkWinCondition();
      }
    }, REVEAL_INTERVAL);
    return () => clearInterval(revealTimer);
  }, [gameStarted, gameOver, phraseData, revealedLetters]);

  const calculateBasePoints = (letter) => {
    const letterFrequency = {
      E: 1,
 A: 1,
R: 1,
     I: 1,
    O: 1,
    T: 1,
   N: 1,
  S: 1,
 L: 1,
      U: 2,
D: 2,
     G: 2,
    B: 2,
    C: 2,
   M: 2,
   P: 2,
      F: 3,
  H: 3,
  V: 3,
 W: 3,
     Y: 3,
      K: 4,
     J: 4,
    X: 4,
   Q: 5,
  Z: 5,
    };
    return (letterFrequency[letter] || 1) * 50;
  };

  const resetGame = (data) => {
    setPhraseData(data);
    setRevealedLetters(new Set());
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setTimeRemaining(GAME_DURATION);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setMultiplier(1);
    setCombo(0);
  };

  const startGame = () => {
    setGameStarted(true);
    const dateStr = currentDate.toLocaleDateString("en-US");
    logGameStarted(title, {
      phrase: phraseData.phrase,
      date: dateStr,
    });
  };

  const endGame = (won) => {
    setGameOver(true);
    const dateStr = currentDate.toLocaleDateString("en-US");
    const finalScore = score >= MIN_SCORE_TO_WIN && won ? score : 0;
    setScore(finalScore);
    const newStreak = updateStreak(currentDate);
    setStreak(newStreak);

    // Show share modal immediately
    setShareModalOpen(true);

    logGameEnded(title, {
      won,
      score: finalScore,
      phrase: phraseData.phrase,
      date: dateStr,
    });
  };

  const handleGuess = (letter) => {
    if (!gameStarted) {
      startGame();
    }

    if (gameOver || letter === "ENTER") return;

    if (letter === "BACKSPACE") return;

    if (!guessedLetters.has(letter) && !revealedLetters.has(letter)) {
      const isCorrect = phraseData.phrase.toUpperCase().includes(letter);

      setGuessedLetters((prev) => new Set([...prev, letter]));
      if (isCorrect) {
        const basePoints = calculateBasePoints(letter);
        const points = basePoints * multiplier;
        setScore((prev) => prev + points);

        setCombo((prev) => {
          const newCombo = prev + 1;
          if (newCombo >= COMBO_THRESHOLD) {
            setMultiplier((prev) => Math.min(prev + 0.5, MAX_MULTIPLIER));
            return 0;
          }
          return newCombo;
        });
      } else {
        setWrongGuesses((prev) => {
          const newWrongGuesses = prev + 1;
          if (newWrongGuesses >= MAX_WRONG_GUESSES) {
            endGame(false);
          }
          return newWrongGuesses;
        });
        setScore((prev) => Math.max(0, prev - WRONG_GUESS_PENALTY));
        setCombo(0);
        setMultiplier(1);
      }
    }

    checkWinCondition();
  };

  const checkWinCondition = () => {
    const remainingLetters = [...phraseData.phrase.toUpperCase()]
      .filter((char) => /[A-Z]/.test(char))
      .filter(
        (char) => !revealedLetters.has(char) && !guessedLetters.has(char)
      );

    if (remainingLetters.length === 0 && !gameOver) { // Add gameOver check
      const timeBonus = Math.floor((timeRemaining / GAME_DURATION) * 1000);
      setScore((prev) => prev + timeBonus);
      endGame(true);
    }
  };

  const handleShare = () => {
    const dateStr = currentDate.toLocaleDateString("en-US");
    const shareString = `${shareText} ${dateStr}\nScore: ${score}\nTime: ${Math.ceil(
      (GAME_DURATION - timeRemaining) / 1000
    )}s\nCombo: ${combo}x\n\nPlay at: ${shareUrl}`;

    navigator.clipboard
      .writeText(shareString)
      .then(() => {
        setShowShareToast(true);
        logGameShared(title, {
          won: score >= MIN_SCORE_TO_WIN,
          score,
          phrase: phraseData.phrase,
          date: dateStr,
          timeRemaining,
        });
      })
      .catch((err) => console.error("Failed to copy:", err));

    setShareModalOpen(false);
  };

  const renderPhrase = () => {
    if (!phraseData) return null;

    const words = phraseData.phrase.split(/(\s+)/).filter(Boolean);

    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          width: "100%",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        {words.map((word, wordIndex) => (
          <Box
            key={wordIndex}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            {[...word].map((char, charIndex) => {
              const upperChar = char.toUpperCase();
              const isLetter = /[A-Z]/.test(upperChar);
              const isRevealed =
                revealedLetters.has(upperChar) || guessedLetters.has(upperChar);

              return (
                isLetter && (
                  <Box
                    key={`${wordIndex}-${charIndex}`}
                    sx={{
                      width: isLetter ? "48px" : "24px",
                      height: "48px",
                      border: isLetter ? "2px solid black" : "none",
                      margin: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isLetter ? "white" : "transparent",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      boxShadow: isLetter
                    ? "2px 2px 4px rgba(0,0,0,0.1)"
                 : "none",
                    }}
                  >
                    {isLetter ? (isRevealed ? upperChar : "") : char}
                  </Box>
                )
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };

  if (!phraseData) return null;

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(244, 238, 224)",
      }}
    >
      <Box>
        <GameHeader title={title} subtitle={subtitle} iconPath={iconPath} />

        <GameControls
          currentDate={currentDate}
          onDateChange={(increment) => {
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + increment);
            setCurrentDate(newDate);
          }}
          showHint={showHint}
          onHintToggle={() => setShowHint(!showHint)}
          wordData={{ theme: phraseData.category }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body" sx={{ mb: 1, fontFamily: "monospace" }}>
            Time: {Math.ceil(timeRemaining / 1000)}s | Score: {score} | Combo:{" "}
            {combo}x
          </Typography>
          <br/>
          <Typography variant="body" sx={{ fontFamily: "monospace" }}>
            Multiplier: {multiplier.toFixed(1)}x <br/> Wrong Guesses: {wrongGuesses}
            /{MAX_WRONG_GUESSES}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          {showHint && (
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Category: {phraseData.category}
            </Typography>
          )}

          {renderPhrase()}
        </Box>

        <Keyboard
          onGuessUpdate={handleGuess}
          answerText={phraseData.phrase}
          gameOver={gameOver}
          guessedLetters={guessedLetters}
        />

        <ShareButton onClick={() => setShareModalOpen(true)} />

        <ShareModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          onShare={handleShare}
          score={score}
          timeRemaining={timeRemaining}
          gameOver={gameOver}
          isCorrect={score >= MIN_SCORE_TO_WIN}
          onCreateAccount={() => navigate("/quick-quack/auth")}
        />

        <Snackbar
          open={showShareToast}
          autoHideDuration={3000}
          onClose={() => setShowShareToast(false)}
          message="Results copied to clipboard!"
        />
      </Box>
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Flying Comet Games. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default QuickQuackBase;
