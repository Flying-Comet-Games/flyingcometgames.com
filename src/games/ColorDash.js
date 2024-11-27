import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Snackbar, Paper, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import ShareIcon from "@mui/icons-material/Share";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import SquareIcon from "@mui/icons-material/Square";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";

const COLORS = ["#FF6F61", "#6C5B7B", "#355C7D"];
const SHAPES = ["circle", "square", "triangle"];
const INITIAL_SPEED = 4000;
const OBSTACLE_INTERVAL = 1500;
const SPEED_INCREMENT_INTERVAL = 8000;

const colorShapeCombinations = COLORS.flatMap((color, colorIndex) =>
  SHAPES.map((shape, shapeIndex) => ({
    id: `${colorIndex}-${shapeIndex}`,
    color,
    shape,
  }))
);

const moveAnimation = (speed) => keyframes`
  0% { right: 0; }
  100% { right: 100%; }
`;

const ColorDash = () => {
  const theme = useTheme();
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      if (!gameOver) generateObstacle();
    }, OBSTACLE_INTERVAL);

    const speedInterval = setInterval(() => {
      if (!gameOver) {
        setSpeed((prevSpeed) => Math.max(1500, prevSpeed - 500));
      }
    }, SPEED_INCREMENT_INTERVAL);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(speedInterval);
    };
  }, [gameOver]);

  const generateObstacle = () => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    setObstacles((prevObstacles) => [
      ...prevObstacles,
      { id: Date.now(), color, shape, matched: false },
    ]);
  };

  const handleSelection = (color, shape) => {
    if (obstacles.length === 0 || gameOver) return;

    const frontObstacle = obstacles[0];
    if (frontObstacle.color === color && frontObstacle.shape === shape) {
      const updatedObstacles = [...obstacles];
      updatedObstacles[0].matched = true;
      setObstacles(updatedObstacles.filter((obstacle) => !obstacle.matched));
      setScore((prevScore) => prevScore + 1);
    } else {
      setSnackbarMessage("Incorrect match!");
      setShowSnackbar(true);
    }
  };

  const handleAnimationEnd = (obstacleId) => {
    const obstacle = obstacles.find((obs) => obs.id === obstacleId);

    if (obstacle && !obstacle.matched) {
      setGameOver(true);
      setSnackbarMessage("Game Over! An obstacle reached the end!");
      setShowSnackbar(true);
    } else {
      setObstacles((prevObstacles) =>
        prevObstacles.filter((obs) => obs.id !== obstacleId)
      );
    }
  };

  const restartGame = () => {
    setSpeed(INITIAL_SPEED);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setShowSnackbar(false);
  };

  const handleShare = () => {
    const shareText = `I scored ${score} in Color Dash! Can you beat my score? Play now: ${window.location.href}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Color Dash Score",
          text: shareText,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          setSnackbarMessage("Score copied to clipboard!");
          setShowSnackbar(true);
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
          setSnackbarMessage("Failed to copy score. Please try again.");
          setShowSnackbar(true);
        });
    }
  };

  const renderShape = (shape, color) => {
    switch (shape) {
      case "circle":
        return <Brightness5Icon sx={{ fontSize: 50, color }} />;
      case "square":
        return <SquareIcon sx={{ fontSize: 50, color }} />;
      case "triangle":
        return <ChangeHistoryIcon sx={{ fontSize: 50, color }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        textAlign: "center",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ maxWidth: 600, margin: "auto", textAlign: "center", py: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Color Dash
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="body2" align="left">
            Guide the character by selecting the correct color and shape to
            match the upcoming obstacle.
          </Typography>
        </Paper>

        <Box
          sx={{
            width: "100%",
            height: "150px",
            backgroundColor: theme.palette.background.paper,
            position: "relative",
            overflow: "hidden",
            mb: 2,
            borderRadius: "8px",
          }}
        >
          {obstacles.map((obstacle) => (
            <Box
              key={obstacle.id}
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                animation: !gameOver
                  ? `${moveAnimation(speed)} ${speed}ms linear`
                  : "none",
                animationIterationCount: 1,
                right: 0,
              }}
              onAnimationEnd={() => handleAnimationEnd(obstacle.id)}
            >
              {renderShape(obstacle.shape, obstacle.color)}
            </Box>
          ))}
        </Box>

        <Typography sx={{ fontWeight: "bold", mb: 1 }}>
          Score: {score}
        </Typography>

        <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          {colorShapeCombinations.map(({ id, color, shape }) => (
            <Grid item key={id}>
              <Button
                onClick={() => handleSelection(color, shape)}
                sx={{
                  p: 1,
                  borderRadius: "12px",
                  border: `2px solid ${theme.palette.grey[300]}`,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                {renderShape(shape, color)}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={restartGame}
            sx={{
              py: 1,
              px: 3,
              fontSize: "1rem",
              backgroundColor: theme.palette.error.main,
            }}
          >
            Restart Game
          </Button>
          {gameOver && (
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{
                py: 1,
                px: 3,
                fontSize: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Share Score
            </Button>
          )}
        </Box>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          message={snackbarMessage}
        />
      </Box>
    </Box>
  );
};

export default ColorDash;
