import React, { useState, useEffect } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
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
import { ShareButton, ShareModal } from "../../../components/ShareModal";
import {
  getStreakFromStorage,
  updateStreak,
} from "../../../components/StreakUtil";
import GoogleAd from "../../../games/WordyVerse/Components/GoogleAd";

const REVEAL_INTERVAL = 5000; // 5 seconds between auto-reveals
const GAME_DURATION = 60000; // 60 seconds total

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
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showShareToast, setShowShareToast] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [streak, setStreak] = useState(getStreakFromStorage().count);

  // Initialize game
  useEffect(() => {
    const latestPhraseData = findLatestAvailableDate();
    if (latestPhraseData) {
      const ptDate = new Date(latestPhraseData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
      setPhraseData(latestPhraseData);
    }
  }, []);

  // Handle date changes
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

  // Game timer
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

  // Auto-reveal letters
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
        setRevealedLetters(
          (prev) => new Set([...prev, unrevealedLetters[randomIndex]])
        );
      }
    }, REVEAL_INTERVAL);

    return () => clearInterval(revealTimer);
  }, [gameStarted, gameOver, phraseData, revealedLetters]);

  const resetGame = (data) => {
    setPhraseData(data);
    setRevealedLetters(new Set());
    setGuessedLetters(new Set());
    setTimeRemaining(GAME_DURATION);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
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

    if (won) {
      const timeBonus = Math.floor((timeRemaining / GAME_DURATION) * 1000);
      setScore((prev) => prev + timeBonus);
    }

    const newStreak = updateStreak(currentDate);
    setStreak(newStreak);

    logGameEnded(title, {
      won,
      score,
      phrase: phraseData.phrase,
      date: dateStr,
    });
  };

  const handleGuess = (letter) => {
    if (!gameStarted) {
      startGame();
    }

    if (gameOver) return;

    if (letter === "ENTER") {
      // Handle full solve attempt
      return;
    }

    if (letter === "BACKSPACE") {
      return;
    }

    setGuessedLetters((prev) => new Set([...prev, letter]));

    // Check if letter is in phrase
    if (phraseData.phrase.toUpperCase().includes(letter)) {
      setScore((prev) => prev + 100);

      // Check if all letters are revealed
      const remainingLetters = [...phraseData.phrase.toUpperCase()]
        .filter((char) => /[A-Z]/.test(char))
        .filter((char) => !guessedLetters.has(char) && char !== letter);

      if (remainingLetters.length === 0) {
        endGame(true);
      }
    }
  };

  const renderPhrase = () => {
    if (!phraseData) return null;

    // Split phrase into words and spaces
    const words = phraseData.phrase.split(/(\s+)/).filter(Boolean);

    return (
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
        maxWidth: '600px',
        mx: 'auto'
      }}>
        {words.map((word, wordIndex) => (
          <Box
            key={wordIndex}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
            }}
          >
            {[...word].map((char, charIndex) => {
              const upperChar = char.toUpperCase();
              const isLetter = /[A-Z]/.test(upperChar);
              const isRevealed = revealedLetters.has(upperChar) || guessedLetters.has(upperChar);

              return (
                <Box
                  key={`${wordIndex}-${charIndex}`}
                  sx={{
                    width: isLetter ? 40 : 20,
                    height: 40,
                    border: isLetter ? "2px solid black" : "none",
                    margin: '2px',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isLetter ? "white" : "transparent",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {isLetter ? (isRevealed ? upperChar : "") : char}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    );
  };

  const handleShare = () => {
    const dateStr = currentDate.toLocaleDateString("en-US");
    const shareString = `${shareText} ${dateStr}\nScore: ${score}\n\nPlay at: ${shareUrl}`;

    navigator.clipboard
      .writeText(shareString)
      .then(() => {
        setShowShareToast(true);
        logGameShared(title, {
          won: !gameOver || score > 0,
          score,
          phrase: phraseData.phrase,
          date: dateStr,
        });
      })
      .catch((err) => console.error("Failed to copy:", err));

    setShareModalOpen(false);
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
        backgroundColor: "background.default",
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
          showHint={false}
          onHintToggle={() => {}}
          wordData={{ theme: phraseData.category }}
        />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Time: {Math.ceil(timeRemaining / 1000)}s
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              mb: 2,
            }}
          >
            {renderPhrase()}
          </Box>

          <Typography variant="h6">Score: {score}</Typography>
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
          isCorrect={!gameOver || score > 0}
          onCreateAccount={() => navigate("/quick-quack/auth")}
        />

        <Snackbar
          open={showShareToast}
          autoHideDuration={3000}
          onClose={() => setShowShareToast(false)}
          message="Results copied to clipboard!"
        />
      </Box>
    </Box>
  );
};

export default QuickQuackBase;
