import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { logGameStarted, logGameEnded, logGameShared } from "../../analytics";

const GAME_STATES = {
  WELCOME: "welcome",
  RULES: "rules",
  PLAYING: "playing",
  COMPLETED: "completed",
};

const INITIAL_TIME = 60; // 1 minute in seconds
const TIME_PER_QUESTION = 6; // Expected time per question
const MAX_MULTIPLIER = 2.0; // Maximum score multiplier for fast answers

const BaseTrivaGame = ({ title, questions, topic, shareText, shareUrl }) => {
  const theme = useTheme();
  const [gameState, setGameState] = useState(GAME_STATES.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [questionStartTime, setQuestionStartTime] = useState(null);
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

  const calculateScoreMultiplier = (responseTime) => {
    const baseMultiplier = Math.max(0, (TIME_PER_QUESTION - responseTime) / TIME_PER_QUESTION);
    return Math.min(MAX_MULTIPLIER, 1 + baseMultiplier);
  };

  const handleTimeUp = () => {
    if (!questions) return;
    const remainingCount = Math.max(0, questions.length - answers.length);
    if (remainingCount > 0) {
      const remainingAnswers = Array(remainingCount).fill("skip");
      setAnswers((prev) => [...prev, ...remainingAnswers]);
    }
    setGameState(GAME_STATES.COMPLETED);
    logGameEnded("Trivia Roundup", { topic: title, score: score });
  };

  const handleStartGame = () => {
    logGameStarted("Trivia Roundup", { topic: title });
    setGameState(GAME_STATES.PLAYING);
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = (answer) => {
    if (hasSubmitted) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || hasSubmitted) return;

    const responseTime = (Date.now() - questionStartTime) / 1000;
    const multiplier = calculateScoreMultiplier(responseTime);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const points = isCorrect ? Math.round(multiplier * 100) / 100 : -1;

    setAnswers((prev) => [...prev, isCorrect ? "correct" : "incorrect"]);
    setScore((prev) => Math.round((prev + points) * 100) / 100);
    setHasSubmitted(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setHasSubmitted(false);
        setQuestionStartTime(Date.now());
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
        setQuestionStartTime(Date.now());
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
    logGameShared("Trivia Roundup", {
      topic: title,
      score: score,
    });
    try {
      await navigator.clipboard.writeText(text);
      // TODO: Show toast notification for successful copy
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderWelcomeScreen = () => (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/game-logos/trivia-roundup-home.svg`}
        alt="trivia roundup logo"
        sx={{
          width: "100%", // Adjust width as needed
          height: "auto", // Maintain aspect ratio
        }}
      />

      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/assets/game-logos/trivia-roundup-squirrel.svg`}
        alt="trivia roundup squirrel mascot"
        sx={{
          width: "30%", // Adjust width as needed
          height: "auto", // Maintain aspect ratio
        }}
      />

      <Typography variant="h4" component="h1" marginTop={6} gutterBottom>
        How well do you know{" "}
        <Box component="span" sx={{ fontStyle: "italic" }}>
          {title}
        </Box>
        ?
      </Typography>

      <Button
        onClick={() => setGameState(GAME_STATES.RULES)}
        sx={{ mt: 4, width: "200px", fontSize: "20px" }}
      >
        PLAY NOW!
      </Button>
    </Box>
  );

  const renderRulesScreen = () => (
    <Box>
      {renderTopSection()}
      <Box sx={{
        p: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
        width: "80%",
        mx: "auto",
        border: `1px solid black`,
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: theme.typography.fontFamily, fontWeight: "bold" }}>
          Howdy!
        </Typography>
        <Typography gutterBottom sx={{ fontFamily: theme.typography.fontFamily, mb: 2 }}>
          Glad you're here partner. <br /> Here's how scoring works:
        </Typography>
        <Box sx={{ my: 3, pl: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Correct answer:</strong> +1 to +2 points
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, pl: 2 }}>
            Faster answers = More points!
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Incorrect answer:</strong> -1 point
          </Typography>
          <Typography variant="body1">
            <strong>Skip:</strong> 0 points
          </Typography>
        </Box>
        <Typography gutterBottom sx={{ mb: 4 }}>
          You have 1 minute to answer 10 questions.
        </Typography>
        <Button variant="contained" onClick={handleStartGame} sx={{
          mt: 2,
          py: 1.5,
          px: 4,
          fontSize: "1rem",
          textTransform: "none",
          borderRadius: 2,
        }}>
          Ready?
        </Button>
      </Box>
    </Box>
  );

  const renderProgressBar = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        mx: "auto",
        width: "80%",
        border: `1px solid black`,
        mb: 2,
      }}
    >
      {/* Top Section: Timer and Score */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Timer Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color:
                timeLeft <= 10
                  ? "error.main"
                  : timeLeft <= 30
                  ? "warning.main"
                  : "text.primary",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            ⏱️ {formatTime(timeLeft)}
          </Box>
        </Box>

        {/* Score Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            ⭐ {score}
          </Typography>
        </Box>
      </Box>

      <Typography
        mt={1}
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Today's Progress
      </Typography>

      {/* Progress Circles Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mt: 1,
        }}
      >
        {[...Array(10)].map((_, index) => {
          const iconSrc =
            index < answers.length
              ? answers[index] === "correct"
                ? "/assets/icons/correct-answer.svg"
                : answers[index] === "incorrect"
                ? "/assets/icons/incorrect-answer.svg"
                : "/assets/icons/skipped-answer.svg"
              : "/assets/icons/unanswered.svg";

          return (
            <Box
              key={index}
              sx={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={iconSrc}
                alt="progress icon"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  const renderTopSection = () => (
    <Box
      sx={{
        textAlign: "center",
        mb: 1,
        pt: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        How well do you know{" "}
        <Box component="span" sx={{ fontStyle: "italic" }}>
          {title}
        </Box>
        ?
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {renderProgressBar()}
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 1,
          mt: 2,
        }}
      >
        {[...Array(10)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor:
                index < answers.length
                  ? answers[index] === "correct"
                    ? "success.main"
                    : answers[index] === "incorrect"
                    ? "error.main"
                    : "grey.300"
                  : "grey.300",
              border: `1px solid ${theme.palette.divider}`,
            }}
          />
        ))}
      </Box> */}
    </Box>
  );

  const renderQuestionScreen = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions?.length || 10;

    return (
      <Box>
        {renderTopSection()}

        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            bgcolor: "background.paper",
            width: "80%",
            mx: "auto",
            border: `1px solid black`,
          }}
        >
          {/* <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Question {currentQuestionIndex + 1}/{totalQuestions}
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
                  color: "white",
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
            {[...Array(Math.max(0, totalQuestions - answers.length))].map(
              (_, idx) => (
                <Box
                  key={`empty-${idx}`}
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    bgcolor: "grey.300",
                  }}
                />
              )
            )}
          </Box>
        </Box> */}

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
                  borderRadius: "50px",
                  border: `1px solid black`,
                  textAlign: "center",
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
              <Button
                variant="contained"
                onClick={handleSubmitAnswer}
                fullWidth
              >
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
              border: `1px solid black`,
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
