// Data.js
import {
  shuffleArray,
  getQuestionsForDate as getGameQuestionsForDate,
} from "../../../utils/game";
import { getDataForDate, getPTDate } from "../../../utils/date";

export const NEW_JERSEY_QUESTIONS = [
  {
    date: "2024-11-21",
    questions: [
      {
        id: "nj-1121-1",
        question: "What is New Jersey's nickname?",
        options: ["Garden State", "Ocean State", "Bay State", "Empire State"],
        correctAnswer: "Garden State",
        category: "General",
        difficulty: 1,
      },
      {
        id: "nj-1121-2",
        question: "What is the capital of New Jersey?",
        options: ["Trenton", "Newark", "Jersey City", "Atlantic City"],
        correctAnswer: "Trenton",
        category: "Geography",
        difficulty: 2,
      },
      {
        id: "nj-1121-3",
        question: "Which beach is known as 'The Queen of Resorts'?",
        options: ["Cape May", "Atlantic City", "Wildwood", "Ocean City"],
        correctAnswer: "Cape May",
        category: "Tourism",
        difficulty: 3,
      },
      {
        id: "nj-1121-4",
        question: "What year was Princeton University founded?",
        options: ["1746", "1766", "1756", "1776"],
        correctAnswer: "1746",
        category: "Education",
        difficulty: 4,
      },
      {
        id: "nj-1121-5",
        question:
          "Which New Jersey city hosted the first Miss America pageant?",
        options: ["Atlantic City", "Ocean City", "Cape May", "Asbury Park"],
        correctAnswer: "Atlantic City",
        category: "History",
        difficulty: 5,
      },
      {
        id: "nj-1121-6",
        question: "What percentage of New Jersey is covered by forests?",
        options: ["40%", "35%", "45%", "30%"],
        correctAnswer: "40%",
        category: "Environment",
        difficulty: 6,
      },
      {
        id: "nj-1121-7",
        question:
          "Which Native American tribe first inhabited the Pine Barrens?",
        options: ["Lenape", "Iroquois", "Mohawk", "Delaware"],
        correctAnswer: "Lenape",
        category: "History",
        difficulty: 7,
      },
      {
        id: "nj-1121-8",
        question: "What was the first planned industrial city in the US?",
        options: ["Paterson", "Newark", "Camden", "Elizabeth"],
        correctAnswer: "Paterson",
        category: "History",
        difficulty: 8,
      },
      {
        id: "nj-1121-9",
        question: "Which rare mineral was first discovered in New Jersey?",
        options: ["Franklinite", "Zincite", "Willemite", "Rhodonite"],
        correctAnswer: "Franklinite",
        category: "Science",
        difficulty: 9,
      },
      {
        id: "nj-1121-10",
        question:
          "What ancient geological feature formed the Watchung Mountains?",
        options: [
          "Basaltic lava flows",
          "Glacial deposits",
          "Tectonic uplift",
          "Marine sediments",
        ],
        correctAnswer: "Basaltic lava flows",
        category: "Geology",
        difficulty: 10,
      },
    ],
  },
  // Additional dates and questions would continue here...
];

export default NEW_JERSEY_QUESTIONS;

// Get questions for a specific date with shuffled options
export const getQuestionsForDate = (date) => {
  console.log(date);
  const dailyData = getDataForDate(date, NEW_JERSEY_QUESTIONS);
  return (
    dailyData?.questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    })) || null
  );
};

// Get today's questions (in PT)
export const getLatestQuestions = () => {
  return getQuestionsForDate(getPTDate());
};
