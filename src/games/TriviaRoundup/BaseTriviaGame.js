import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { logEvent } from "../../analytics";

const GAME_STATES = {
  WELCOME: "welcome",
  RULES: "rules",
  PLAYING: "playing",
  COMPLETED: "completed",
};

const INITIAL_TIME = 120; // 2 minutes in seconds

const BaseTrivaGame = ({ title, questions, topic, shareText, shareUrl }) => {
  const theme = useTheme();
  const [gameState, setGameState] = useState(GAME_STATES.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [answers, setAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Load saved game state
  useEffect(() => {
    const savedState = localStorage.getItem(`trivia_${topic}_state`);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setGameState(parsed.gameState);
      setCurrentQuestionIndex(parsed.currentQuestionIndex);
      setScore(parsed.score);
      setTimeLeft(parsed.timeLeft);
      setAnswers(parsed.answers);
    }
  }, [topic]);

  // Save game state
  useEffect(() => {
    if (gameState !== GAME_STATES.WELCOME) {
      localStorage.setItem(
        `trivia_${topic}_state`,
        JSON.stringify({
          gameState,
          currentQuestionIndex,
          score,
          timeLeft,
          answers,
          date: new Date().toISOString(),
        })
      );
    }
  }, [gameState, currentQuestionIndex, score, timeLeft, answers, topic]);

  // Timer
  useEffect(() => {
    let timer;
    if (gameState === GAME_STATES.PLAYING && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleTimeUp = () => {
    // Mark remaining questions as skipped
    const remainingAnswers = Array(questions.length - answers.length).fill(
      "skip"
    );
    setAnswers((prev) => [...prev, ...remainingAnswers]);
    setGameState(GAME_STATES.COMPLETED);
  };

  const handleStartGame = () => {
    logEvent("Trivia", "GameStarted", topic);
    setGameState(GAME_STATES.PLAYING);
  };

  const handleAnswer = (answer) => {
    if (hasSubmitted) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || hasSubmitted) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setAnswers((prev) => [...prev, isCorrect ? "correct" : "incorrect"]);
    setScore((prev) => prev + (isCorrect ? 1 : -1));
    setHasSubmitted(true);

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setHasSubmitted(false);
      } else {
        setGameState(GAME_STATES.COMPLETED);
      }
    }, 1000);
  };

  const handleSkip = () => {
    if (hasSubmitted) return;
    setAnswers((prev) => [...prev, "skip"]);
    setHasSubmitted(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setHasSubmitted(false);
      } else {
        setGameState(GAME_STATES.COMPLETED);
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getShareText = () => {
    const date = new Date().toLocaleDateString("en-US");
    const emoji = answers
      .map((answer) => {
        switch (answer) {
          case "correct":
            return "🟩";
          case "incorrect":
            return "🟥";
          case "skip":
            return "⬜";
          default:
            return "⬜";
        }
      })
      .join("");

    return `${shareText} ${date}\nScore: ${score}/10\n\n${emoji}\n\nPlay at: ${shareUrl}`;
  };

  const handleShare = async () => {
    const text = getShareText();
    try {
      await navigator.clipboard.writeText(text);
      // TODO: Show toast notification for successful copy
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderWelcomeScreen = () => (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        How well do you know {title}?
      </Typography>
      <Button
        variant="contained"
        onClick={() => setGameState(GAME_STATES.RULES)}
        sx={{ mt: 4 }}
      >
        PLAY NOW!
      </Button>
    </Box>
  );

  const renderRulesScreen = () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Howdy!
      </Typography>
      <Typography gutterBottom>
        Glad you're here partner. Here's how it works:
      </Typography>
      <Box sx={{ my: 3 }}>
        <Typography>Correct answer: +1</Typography>
        <Typography>Incorrect answer: -1</Typography>
        <Typography>Skip a question: +0</Typography>
      </Box>
      <Typography gutterBottom>
        You have 2 minutes to answer 10 questions.
      </Typography>
      <Button variant="contained" onClick={handleStartGame} sx={{ mt: 4 }}>
        Ready?
      </Button>
    </Box>
  );

  const renderProgressBar = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            color:
              timeLeft <= 10
                ? "error.main"
                : timeLeft <= 30
                ? "warning.main"
                : "text.primary",
          }}
        >
          {formatTime(timeLeft)}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Score: {score}</Typography>
      </Box>
    </Box>
  );

  const renderQuestionScreen = () => {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <Box sx={{ p: 2 }}>
        {renderProgressBar()}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Question {currentQuestionIndex + 1}/10
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {answers.map((answer, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor:
                    answer === "correct"
                      ? "success.main"
                      : answer === "incorrect"
                      ? "error.main"
                      : "grey.300",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                {answer === "correct"
                  ? "✓"
                  : answer === "incorrect"
                  ? "✗"
                  : "•"}
              </Box>
            ))}
            {[...Array(10 - answers.length)].map((_, idx) => (
              <Box
                key={`empty-${idx}`}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "grey.300",
                }}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          {currentQuestion.question}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              variant="outlined"
              onClick={() => handleAnswer(option)}
              sx={{
                p: 2,
                color: "black",
                justifyContent: "flex-start",
                bgcolor:
                  selectedAnswer === option
                    ? hasSubmitted
                      ? option === currentQuestion.correctAnswer
                        ? "success.light"
                        : "error.light"
                      : "action.selected"
                    : "background.paper",
                "&:hover": {
                  bgcolor:
                    selectedAnswer === option
                      ? hasSubmitted
                        ? option === currentQuestion.correctAnswer
                          ? "success.light"
                          : "error.light"
                        : "action.selected"
                      : "action.hover",
                },
              }}
              disabled={hasSubmitted}
            >
              {option}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          {selectedAnswer && !hasSubmitted && (
            <Button variant="contained" onClick={handleSubmitAnswer} fullWidth>
              Submit
            </Button>
          )}
          {!hasSubmitted && (
            <Button variant="outlined" onClick={handleSkip} fullWidth>
              Skip
            </Button>
          )}
        </Box>
      </Box>
    );
  };

  const renderCompletedScreen = () => (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Time's up!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Final Score: {score}/10
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, my: 3 }}>
        {answers.map((answer, idx) => (
          <Box
            key={idx}
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor:
                answer === "correct"
                  ? "success.main"
                  : answer === "incorrect"
                  ? "error.main"
                  : "grey.300",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "black",
              fontSize: "12px",
            }}
          >
            {answer === "correct" ? "✓" : answer === "incorrect" ? "✗" : "•"}
          </Box>
        ))}
      </Box>
      <Button variant="contained" onClick={handleShare} sx={{ mt: 2 }}>
        Share Result
      </Button>
      <Typography sx={{ mt: 4 }}>Come back tomorrow for a new quiz!</Typography>
    </Box>
  );

  const renderCurrentScreen = () => {
    switch (gameState) {
      case GAME_STATES.WELCOME:
        return renderWelcomeScreen();
      case GAME_STATES.RULES:
        return renderRulesScreen();
      case GAME_STATES.PLAYING:
        return renderQuestionScreen();
      case GAME_STATES.COMPLETED:
        return renderCompletedScreen();
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "sm",
        mx: "auto",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {renderCurrentScreen()}
    </Box>
  );
};

export default BaseTrivaGame;
