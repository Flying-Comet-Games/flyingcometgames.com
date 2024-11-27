import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useSpring, animated } from "react-spring";
import { useInterval } from "react-use";
import ShareIcon from "@mui/icons-material/Share";

const GAME_WIDTH = 300;
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 30;
const BLOCK_SIZE = 40;
const INITIAL_SPEED = 2;
const SPEED_INCREMENT = 0.1;
const SPAWN_INTERVAL = 1000;

const AvoidTheBlocks = () => {
  const [playerPosition, setPlayerPosition] = useState(
    GAME_WIDTH / 2 - PLAYER_SIZE / 2
  );
  const [blocks, setBlocks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameStarted, setGameStarted] = useState(false);
  const [immunityActive, setImmunityActive] = useState(false);

  const playerAnimation = useSpring({
    left: `${playerPosition}px`,
    config: { tension: 300, friction: 20 },
  });

  const movePlayer = useCallback((direction) => {
    setPlayerPosition((prevPos) => {
      const newPos = prevPos + direction * 10;
      return Math.max(0, Math.min(GAME_WIDTH - PLAYER_SIZE, newPos));
    });
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") movePlayer(-1);
      if (e.key === "ArrowRight") movePlayer(1);
    },
    [movePlayer]
  );

  const spawnBlock = useCallback(() => {
    const isSpeedyBlock = Math.random() < 0.2;
    const isFreezeBlock = Math.random() < 0.1;

    const newBlock = {
      x: Math.random() * (GAME_WIDTH - BLOCK_SIZE),
      y: -BLOCK_SIZE,
      type: isSpeedyBlock ? "speedy" : isFreezeBlock ? "freeze" : "normal",
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  }, []);

  const updateGame = useCallback(() => {
    if (gameOver || !gameStarted) return;

    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks
        .map((block) => ({
          ...block,
          y: block.y + (block.type === "speedy" ? speed * 1.5 : speed),
        }))
        .filter((block) => block.y < GAME_HEIGHT);

      if (!immunityActive) {
        const collision = updatedBlocks.some(
          (block) =>
            block.y + BLOCK_SIZE > GAME_HEIGHT - PLAYER_SIZE &&
            block.x < playerPosition + PLAYER_SIZE &&
            block.x + BLOCK_SIZE > playerPosition
        );

        if (collision) {
          setGameOver(true);
          setHighScore((prevHighScore) => Math.max(prevHighScore, score));
        }
      }

      updatedBlocks.forEach((block) => {
        if (block.type === "freeze" && block.y >= GAME_HEIGHT) {
          setSpeed((prevSpeed) => Math.max(INITIAL_SPEED, prevSpeed - 0.5));
        }
      });

      return updatedBlocks;
    });

    setScore((prevScore) => prevScore + 1);
    setSpeed((prevSpeed) => prevSpeed + SPEED_INCREMENT / 60);

    if (Math.random() < 0.005 && !immunityActive) {
      setImmunityActive(true);
      setTimeout(() => setImmunityActive(false), 3000);
    }
  }, [gameOver, gameStarted, playerPosition, score, speed, immunityActive]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useInterval(spawnBlock, gameStarted && !gameOver ? SPAWN_INTERVAL : null);
  useInterval(updateGame, gameStarted && !gameOver ? 1000 / 60 : null);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setBlocks([]);
    setPlayerPosition(GAME_WIDTH / 2 - PLAYER_SIZE / 2);
  };

  const handleShare = () => {
    const shareText = `I scored ${score} in Raining Blocks! Can you beat my score?`;

    if (navigator.share) {
      navigator
        .share({
          title: "Raining Blocks Score",
          text: shareText,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          alert("Score copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
          alert("Failed to copy score. Please try again.");
        });
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
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Raining Blocks
        </Typography>

        <Box
          sx={{
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            border: "2px solid #000",
            position: "relative",
            overflow: "hidden",
            margin: "auto",
            backgroundColor: "#f0f0f0",
          }}
        >
          {immunityActive && (
            <Box
              sx={{
                position: "absolute",
                top: GAME_HEIGHT - PLAYER_SIZE - 50,
                width: GAME_WIDTH,
                height: 50,
                backgroundColor: "rgba(0, 255, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "#000", fontWeight: "bold" }}
              >
                IMMUNITY ACTIVE
              </Typography>
            </Box>
          )}
          {blocks.map((block, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
                backgroundColor:
                  block.type === "speedy"
                    ? "error.dark"
                    : block.type === "freeze"
                    ? "info.main"
                    : "error.main",
                left: block.x,
                top: block.y,
              }}
            />
          ))}
          <animated.div
            style={{
              ...playerAnimation,
              position: "absolute",
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              backgroundColor: immunityActive ? "#00ff00" : "#1976d2",
              bottom: 0,
              borderRadius: immunityActive ? "50%" : "0%",
            }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Score: {score}</Typography>
          <Typography variant="h6">High Score: {highScore}</Typography>
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}>
          {!gameStarted || gameOver ? (
            <Button variant="contained" onClick={startGame}>
              {gameOver ? "Play Again" : "Start Game"}
            </Button>
          ) : null}

          {gameOver && (
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              onClick={handleShare}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Share Score
            </Button>
          )}
        </Box>

        {gameStarted && !gameOver && (
          <Box sx={{ mt: 2 }}>
            <Button
              onMouseDown={() => movePlayer(-1)}
              onTouchStart={() => movePlayer(-1)}
            >
              ← Left
            </Button>
            <Button
              onMouseDown={() => movePlayer(1)}
              onTouchStart={() => movePlayer(1)}
            >
              Right →
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AvoidTheBlocks;
