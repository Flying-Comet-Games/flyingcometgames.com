import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  getQuestionsForDate,
  getLatestQuestions,
} from "./Data";
import { findLatestAvailableData } from "../../../utils/date";
import { SEATTLE_QUESTIONS } from "./Data";
import BaseTrivaGame from "../../BaseTriviaGame";

const SeattleTrivia = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [questions, setQuestions] = useState(null);

  // Initialize with latest available date
  useEffect(() => {
    const latestData = findLatestAvailableData(SEATTLE_QUESTIONS);
    if (latestData) {
      setCurrentDate(new Date(latestData.date));
      const dailyQuestions = getLatestQuestions();
      if (dailyQuestions) {
        setQuestions(dailyQuestions);
      }
    }
  }, []);

  // Update questions when date changes
  useEffect(() => {
    if (!currentDate) return;

    const dailyQuestions = getQuestionsForDate(currentDate, SEATTLE_QUESTIONS);
    if (!dailyQuestions) {
      // If no questions for current date, fall back to latest available
      const latestQuestions = getLatestQuestions();
      if (latestQuestions) {
        const latestData = findLatestAvailableData(SEATTLE_QUESTIONS);
        setCurrentDate(new Date(latestData.date));
        setQuestions(latestQuestions);
      }
      return;
    }

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
      title="Seattle"
      questions={questions}
      topic="seattle"
      shareText="Seattle Trivia Round Up"
      shareUrl="https://flyingcometgames.com/trivia-roundup/seattle"
    />
  );
};

export default SeattleTrivia;
