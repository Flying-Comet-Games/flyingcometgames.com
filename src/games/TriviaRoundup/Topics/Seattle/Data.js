export const SEATTLE_QUESTIONS = [
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
        question:
          "Which famous market is a Seattle landmark and tourist destination?",
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
        question:
          "What iconic Seattle structure was built for the 1962 World's Fair?",
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
        question:
          "Which major company founded in 1971 in Seattle's Pike Place Market?",
        options: ["Starbucks", "Amazon", "Microsoft", "Boeing"],
        correctAnswer: "Starbucks",
        category: "Business",
        difficulty: 4,
      },
      {
        question:
          "What nickname did Seattle earn during the Klondike Gold Rush?",
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
        question:
          "Which Seattle neighborhood is known for its Scandinavian heritage?",
        options: ["Ballard", "Capitol Hill", "Fremont", "West Seattle"],
        correctAnswer: "Ballard",
        category: "Culture",
        difficulty: 6,
      },
      {
        question:
          "What indigenous tribe originally inhabited the Seattle area?",
        options: ["Duwamish", "Chinook", "Suquamish", "Muckleshoot"],
        correctAnswer: "Duwamish",
        category: "History",
        difficulty: 7,
      },
      {
        question:
          "Which architectural style defines Seattle's Pioneer Square district?",
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
        question:
          "What year did the Great Seattle Fire destroy the city's downtown?",
        options: ["1889", "1892", "1901", "1885"],
        correctAnswer: "1889",
        category: "History",
        difficulty: 9,
      },
      {
        question:
          "Which Seattle mayor established the city's first streetcar system?",
        options: ["Frank Black", "John Leary", "Henry Yesler", "Thomas Mercer"],
        correctAnswer: "Frank Black",
        category: "History",
        difficulty: 10,
      },
    ],
  },
];

export const getQuestionsForDate = (date) => {
    if (!date || !SEATTLE_QUESTIONS) {
      return null;
    }

    // Convert to PT/Los Angeles timezone
    const ptDate = new Date(
      date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );

    // Get current date in PT
    const currentPTDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );

    // Reset time parts for accurate date comparison
    currentPTDate.setHours(0, 0, 0, 0);
    ptDate.setHours(0, 0, 0, 0);

    // If requested date is in the future, return null
    if (ptDate > currentPTDate) {
      return null;
    }

    // Format the PT date as YYYY-MM-DD
    const dateString =
      ptDate.getFullYear() +
      "-" +
      String(ptDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(ptDate.getDate()).padStart(2, "0");

    const dayData = SEATTLE_QUESTIONS.find((entry) => entry.date === dateString);
    return dayData ? dayData.questions : null;
  };

  export const findLatestAvailableDate = () => {
    if (!SEATTLE_QUESTIONS) {
      return null;
    }

    // Get current date in PT
    const currentPTDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
    currentPTDate.setHours(0, 0, 0, 0);

    // Create dates in PT timezone and filter out future dates
    const sortedEntries = SEATTLE_QUESTIONS
      .map((entry) => ({
        date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
        original: entry,
      }))
      .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
      .sort((a, b) => b.date - a.date);

    return sortedEntries[0]?.original;
  };