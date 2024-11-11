// Data.js
export const AMERICAN_DAD_WORDS = [
  {
    date: "2024-11-01",
    theme: "Character",
    word: "ROGER",
    characterCount: 5,
  },
  {
    date: "2024-11-02",
    theme: "Character",
    word: "STEVE",
    characterCount: 5,
  },
  {
    date: "2024-11-03",
    theme: "Location",
    word: "LANGLEY",
    characterCount: 7,
  },
  {
    date: "2024-11-04",
    theme: "Character",
    word: "KLAUS",
    characterCount: 5,
  },
  {
    date: "2024-11-05",
    theme: "Character",
    word: "HAYLEY",
    characterCount: 6,
  },
  {
    date: "2024-11-06",
    theme: "Location",
    word: "CIA",
    characterCount: 3,
  },
  {
    date: "2024-11-07",
    theme: "Character",
    word: "STAN",
    characterCount: 4,
  },
  {
    date: "2024-11-08",
    theme: "Character",
    word: "JEFF",
    characterCount: 4,
  },
  {
    date: "2024-11-09",
    theme: "Roger Persona",
    word: "RICKY",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Character",
    word: "BULLOCK",
    characterCount: 7,
  },
  {
    date: "2024-11-11",
    theme: "Location",
    word: "GROFFS",
    characterCount: 6,
  },
  {
    date: "2024-11-12",
    theme: "Character",
    word: "BARRY",
    characterCount: 5,
  },
  {
    date: "2024-11-13",
    theme: "Location",
    word: "PEARL",
    characterCount: 5,
  },
  {
    date: "2024-11-14",
    theme: "Character",
    word: "SNOT",
    characterCount: 4,
  },
  {
    date: "2024-11-15",
    theme: "Roger Persona",
    word: "JENNY",
    characterCount: 5,
  },
  {
    date: "2024-11-16",
    theme: "Location",
    word: "ATTIC",
    characterCount: 5,
  },
  {
    date: "2024-11-17",
    theme: "Item",
    word: "GOLDEN",
    characterCount: 6,
  },
  {
    date: "2024-11-18",
    theme: "Character",
    word: "TOSHI",
    characterCount: 5,
  },
  {
    date: "2024-11-19",
    theme: "Roger Persona",
    word: "SIDNEY",
    characterCount: 6,
  },
  {
    date: "2024-11-20",
    theme: "Location",
    word: "SUBURB",
    characterCount: 6,
  },
  {
    date: "2024-11-21",
    theme: "Item",
    word: "SUV",
    characterCount: 3,
  },
  {
    date: "2024-11-22",
    theme: "Location",
    word: "SCHOOL",
    characterCount: 6,
  },
  {
    date: "2024-11-23",
    theme: "Character",
    word: "LINDA",
    characterCount: 5,
  },
  {
    date: "2024-11-24",
    theme: "Roger Persona",
    word: "JEANIE",
    characterCount: 6,
  },
  {
    date: "2024-11-25",
    theme: "Item",
    word: "FISH",
    characterCount: 4,
  },
  {
    date: "2024-11-26",
    theme: "Location",
    word: "MALL",
    characterCount: 4,
  },
  {
    date: "2024-11-27",
    theme: "Character",
    word: "REGINALD",
    characterCount: 8,
  },
  {
    date: "2024-11-28",
    theme: "Roger Persona",
    word: "WHEELS",
    characterCount: 6,
  },
  {
    date: "2024-11-29",
    theme: "Location",
    word: "GARAGE",
    characterCount: 6,
  },
  {
    date: "2024-11-30",
    theme: "Item",
    word: "BADGE",
    characterCount: 5,
  },
  {
    date: "2024-12-01",
    theme: "Location",
    word: "HOUSE",
    characterCount: 5,
  },
  {
    date: "2024-12-02",
    theme: "Character",
    word: "GREG",
    characterCount: 4,
  },
  {
    date: "2024-12-03",
    theme: "Roger Persona",
    word: "LEGMAN",
    characterCount: 6,
  },
  {
    date: "2024-12-04",
    theme: "Item",
    word: "WINE",
    characterCount: 4,
  },
  {
    date: "2024-12-05",
    theme: "Location",
    word: "SPACE",
    characterCount: 5,
  },
  {
    date: "2024-12-06",
    theme: "Roger Persona",
    word: "GENEVIEVE",
    characterCount: 9,
  },
  {
    date: "2024-12-07",
    theme: "Item",
    word: "GUN",
    characterCount: 3,
  },
  {
    date: "2024-12-08",
    theme: "Character",
    word: "LEWIS",
    characterCount: 5,
  },
  {
    date: "2024-12-09",
    theme: "Location",
    word: "SUBWAY",
    characterCount: 6,
  },
  {
    date: "2024-12-10",
    theme: "Roger Persona",
    word: "ROY",
    characterCount: 3,
  },
];

export const getWordForDate = (date) => {
  if (!date || !AMERICAN_DAD_WORDS || !Array.isArray(AMERICAN_DAD_WORDS)) {
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

  return AMERICAN_DAD_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!AMERICAN_DAD_WORDS || !Array.isArray(AMERICAN_DAD_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = AMERICAN_DAD_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
