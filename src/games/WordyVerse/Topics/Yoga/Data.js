// Data.js
export const YOGA_WORDS = [
  {
    date: "2024-11-01",
    theme: "Poses",
    word: "ASANAS",
    characterCount: 6,
  },
  {
    date: "2024-11-02",
    theme: "Breathing",
    word: "PRANAY",
    characterCount: 6,
  },
  {
    date: "2024-11-03",
    theme: "Practice",
    word: "BANDHA",
    characterCount: 6,
  },
  {
    date: "2024-11-04",
    theme: "Energy",
    word: "NADIS",
    characterCount: 5,
  },
  {
    date: "2024-11-05",
    theme: "Practice",
    word: "SUKHAS",
    characterCount: 6,
  },
  {
    date: "2024-11-06",
    theme: "Flow",
    word: "VINYAS",
    characterCount: 6,
  },
  {
    date: "2024-11-07",
    theme: "Practice",
    word: "MUDRAS",
    characterCount: 6,
  },
  {
    date: "2024-11-08",
    theme: "Energy",
    word: "CHAKRA",
    characterCount: 6,
  },
  {
    date: "2024-11-09",
    theme: "Practice",
    word: "SURYA",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Philosophy",
    word: "TAPAS",
    characterCount: 5,
  },
  {
    date: "2024-11-11",
    theme: "Energy",
    word: "SHAKTI",
    characterCount: 6,
  },
  {
    date: "2024-11-12",
    theme: "Philosophy",
    word: "BHAKTI",
    characterCount: 6,
  },
  {
    date: "2024-11-13",
    theme: "Breathing",
    word: "UJJAYI",
    characterCount: 6,
  },
  {
    date: "2024-11-14",
    theme: "Philosophy",
    word: "SATYA",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Practice",
    word: "DHARNA",
    characterCount: 6,
  },
  {
    date: "2024-11-16",
    theme: "Philosophy",
    word: "YAMAS",
    characterCount: 5,
  },
  {
    date: "2024-11-17",
    theme: "Philosophy",
    word: "NIYAMA",
    characterCount: 6,
  },
  {
    date: "2024-11-18",
    theme: "Philosophy",
    word: "AHIMSA",
    characterCount: 6,
  },
  {
    date: "2024-11-19",
    theme: "Practice",
    word: "MANTRA",
    characterCount: 6,
  },
  {
    date: "2024-11-20",
    theme: "Philosophy",
    word: "SATTVA",
    characterCount: 6,
  },
  {
    date: "2024-11-21",
    theme: "Philosophy",
    word: "MUDITA",
    characterCount: 6,
  },
  {
    date: "2024-11-22",
    theme: "Practice",
    word: "SVADHY",
    characterCount: 6,
  },
  {
    date: "2024-11-23",
    theme: "Poses",
    word: "PADMAS",
    characterCount: 6,
  },
  {
    date: "2024-11-24",
    theme: "Poses",
    word: "TADASA",
    characterCount: 6,
  },
  {
    date: "2024-11-25",
    theme: "Poses",
    word: "SHAVAS",
    characterCount: 6,
  },
  {
    date: "2024-11-26",
    theme: "Poses",
    word: "SIRSAS",
    characterCount: 6,
  },
  {
    date: "2024-11-27",
    theme: "Poses",
    word: "VRKSAS",
    characterCount: 6,
  },
  {
    date: "2024-11-28",
    theme: "Practice",
    word: "STHIRA",
    characterCount: 6,
  },
  {
    date: "2024-11-29",
    theme: "Breathing",
    word: "KAPALA",
    characterCount: 6,
  },
  {
    date: "2024-11-30",
    theme: "Practice",
    word: "BADDHA",
    characterCount: 6,
  },
  {
    date: "2024-12-01",
    theme: "Poses",
    word: "ARDHA",
    characterCount: 5,
  },
  {
    date: "2024-12-02",
    theme: "Practice",
    word: "JALAND",
    characterCount: 6,
  },
  {
    date: "2024-12-03",
    theme: "Practice",
    word: "VIPASS",
    characterCount: 6,
  },
  {
    date: "2024-12-04",
    theme: "Poses",
    word: "GARUDA",
    characterCount: 6,
  },
  {
    date: "2024-12-05",
    theme: "Poses",
    word: "HANUMA",
    characterCount: 6,
  },
  {
    date: "2024-12-06",
    theme: "Poses",
    word: "CHATUR",
    characterCount: 6,
  },
  {
    date: "2024-12-07",
    theme: "Poses",
    word: "UPAVIS",
    characterCount: 6,
  },
  {
    date: "2024-12-08",
    theme: "Poses",
    word: "URDHVA",
    characterCount: 6,
  },
];

export const getWordForDate = (date) => {
  if (!date || !YOGA_WORDS || !Array.isArray(YOGA_WORDS)) {
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

  return YOGA_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!YOGA_WORDS || !Array.isArray(YOGA_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = YOGA_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
