export const WORDS = [
  {
    date: "2024-11-23",
    theme: "Union",
    word: "POLICY",
    characterCount: 6,
  },
  {
    date: "2024-11-22",
    theme: "Union",
    word: "BOYCOTT",
    characterCount: 7,
  },
  {
    date: "2024-11-21",
    theme: "Union",
    word: "WAGES",
    characterCount: 5,
  },
  {
    date: "2024-11-20",
    theme: "Union",
    word: "TERMS",
    characterCount: 5,
  },
  {
    date: "2024-11-19",
    theme: "Union",
    word: "FUNDS",
    characterCount: 5,
  },
  {
    date: "2024-11-18",
    theme: "Union",
    word: "MEMBER",
    characterCount: 6,
  },
  {
    date: "2024-11-17",
    theme: "Union",
    word: "UNION",
    characterCount: 5,
  },
  {
    date: "2024-11-16",
    theme: "Union",
    word: "LABOR",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Union",
    word: "PICKET",
    characterCount: 6,
  },
  {
    date: "2024-11-14",
    theme: "Union",
    word: "EQUITY",
    characterCount: 6,
  },
  {
    date: "2024-11-13",
    theme: "Union",
    word: "STRONG",
    characterCount: 6,
  },
  {
    date: "2024-11-12",
    theme: "Union",
    word: "BARGAIN",
    characterCount: 7,
  },
  {
    date: "2024-11-11",
    theme: "Union",
    word: "SCABBY",
    characterCount: 6,
  },
  {
    date: "2024-11-10",
    theme: "Union",
    word: "UNFAIR",
    characterCount: 6,
  },
  {
    date: "2024-11-09",
    theme: "Union",
    word: "GUILD",
    characterCount: 5,
  },
  {
    date: "2024-11-08",
    theme: "Union",
    word: "STRIKE",
    characterCount: 6,
  },
];

export const getWordForDate = (date) => {
  if (!date || !WORDS || !Array.isArray(WORDS)) {
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

  return WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!WORDS || !Array.isArray(WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
