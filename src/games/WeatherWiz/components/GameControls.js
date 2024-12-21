import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { Timer } from "lucide-react";
import { COLORS } from "../constants/config";
import anime from "animejs";

const GameControls = ({ score, timeLeft, currentSum, target, sumsLeft }) => {
  const scoreRef = useRef(null);

  const handleCharacterJumpAnimation = () => {
    if (scoreRef.current) {
      const scoreText = score.toString(); // Convert score to string
      const characters = Array.from(scoreText);

      // Clear the existing text
      scoreRef.current.innerHTML = "Score: ";

      // Wrap each character in a span
      characters.forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        scoreRef.current.appendChild(span);

        // Apply anime.js animation
        anime({
          targets: span,
          translateY: [0, -20, 0],
          duration: 500,
          delay: index * 100, // Stagger animation by 100ms for each character
          easing: "easeOutQuad",
        });
      });
    }
  };

  useEffect(() => {
    handleCharacterJumpAnimation();
  }, [score]);

  const handleFloatingPoints = () => {
    const floatingElement = document.createElement("div");
    floatingElement.textContent = "+100";
    floatingElement.style.position = "absolute";
    floatingElement.style.color = "#FFD700";
    floatingElement.style.fontSize = "1.2rem";
    floatingElement.style.fontWeight = "bold";
    floatingElement.style.pointerEvents = "none";
    floatingElement.style.transform = "translate(-50%, -50%)";
    floatingElement.style.top = "50%";
    floatingElement.style.left = "50%";
    floatingElement.style.zIndex = 1000;

    document.body.appendChild(floatingElement);

    anime({
      targets: floatingElement,
      translateY: -50,
      opacity: [1, 0],
      duration: 1000,
      easing: "easeOutQuad",
      complete: () => {
        floatingElement.remove();
      },
    });
  };

  useEffect(() => {
    if (currentSum === target) {
      handleFloatingPoints();
    }
  }, [currentSum]);

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", mb: 2, textAlign: "center" }}>
      {/* Timer and Score Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {timeLeft !== undefined && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Timer size={16} />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Time: {timeLeft}s
            </Typography>
          </Box>
        )}
        <Typography
          ref={scoreRef}
          variant="body2"
          sx={{ fontWeight: "bold" }}
        >
          Score: {score}
        </Typography>
      </Box>

      {/* Current Sum Section */}
      <Typography
        variant="h4"
        sx={{
          color: COLORS.primary,
          fontSize: { xs: "1.5rem", sm: "2rem" },
          mb: 1,
          fontWeight: "bold",
        }}
      >
        Sum: {currentSum} / {target}
      </Typography>

      {/* Sums Left Section */}
      <Typography
        variant="body1"
        sx={{
          color: "grey.600",
          fontSize: { xs: "1rem", sm: "1.25rem" },
          mb: 2,
        }}
      >
        {sumsLeft} sums left
      </Typography>
    </Box>
  );
};

export default GameControls;
