import { shuffleArray, getQuestionsForDate as getGameQuestionsForDate } from '../../../utils/game';
import { findLatestAvailableData } from '../../../utils/date';

const SF_QUESTIONS = [
  {
    date: "2024-11-20",
    questions: [
      {
        question: "What iconic bridge is San Francisco famous for?",
        options: [
          "Golden Gate Bridge",
          "Bay Bridge",
          "Brooklyn Bridge",
          "London Bridge",
        ],
        correctAnswer: "Golden Gate Bridge",
        category: "Landmarks",
        difficulty: 1,
      },
      {
        question: "Which famous prison is located in San Francisco Bay?",
        options: ["Alcatraz", "Sing Sing", "San Quentin", "Folsom"],
        correctAnswer: "Alcatraz",
        category: "Landmarks",
        difficulty: 2,
      },
      {
        question:
          "What mode of transportation is considered a symbol of San Francisco?",
        options: ["Cable Car", "Subway", "Horse Carriage", "Monorail"],
        correctAnswer: "Cable Car",
        category: "Transportation",
        difficulty: 3,
      },
      {
        question:
          "Which famous street in SF is known for its eight hairpin turns?",
        options: [
          "Lombard Street",
          "Market Street",
          "Castro Street",
          "Mission Street",
        ],
        correctAnswer: "Lombard Street",
        category: "Geography",
        difficulty: 4,
      },
      {
        question: "What neighborhood is known as SF's oldest Chinatown?",
        options: [
          "Grant Avenue",
          "North Beach",
          "Mission District",
          "Hayes Valley",
        ],
        correctAnswer: "Grant Avenue",
        category: "Culture",
        difficulty: 5,
      },
      {
        question:
          "In what year did the devastating San Francisco earthquake occur?",
        options: ["1906", "1889", "1915", "1923"],
        correctAnswer: "1906",
        category: "History",
        difficulty: 6,
      },
      {
        question:
          "Which SF neighborhood was the center of the 1960s counterculture movement?",
        options: [
          "Haight-Ashbury",
          "Pacific Heights",
          "Russian Hill",
          "Nob Hill",
        ],
        correctAnswer: "Haight-Ashbury",
        category: "History",
        difficulty: 7,
      },
      {
        question:
          "What was the name of the indigenous people who first inhabited the SF peninsula?",
        options: ["Ohlone", "Miwok", "Pomo", "Yokuts"],
        correctAnswer: "Ohlone",
        category: "History",
        difficulty: 8,
      },
      {
        question:
          "Which architect designed the distinctive Transamerica Pyramid?",
        options: [
          "William Pereira",
          "Frank Lloyd Wright",
          "I.M. Pei",
          "Frank Gehry",
        ],
        correctAnswer: "William Pereira",
        category: "Architecture",
        difficulty: 9,
      },
      {
        question:
          "What was the original name of San Francisco during Spanish colonization?",
        options: [
          "Yerba Buena",
          "San Pedro",
          "Mission Dolores",
          "Puerto Dorado",
        ],
        correctAnswer: "Yerba Buena",
        category: "History",
        difficulty: 10,
      },
    ],
  },
];

// Export the raw questions data
export { SF_QUESTIONS };

// Get questions for a specific date with shuffled options
export const getQuestionsForDate = (date) => {
  return getGameQuestionsForDate(date, SF_QUESTIONS, (questions) =>
    questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }))
  );
};

// Get the latest available questions
export const getLatestQuestions = () => {
  const latestData = findLatestAvailableData(SF_QUESTIONS);
  return latestData ? getGameQuestionsForDate(new Date(latestData.date), SF_QUESTIONS) : null;
};
