import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getQuestionsForDate, findLatestAvailableDate } from './Data';
import BaseTrivaGame from '../../BaseTriviaGame';

const SanFranciscoTrivia = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const latestData = findLatestAvailableDate();
    if (latestData) {
      const ptDate = new Date(latestData.date + "T00:00:00-08:00");
      setCurrentDate(ptDate);
    }
  }, []);

  useEffect(() => {
    if (!currentDate) return;

    const data = getQuestionsForDate(currentDate);
    if (!data) {
      const latestData = findLatestAvailableDate();
      if (latestData) {
        setCurrentDate(new Date(latestData.date));
        setQuestions(latestData.questions);
      }
      return;
    }

    setQuestions(data);
  }, [currentDate]);

  if (!questions) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh',
        p: 4,
        textAlign: 'center'
      }}>
        <Typography variant="h5">
          No trivia available right now.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Check back later for new questions!
        </Typography>
      </Box>
    );
  }

  return (
    <BaseTrivaGame
      title="San Francisco"
      questions={questions}
      topic="san-francisco"
      shareText="San Francisco Trivia Round Up"
      shareUrl="https://flyingcometgames.com/trivia-roundup/san-francisco"
    />
  );
};

export default SanFranciscoTrivia;