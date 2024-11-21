// utils/game.js - Game and array utilities

import { getDataForDate } from "./date";

/**
 * Utility function to shuffle an array
 * Used for randomizing question options and question order
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Gets word data for word-based games
 */
export const getWordForDate = (date, wordDataset) => {
  return getDataForDate(date, wordDataset);
};

/**
 * Gets and transforms questions for trivia games
 */
export const getQuestionsForDate = (
  date,
questionDataset,
transformQuestions = (q) => q
) => {
  const dayData = getDataForDate(date, questionDataset);
  return dayData ? transformQuestions(dayData.questions) : null;
};

/**
 * Default question transformation: shuffles options for each question
 */
export const transformQuestions = (questions) => {
  return questions.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
};

/**
 * Gets questions with proper difficulty distribution
 */
export const generateQuestionSet = (
  questions,
  { easy = 4, medium = 4, hard = 2 } = {}
) => {
  const easyQuestions = questions.filter((q) => q.difficulty <= 3);
  const mediumQuestions = questions.filter(
    (q) => q.difficulty > 3 && q.difficulty <= 7
  );
  const hardQuestions = questions.filter((q) => q.difficulty > 7);

  const selectedEasy = shuffleArray(easyQuestions).slice(0, easy);
  const selectedMedium = shuffleArray(mediumQuestions).slice(0, medium);
  const selectedHard = shuffleArray(hardQuestions).slice(0, hard);

  return shuffleArray([...selectedEasy, ...selectedMedium, ...selectedHard]);
};
