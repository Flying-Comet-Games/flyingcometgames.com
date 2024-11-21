import { shuffleArray, getQuestionsForDate as getGameQuestionsForDate } from '../../../utils/game';
import { findLatestAvailableData } from '../../../utils/date';

const SEATTLE_QUESTIONS = [
  {
    date: "2024-11-20",
    questions: [
      {
        question: "What body of water is Seattle primarily situated on?",
        options: [
          "Puget Sound",
          "Pacific Ocean",
          "Lake Washington",
          "Columbia River",
        ],
        correctAnswer: "Puget Sound",
        category: "Geography",
        difficulty: 1,
      },
      {
        question: "Which famous market is a Seattle landmark and tourist destination?",
        options: [
          "Pike Place Market",
          "Queen Victoria Market",
          "Reading Terminal Market",
          "Ferry Building Marketplace",
        ],
        correctAnswer: "Pike Place Market",
        category: "Landmarks",
        difficulty: 2,
      },
      {
        question: "What iconic Seattle structure was built for the 1962 World's Fair?",
        options: [
          "Space Needle",
          "Columbia Center",
          "Smith Tower",
          "Seattle Great Wheel",
        ],
        correctAnswer: "Space Needle",
        category: "History",
        difficulty: 3,
      },
      {
        question: "Which major company was founded in 1971 in Seattle's Pike Place Market?",
        options: ["Starbucks", "Amazon", "Microsoft", "Boeing"],
        correctAnswer: "Starbucks",
        category: "Business",
        difficulty: 4,
      },
      {
        question: "What nickname did Seattle earn during the Klondike Gold Rush?",
        options: [
          "Gateway to Alaska",
          "Emerald City",
          "Rain City",
          "Queen City",
        ],
        correctAnswer: "Gateway to Alaska",
        category: "History",
        difficulty: 5,
      },
      {
        question: "Which Seattle neighborhood is known for its Scandinavian heritage?",
        options: ["Ballard", "Capitol Hill", "Fremont", "West Seattle"],
        correctAnswer: "Ballard",
        category: "Culture",
        difficulty: 6,
      },
      {
        question: "What indigenous tribe originally inhabited the Seattle area?",
        options: ["Duwamish", "Chinook", "Suquamish", "Muckleshoot"],
        correctAnswer: "Duwamish",
        category: "History",
        difficulty: 7,
      },
      {
        question: "Which architectural style defines Seattle's Pioneer Square district?",
        options: [
          "Richardsonian Romanesque",
          "Art Deco",
          "Gothic Revival",
          "Victorian",
        ],
        correctAnswer: "Richardsonian Romanesque",
        category: "Architecture",
        difficulty: 8,
      },
      {
        question: "What year did the Great Seattle Fire destroy the city's downtown?",
        options: ["1889", "1892", "1901", "1885"],
        correctAnswer: "1889",
        category: "History",
        difficulty: 9,
      },
      {
        question: "Which Seattle mayor established the city's first streetcar system?",
        options: ["Frank Black", "John Leary", "Henry Yesler", "Thomas Mercer"],
        correctAnswer: "Frank Black",
        category: "History",
        difficulty: 10,
      },
    ],
  },
];

// Export the raw questions data
export { SEATTLE_QUESTIONS };

// Get questions for a specific date with shuffled options
export const getQuestionsForDate = (date) => {
  return getGameQuestionsForDate(date, SEATTLE_QUESTIONS, (questions) =>
    questions.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }))
  );
};

// Get the latest available questions
export const getLatestQuestions = () => {
  const latestData = findLatestAvailableData(SEATTLE_QUESTIONS);
  return latestData ? getGameQuestionsForDate(new Date(latestData.date), SEATTLE_QUESTIONS) : null;
};