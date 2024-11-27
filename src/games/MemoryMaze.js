import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Snackbar,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const GRID_SIZE = 5;
const PATH_LENGTH = 8;
const SHOW_PATH_TIME = 5000; // 5 seconds
const MAX_ATTEMPTS = 3;

const MemoryMaze = () => {
  const theme = useTheme();
  const [maze, setMaze] = useState([]);
  const [path, setPath] = useState([]);
  const [playerPath, setPlayerPath] = useState([]);
  const [showPath, setShowPath] = useState(false);
  const [gameState, setGameState] = useState("start"); // 'start', 'memorize', 'play', 'won', 'lost'
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [memorizeProgress, setMemorizeProgress] = useState(0);

  useEffect(() => {
    initializeMaze();
  }, []);

  const initializeMaze = () => {
    const newMaze = Array(GRID_SIZE)
      .fill()
      .map(() => Array(GRID_SIZE).fill(0));
    setMaze(newMaze);
    generatePath();
  };

  const generatePath = () => {
    const newPath = [];
    let currentPosition = [0, 0];
    newPath.push([...currentPosition]);

    for (let i = 1; i < PATH_LENGTH; i++) {
      const possibleMoves = [
        [currentPosition[0] + 1, currentPosition[1]],
        [currentPosition[0] - 1, currentPosition[1]],
        [currentPosition[0], currentPosition[1] + 1],
        [currentPosition[0], currentPosition[1] - 1],
      ].filter(
        ([x, y]) =>
          x >= 0 &&
          x < GRID_SIZE &&
          y >= 0 &&
          y < GRID_SIZE &&
          !newPath.some((p) => p[0] === x && p[1] === y)
      );

      if (possibleMoves.length === 0) break;

      const nextPosition =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      newPath.push(nextPosition);
      currentPosition = nextPosition;
    }

    setPath(newPath);
  };

  const startGame = () => {
    setGameState("memorize");
    setShowPath(true);
    setMemorizeProgress(0);
    const intervalId = setInterval(() => {
      setMemorizeProgress((oldProgress) => {
        const newProgress = oldProgress + 100 / (SHOW_PATH_TIME / 100);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    setTimeout(() => {
      setShowPath(false);
      setGameState("play");
      clearInterval(intervalId);
      setMemorizeProgress(0);
    }, SHOW_PATH_TIME);
  };

  const handleCellClick = (x, y) => {
    if (gameState !== "play") return;

    const cellIndex = playerPath.findIndex(
      (pos) => pos[0] === x && pos[1] === y
    );
    if (cellIndex !== -1) {
      // If the cell is already selected, remove it
      setPlayerPath(playerPath.filter((_, index) => index !== cellIndex));
    } else if (playerPath.length < PATH_LENGTH) {
      // If the cell is not selected and we haven't reached the path length, add it
      setPlayerPath([...playerPath, [x, y]]);
    }
  };

  const handleSubmit = () => {
    if (playerPath.length !== PATH_LENGTH) {
      setSnackbarMessage(`Please select exactly ${PATH_LENGTH} cells.`);
      setShowSnackbar(true);
      return;
    }

    checkPath(playerPath);
  };

  const checkPath = (playerPath) => {
    const pathSet = new Set(path.map((pos) => `${pos[0]},${pos[1]}`));
    const playerPathSet = new Set(
      playerPath.map((pos) => `${pos[0]},${pos[1]}`)
    );

    const correct =
      pathSet.size === playerPathSet.size &&
      [...pathSet].every((pos) => playerPathSet.has(pos));

    if (correct) {
      setScore(score + 1);
      setSnackbarMessage("Correct! Starting next round...");
      setShowSnackbar(true);
      setTimeout(() => {
        initializeMaze();
        setPlayerPath([]);
        startGame();
      }, 1500);
    } else {
      setAttempts(attempts + 1);
      if (attempts + 1 >= MAX_ATTEMPTS) {
        setGameState("lost");
        setSnackbarMessage("Game Over! You ran out of attempts.");
      } else {
        setSnackbarMessage(
          `Incorrect. ${MAX_ATTEMPTS - attempts - 1} attempts left.`
        );
        setPlayerPath([]);
      }
      setShowSnackbar(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setAttempts(0);
    initializeMaze();
    setPlayerPath([]);
    setGameState("start");
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
      <Box
        sx={{
          textAlign: "center",
          py: 2,
          flexDirection: "column",
          maxWidth: 600,
          margin: "auto",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Memory Maze
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Rules:
          </Typography>
          <Typography variant="body2" align="left">
            1. Memorize the path of {PATH_LENGTH} cells shown at the start of
            each round.
            <br />
            2. Recreate the path by clicking on the cells (order doesn't
            matter).
            <br />
            3. Click a cell again to deselect it.
            <br />
            4. Click the Submit button when you've selected all {
              PATH_LENGTH
            }{" "}
            cells.
            <br />
            5. You have {MAX_ATTEMPTS} attempts per round.
            <br />
            6. The game ends when you run out of attempts.
          </Typography>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Score: {score}</Typography>
          <Typography>Attempts left: {MAX_ATTEMPTS - attempts}</Typography>
        </Box>

        {gameState === "memorize" && (
          <Box sx={{ width: "100%", mb: 2 }}>
            <LinearProgress variant="determinate" value={memorizeProgress} />
          </Box>
        )}

        <Grid
          container
          spacing={1}
          sx={{ width: 300, height: 300, margin: "auto", mb: 2 }}
        >
          {maze.map((row, x) =>
            row.map((_, y) => (
              <Grid item xs={12 / GRID_SIZE} key={`${x}-${y}`}>
                <Box
                  onClick={() => handleCellClick(x, y)}
                  sx={{
                    width: "100%",
                    paddingBottom: "100%",
                    backgroundColor:
                      showPath &&
                      path.some((pos) => pos[0] === x && pos[1] === y)
                        ? theme.palette.secondary.main
                        : playerPath.some((pos) => pos[0] === x && pos[1] === y)
                        ? theme.palette.primary.main
                        : theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: "background-color 0.3s",
                    cursor: gameState === "play" ? "pointer" : "default",
                    position: "relative",
                  }}
                >
                  {showPath &&
                    path.findIndex((pos) => pos[0] === x && pos[1] === y) !==
                      -1 && (
                      <Typography
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: theme.palette.getContrastText(
                            theme.palette.secondary.main
                          ),
                          fontWeight: "bold",
                        }}
                      >
                        {path.findIndex((pos) => pos[0] === x && pos[1] === y) +
                          1}
                      </Typography>
                    )}
                </Box>
              </Grid>
            ))
          )}
        </Grid>

        {gameState === "start" && (
          <Button variant="contained" onClick={startGame}>
            Start Game
          </Button>
        )}

        {gameState === "play" && (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Selected: {playerPath.length} / {PATH_LENGTH} cells
            </Typography>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={playerPath.length !== PATH_LENGTH}
              sx={{ mt: 2 }}
            >
              Submit Path
            </Button>
          </Box>
        )}

        {(gameState === "won" || gameState === "lost") && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {gameState === "won" ? "You Won!" : "Game Over"}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Final Score: {score}
            </Typography>
            <Button variant="contained" onClick={restartGame}>
              Play Again
            </Button>
          </Box>
        )}

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

export default MemoryMaze;
