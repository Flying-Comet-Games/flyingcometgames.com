// SFStandardDemo.js
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getQuestions } from "./Data";
import BaseTrivaGame from "../../BaseTriviaGame";

const SFStandardDemo = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const demoQuestions = getQuestions();
    setQuestions(demoQuestions);
  }, []);

  if (!questions) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Loading SF Standard News Trivia...</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Get ready to test your knowledge of today's top stories!
        </Typography>
      </Box>
    );
  }

  return (
    <BaseTrivaGame
      title="SF Standard News"
      questions={questions}
      topic="sfstandard"
      shareText="SF Standard News Trivia"
      shareUrl="https://flyingcometgames.com/trivia-roundup/sfstandard"
    />
  );
};

export default SFStandardDemo;