// Data.js
export const OT_WORDS = [
  {
    date: "2024-11-23",
    theme: "Common OT/PT term",
    word: "ACTIVE",
    characterCount: 6,
  },
  {
    date: "2024-11-22",
    theme: "ADL item",
    word: "TOWEL",
    characterCount: 5,
  },
  {
    date: "2024-11-21",
    theme: "Body part",
    word: "SPINE",
    characterCount: 5,
  },
  {
    date: "2024-11-20",
    theme: "Movement",
    word: "DEXTER",
    characterCount: 6,
  },
  {
    date: "2024-11-19",
    theme: "Body part",
    word: "JOINT",
    characterCount: 5,
  },
  {
    date: "2024-11-18",
    theme: "Therapy goal",
    word: "LEARN",
    characterCount: 5,
  },
  {
    date: "2024-11-17",
    theme: "Assessment area",
    word: "MOTION",
    characterCount: 6,
  },
  {
    date: "2024-11-16",
    theme: "Treatment",
    word: "TASKS",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Treatment",
    word: "THERA",
    characterCount: 5,
  },
  {
    date: "2024-11-14",
    theme: "Evaluation",
    word: "ASSESS",
    characterCount: 6,
  },
  {
    date: "2024-11-13",
    theme: "Equipment",
    word: "BRACE",
    characterCount: 5,
  },
  {
    date: "2024-11-12",
    theme: "Treatment",
    word: "REHAB",
    characterCount: 5,
  },
  {
    date: "2024-11-11",
    theme: "Assessment area",
    word: "MOTOR",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Equipment",
    word: "WALKER",
    characterCount: 6,
  },
  {
    date: "2024-11-09",
    theme: "Treatment plan",
    word: "GOALS",
    characterCount: 5,
  },
  {
    date: "2024-11-08",
    theme: "ADL item",
    word: "BRUSH",
    characterCount: 5,
  },
  {
    date: "2024-11-07",
    theme: "Equipment",
    word: "CRUTCH",
    characterCount: 6,
  },
  {
    date: "2024-11-06",
    theme: "Assessment area",
    word: "VISION",
    characterCount: 6,
  },
  {
    date: "2024-11-05",
    theme: "Body part",
    word: "MUSCLE",
    characterCount: 6,
  },
  {
    date: "2024-11-04",
    theme: "Movement",
    word: "PIVOT",
    characterCount: 5,
  },
  {
    date: "2024-11-03",
    theme: "Treatment",
    word: "TREAT",
    characterCount: 5,
  },
  {
    date: "2024-11-02",
    theme: "Movement",
    word: "ROTATE",
    characterCount: 6,
  },
  {
    date: "2024-11-01",
    theme: "Treatment goal",
    word: "SKILLS",
    characterCount: 6,
  },
];

export const getWordForDate = (date) => {
  if (!date || !OT_WORDS || !Array.isArray(OT_WORDS)) {
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

  return OT_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!OT_WORDS || !Array.isArray(OT_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = OT_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
