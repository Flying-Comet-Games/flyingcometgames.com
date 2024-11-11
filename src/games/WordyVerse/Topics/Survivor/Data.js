// Data.js
export const SURVIVOR_WORDS = [
  {
    date: "2024-11-01",
    theme: "Item",
    word: "TORCH",
    characterCount: 5,
  },
  {
    date: "2024-11-02",
    theme: "Host Line",
    word: "SPOKEN",
    characterCount: 6,
  },
  {
    date: "2024-11-03",
    theme: "Challenge",
    word: "PUZZLE",
    characterCount: 6,
  },
  {
    date: "2024-11-04",
    theme: "Location",
    word: "FIJI",
    characterCount: 4,
  },
  {
    date: "2024-11-05",
    theme: "Game Term",
    word: "IDOL",
    characterCount: 4,
  },
  {
    date: "2024-11-06",
    theme: "Game Term",
    word: "TRIBAL",
    characterCount: 6,
  },
  {
    date: "2024-11-07",
    theme: "Challenge",
    word: "ENDURE",
    characterCount: 6,
  },
  {
    date: "2024-11-08",
    theme: "Game Term",
    word: "MERGE",
    characterCount: 5,
  },
  {
    date: "2024-11-09",
    theme: "Location",
    word: "BEACH",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Host",
    word: "PROBST",
    characterCount: 6,
  },
  {
    date: "2024-11-11",
    theme: "Challenge",
    word: "SWIM",
    characterCount: 4,
  },
  {
    date: "2024-11-12",
    theme: "Game Term",
    word: "VOTE",
    characterCount: 4,
  },
  {
    date: "2024-11-13",
    theme: "Challenge",
    word: "BALANCE",
    characterCount: 7,
  },
  {
    date: "2024-11-14",
    theme: "Game Term",
    word: "ALLIANCE",
    characterCount: 8,
  },
  {
    date: "2024-11-15",
    theme: "Location",
    word: "PONDEROSA",
    characterCount: 9,
  },
  {
    date: "2024-11-16",
    theme: "Game Term",
    word: "JURY",
    characterCount: 4,
  },
  {
    date: "2024-11-17",
    theme: "Challenge",
    word: "IMMUNITY",
    characterCount: 8,
  },
  {
    date: "2024-11-18",
    theme: "Game Term",
    word: "BLINDSIDE",
    characterCount: 9,
  },
  {
    date: "2024-11-19",
    theme: "Challenge",
    word: "REWARD",
    characterCount: 6,
  },
  {
    date: "2024-11-20",
    theme: "Season",
    word: "BORNEO",
    characterCount: 6,
  },
  {
    date: "2024-11-21",
    theme: "Game Term",
    word: "CONFESSIONAL",
    characterCount: 11,
  },
  {
    date: "2024-11-22",
    theme: "Location",
    word: "CAMP",
    characterCount: 4,
  },
  {
    date: "2024-11-23",
    theme: "Challenge",
    word: "SLIDE",
    characterCount: 5,
  },
  {
    date: "2024-11-24",
    theme: "Game Term",
    word: "STRATEGY",
    characterCount: 8,
  },
  {
    date: "2024-11-25",
    theme: "Challenge",
    word: "FIRE",
    characterCount: 4,
  },
  {
    date: "2024-11-26",
    theme: "Game Term",
    word: "OUTWIT",
    characterCount: 6,
  },
  {
    date: "2024-11-27",
    theme: "Game Term",
    word: "OUTLAST",
    characterCount: 7,
  },
  {
    date: "2024-11-28",
    theme: "Game Term",
    word: "OUTPLAY",
    characterCount: 7,
  },
  {
    date: "2024-11-29",
    theme: "Item",
    word: "BUFF",
    characterCount: 4,
  },
  {
    date: "2024-11-30",
    theme: "Game Term",
    word: "FINAL",
    characterCount: 5,
  },
  {
    date: "2024-12-01",
    theme: "Challenge",
    word: "MAZE",
    characterCount: 4,
  },
  {
    date: "2024-12-02",
    theme: "Game Term",
    word: "ADVANTAGE",
    characterCount: 9,
  },
  {
    date: "2024-12-03",
    theme: "Location",
    word: "EXILE",
    characterCount: 5,
  },
  {
    date: "2024-12-04",
    theme: "Game Term",
    word: "TRIBE",
    characterCount: 5,
  },
  {
    date: "2024-12-05",
    theme: "Season",
    word: "HEROES",
    characterCount: 6,
  },
  {
    date: "2024-12-06",
    theme: "Game Term",
    word: "GOAT",
    characterCount: 4,
  },
  {
    date: "2024-12-07",
    theme: "Challenge",
    word: "PERCH",
    characterCount: 5,
  },
  {
    date: "2024-12-08",
    theme: "Item",
    word: "FLAG",
    characterCount: 4,
  },
  {
    date: "2024-12-09",
    theme: "Challenge",
    word: "ROPE",
    characterCount: 4,
  },
  {
    date: "2024-12-10",
    theme: "Game Term",
    word: "VOTE",
    characterCount: 4,
  },
  {
    date: "2024-12-11",
    theme: "Game Term",
    word: "RESUME",
    characterCount: 6,
  },
  {
    date: "2024-12-12",
    theme: "Location",
    word: "COUNCIL",
    characterCount: 7,
  },
  {
    date: "2024-12-13",
    theme: "Game Term",
    word: "SPLIT",
    characterCount: 5,
  },
  {
    date: "2024-12-14",
    theme: "Challenge",
    word: "DIVE",
    characterCount: 4,
  },
  {
    date: "2024-12-15",
    theme: "Season",
    word: "VILLAINS",
    characterCount: 8,
  },
];

export const getWordForDate = (date) => {
  if (!date || !SURVIVOR_WORDS || !Array.isArray(SURVIVOR_WORDS)) {
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

  return SURVIVOR_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!SURVIVOR_WORDS || !Array.isArray(SURVIVOR_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = SURVIVOR_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};