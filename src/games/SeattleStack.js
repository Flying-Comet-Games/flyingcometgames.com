import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";

const STACKS = 4;
const POLE_HEIGHT = 400;
const MAX_STACK_HEIGHT = 6;

const CUPS = {
  8: {
    name: "Short",
    color: "#B0C5A4",
    next: 12
  },
  12: {
    name: "Tall",
    color: "#98B386",
    next: 16
  },
  16: {
    name: "Grande",
    color: "#81A169",
    next: 20
  },
  20: {
    name: "Venti",
    color: "#6A8F4C",
    next: 24
  },
  24: {
    name: "Mega",
    color: "#537D2F",
    next: 32
  },
  32: {
    name: "Ultra",
    color: "#3C6B12",
    next: 40
  },
  40: {
    name: "Jumbo",
    color: "#2B4E0E",
    next: 48
  },
  48: {
    name: "Super",
    color: "#1A310A",
    next: 64
  },
  64: {
    name: "Monster",
    color: "#0A1405",
    next: 96
  },
  96: {
    name: "Party Size",
    color: "#000000",
    next: null
  }
};

const SeattleCoffeeStack = () => {
  const [stacks, setStacks] = useState(Array(STACKS).fill([]));
  const [score, setScore] = useState(0);
  const [nextCup, setNextCup] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("Combine cups to create larger drinks!");
  const [highestAchieved, setHighestAchieved] = useState(8);

  useEffect(() => {
    generateNextCup();
  }, []);

  const generateNextCup = () => {
    // More varied starting cups as game progresses
    const baseChances = {
      8: 0.7,
      12: 0.2,
      16: 0.1
    };

    // Adjust probabilities based on highest achieved
    if (highestAchieved >= 32) {
      baseChances[8] = 0.5;
      baseChances[12] = 0.3;
      baseChances[16] = 0.2;
    }

    const rand = Math.random();
    let cumProb = 0;
    for (const [size, prob] of Object.entries(baseChances)) {
      cumProb += prob;
      if (rand < cumProb) {
        setNextCup(parseInt(size));
        break;
      }
    }
  };

  const checkForGameOver = (newStacks) => {
    if (newStacks.every(stack => stack.length >= MAX_STACK_HEIGHT)) {
      setGameOver(true);
      setMessage(`Game Over! Final Score: ${score}`);
      return true;
    }
    return false;
  };

  const handleStackClick = (stackIndex) => {
    if (gameOver || !nextCup) return;

    const currentStack = [...stacks[stackIndex]];

    if (currentStack.length >= MAX_STACK_HEIGHT) {
      setMessage("Stack is full! Try another column.");
      return;
    }

    currentStack.push(nextCup);
    let newStacks = [...stacks];
    newStacks[stackIndex] = currentStack;

    let madeMatch;
    do {
      madeMatch = false;
      for (let i = 0; i < currentStack.length - 1; i++) {
        if (currentStack[i] === currentStack[i + 1]) {
          const combinedSize = CUPS[currentStack[i]].next;
          if (combinedSize) {
            currentStack.splice(i, 2, combinedSize);
            const points = combinedSize * 2;
            setScore(prev => prev + points);
            madeMatch = true;

            if (combinedSize > highestAchieved) {
              setHighestAchieved(combinedSize);
              setMessage(`New size unlocked: ${CUPS[combinedSize].name}! +${points}`);
            } else {
              setMessage(`Created ${combinedSize}oz ${CUPS[combinedSize].name}! +${points}`);
            }

            // Clear stack if Party Size is achieved
            if (combinedSize === 96) {
              currentStack.splice(i, 1);
              setScore(prev => prev + 500); // Big bonus
              setMessage("🎉 Party Size achieved! Stack cleared! +500");
            }
            break;
          }
        }
      }
    } while (madeMatch);

    newStacks[stackIndex] = currentStack;
    setStacks(newStacks);

    if (!checkForGameOver(newStacks)) {
      generateNextCup();
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#F8F6F4", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "#43766C",
            fontWeight: "bold"
          }}
        >
          Seattle Coffee Stack
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: "white",
            borderRadius: 2
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
            Score: {score}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "#43766C",
              fontSize: "1.1rem"
            }}
          >
            {message}
          </Typography>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 4,
            mb: 3,
            bgcolor: "white",
            borderRadius: 2,
            height: POLE_HEIGHT + 80,
            position: "relative"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "100%",
              position: "relative"
            }}
          >
            {stacks.map((stack, index) => (
              <Box
                key={index}
                onClick={() => handleStackClick(index)}
                sx={{
                  width: "100px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                  position: "relative",
                  cursor: "pointer",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    width: "6px",
                    height: POLE_HEIGHT,
                    bgcolor: "#8B7355",
                    borderRadius: "3px",
                    zIndex: 1
                  }
                }}
              >
                {stack.map((oz, cupIndex) => (
                  <Box
                    key={cupIndex}
                    sx={{
                      width: `${50 + (oz/8)}px`,
                      height: "40px",
                      bgcolor: CUPS[oz].color,
                      borderRadius: "6px 6px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      mb: 0.5,
                      zIndex: 2,
                      position: "relative",
                      transition: "all 0.2s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-4px",
                        width: "calc(100% + 8px)",
                        height: "4px",
                        bgcolor: CUPS[oz].color,
                        borderRadius: "0 0 8px 8px"
                      }
                    }}
                  >
                    {oz}oz
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 3,
            bgcolor: "white",
            borderRadius: 2
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: "bold"
            }}
          >
            Next Cup
          </Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2
          }}>
            {nextCup && (
              <Box
                sx={{
                  width: `${50 + (nextCup/8)}px`,
                  height: "40px",
                  bgcolor: CUPS[nextCup].color,
                  borderRadius: "6px 6px 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-4px",
                    width: "calc(100% + 8px)",
                    height: "4px",
                    bgcolor: CUPS[nextCup].color,
                    borderRadius: "0 0 8px 8px"
                  }
                }}
              >
                {nextCup}oz
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SeattleCoffeeStack;