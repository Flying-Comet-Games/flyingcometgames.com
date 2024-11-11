// Data.js
export const ANIMAL_CROSSING_WORDS = [
  {
    date: "2024-11-23",
    theme: "Place",
    word: "DESERT",
    characterCount: 6,
  },
  {
    date: "2024-11-22",
    theme: "Character",
    word: "BUNNY",
    characterCount: 5,
  },
  {
    date: "2024-11-21",
    theme: "Thing",
    word: "BELLS",
    characterCount: 5,
  },
  {
    date: "2024-11-20",
    theme: "Collect",
    word: "TURNIP",
    characterCount: 6,
  },
  {
    date: "2024-11-19",
    theme: "Character",
    word: "MOLLY",
    characterCount: 5,
  },
  {
    date: "2024-11-18",
    theme: "Place",
    word: "MUSEUM",
    characterCount: 6,
  },
  {
    date: "2024-11-17",
    theme: "Character",
    word: "FLICK",
    characterCount: 5,
  },
  {
    date: "2024-11-16",
    theme: "Collect",
    word: "SHELL",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Thing",
    word: "SHRUB",
    characterCount: 5,
  },
  {
    date: "2024-11-14",
    theme: "Character",
    word: "LOTTIE",
    characterCount: 6,
  },
  {
    date: "2024-11-13",
    theme: "Thing",
    word: "CACTUS",
    characterCount: 6,
  },
  {
    date: "2024-11-12",
    theme: "Other",
    word: "TOOLS",
    characterCount: 5,
  },
  {
    date: "2024-11-11",
    theme: "Place",
    word: "PLAZA",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Collect",
    word: "APPLE",
    characterCount: 5,
  },
  {
    date: "2024-11-09",
    theme: "Character",
    word: "KICKS",
    characterCount: 5,
  },
  {
    date: "2024-11-08",
    theme: "Thing",
    word: "SHOVEL",
    characterCount: 6,
  },
  {
    date: "2024-11-07",
    theme: "Collect",
    word: "PEACH",
    characterCount: 5,
  },
  {
    date: "2024-11-06",
    theme: "Character",
    word: "DIGBY",
    characterCount: 5,
  },
  {
    date: "2024-11-05",
    theme: "Thing",
    word: "HOUSE",
    characterCount: 5,
  },
  {
    date: "2024-11-04",
    theme: "Collect",
    word: "STICK",
    characterCount: 5,
  },
  {
    date: "2024-11-03",
    theme: "Other",
    word: "POCKET",
    characterCount: 6,
  },
  {
    date: "2024-11-02",
    theme: "Character",
    word: "TIMMY",
    characterCount: 5,
  },
  {
    date: "2024-11-01",
    theme: "Collect",
    word: "FOSSIL",
    characterCount: 6,
  },
];

export const getWordForDate = (date) => {
  if (
    !date ||
    !ANIMAL_CROSSING_WORDS ||
    !Array.isArray(ANIMAL_CROSSING_WORDS)
  ) {
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

  return ANIMAL_CROSSING_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!ANIMAL_CROSSING_WORDS || !Array.isArray(ANIMAL_CROSSING_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = ANIMAL_CROSSING_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
