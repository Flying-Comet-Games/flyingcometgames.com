// Data.js
export const YC_WORDS = [
  {
    date: "2024-11-01",
    theme: "Startup Stage",
    word: "ANGEL",
    characterCount: 5,
  },
  {
    date: "2024-11-02",
    theme: "Person",
    word: "DREW",
    characterCount: 4,
  },
  {
    date: "2024-11-03",
    theme: "Company",
    word: "STRIPE",
    characterCount: 6,
  },
  {
    date: "2024-11-04",
    theme: "Term",
    word: "PITCH",
    characterCount: 5,
  },
  {
    date: "2024-11-05",
    theme: "Person",
    word: "PAUL",
    characterCount: 4,
  },
  {
    date: "2024-11-06",
    theme: "Company",
    word: "AIRBNB",
    characterCount: 6,
  },
  {
    date: "2024-11-07",
    theme: "Term",
    word: "SCALE",
    characterCount: 5,
  },
  {
    date: "2024-11-08",
    theme: "Location",
    word: "VALLEY",
    characterCount: 6,
  },
  {
    date: "2024-11-09",
    theme: "Term",
    word: "ROUND",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Company",
    word: "REDDIT",
    characterCount: 6,
  },
  {
    date: "2024-11-11",
    theme: "Term",
    word: "SEED",
    characterCount: 4,
  },
  {
    date: "2024-11-12",
    theme: "Concept",
    word: "BUILD",
    characterCount: 5,
  },
  {
    date: "2024-11-13",
    theme: "Term",
    word: "STOCK",
    characterCount: 5,
  },
  {
    date: "2024-11-14",
    theme: "Term",
    word: "PIVOT",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Concept",
    word: "USERS",
    characterCount: 5,
  },
  {
    date: "2024-11-16",
    theme: "Term",
    word: "DILUTE",
    characterCount: 6,
  },
  {
    date: "2024-11-17",
    theme: "Location",
    word: "BATCH",
    characterCount: 5,
  },
  {
    date: "2024-11-18",
    theme: "Term",
    word: "RAISE",
    characterCount: 5,
  },
  {
    date: "2024-11-19",
    theme: "Company",
    word: "DOORDSH",
    characterCount: 7,
  },
  {
    date: "2024-11-20",
    theme: "Term",
    word: "BOARD",
    characterCount: 5,
  },
  {
    date: "2024-11-21",
    theme: "Person",
    word: "SAM",
    characterCount: 3,
  },
  {
    date: "2024-11-22",
    theme: "Term",
    word: "FUND",
    characterCount: 4,
  },
  {
    date: "2024-11-23",
    theme: "Concept",
    word: "GROWTH",
    characterCount: 6,
  },
  {
    date: "2024-11-24",
    theme: "Company",
    word: "CRUISE",
    characterCount: 6,
  },
  {
    date: "2024-11-25",
    theme: "Term",
    word: "CAP",
    characterCount: 3,
  },
  {
    date: "2024-11-26",
    theme: "Term",
    word: "TERMS",
    characterCount: 5,
  },
  {
    date: "2024-11-27",
    theme: "Location",
    word: "CASTRO",
    characterCount: 6,
  },
  {
    date: "2024-11-28",
    theme: "Concept",
    word: "LAUNCH",
    characterCount: 6,
  },
  {
    date: "2024-11-29",
    theme: "Term",
    word: "VESTING",
    characterCount: 7,
  },
  {
    date: "2024-11-30",
    theme: "Company",
    word: "TWITCH",
    characterCount: 6,
  },
  {
    date: "2024-12-01",
    theme: "Person",
    word: "GARRY",
    characterCount: 5,
  },
  {
    date: "2024-12-02",
    theme: "Term",
    word: "SERIES",
    characterCount: 6,
  },
  {
    date: "2024-12-03",
    theme: "Company",
    word: "DROPBOX",
    characterCount: 7,
  },
  {
    date: "2024-12-04",
    theme: "Term",
    word: "EQUITY",
    characterCount: 6,
  },
  {
    date: "2024-12-05",
    theme: "Concept",
    word: "MARKET",
    characterCount: 6,
  },
  {
    date: "2024-12-06",
    theme: "Person",
    word: "AARON",
    characterCount: 5,
  },
  {
    date: "2024-12-07",
    theme: "Term",
    word: "MVP",
    characterCount: 3,
  },
  {
    date: "2024-12-08",
    theme: "Company",
    word: "COINBSE",
    characterCount: 7,
  },
  {
    date: "2024-12-09",
    theme: "Term",
    word: "DEMO",
    characterCount: 4,
  },
  {
    date: "2024-12-10",
    theme: "Company",
    word: "INSTCRT",
    characterCount: 7,
  },
];

export const getWordForDate = (date) => {
  if (!date || !YC_WORDS || !Array.isArray(YC_WORDS)) {
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

  return YC_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!YC_WORDS || !Array.isArray(YC_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = YC_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
