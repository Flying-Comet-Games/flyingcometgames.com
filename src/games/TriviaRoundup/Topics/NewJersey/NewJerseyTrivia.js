// NewJerseyTrivia.js
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getQuestionsForDate, getLatestQuestions } from "./Data";
import { findLatestAvailableData } from "../../../utils/date";
import { NEW_JERSEY_QUESTIONS } from "./Data";
import BaseTrivaGame from "../../BaseTriviaGame";

const NewJerseyTrivia = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [questions, setQuestions] = useState(null);

  // Initialize with latest available date
  useEffect(() => {
    console.log("initialize questions");
    const latestData = getLatestQuestions();
    setQuestions(latestData);
  }, []);

  // Update questions when date changes
  useEffect(() => {
    if (!currentDate) return;

    console.log("grabbing daily questions");
    const dailyQuestions = getLatestQuestions();

    setQuestions(dailyQuestions);
  }, [currentDate]);

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
        <Typography variant="h5">No trivia available right now.</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Check back later for new questions!
        </Typography>
      </Box>
    );
  }

  return (
    <BaseTrivaGame
      title="New Jersey"
      questions={questions}
      topic="newjersey"
      shareText="New Jersey Trivia Round Up"
      shareUrl="https://flyingcometgames.com/trivia-roundup/newjersey"
    />
  );
};

export default NewJerseyTrivia;