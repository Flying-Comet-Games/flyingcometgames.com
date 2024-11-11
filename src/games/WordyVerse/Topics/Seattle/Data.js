// Data.js
export const SEATTLE_WORDS = [
  {
    date: "2024-11-01",
    theme: "Feature",
    word: "SOUND",
    characterCount: 5,
  },
  {
    date: "2024-11-02",
    theme: "Name",
    word: "KERRY",
    characterCount: 5,
  },
  {
    date: "2024-11-03",
    theme: "Feature",
    word: "CREEK",
    characterCount: 5,
  },
  {
    date: "2024-11-04",
    theme: "Building",
    word: "TOWER",
    characterCount: 5,
  },
  {
    date: "2024-11-05",
    theme: "Name",
    word: "AURORA",
    characterCount: 6,
  },
  {
    date: "2024-11-06",
    theme: "Name",
    word: "EZELLS",
    characterCount: 6,
  },
  {
    date: "2024-11-07",
    theme: "Feature",
    word: "CANAL",
    characterCount: 5,
  },
  {
    date: "2024-11-08",
    theme: "Name",
    word: "YESLER",
    characterCount: 6,
  },
  {
    date: "2024-11-09",
    theme: "Other",
    word: "STORM",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Feature",
    word: "BRIDGE",
    characterCount: 6,
  },
  {
    date: "2024-11-11",
    theme: "Other",
    word: "TRAIN",
    characterCount: 5,
  },
  {
    date: "2024-11-12",
    theme: "Feature",
    word: "COAST",
    characterCount: 5,
  },
  {
    date: "2024-11-13",
    theme: "Feature",
    word: "TREES",
    characterCount: 5,
  },
  {
    date: "2024-11-14",
    theme: "Feature",
    word: "FERNS",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Name",
    word: "TAHOMA",
    characterCount: 6,
  },
  {
    date: "2024-11-16",
    theme: "Other",
    word: "SLOOP",
    characterCount: 5,
  },
  {
    date: "2024-11-17",
    theme: "Feature",
    word: "BASIN",
    characterCount: 5,
  },
  {
    date: "2024-11-18",
    theme: "Other",
    word: "MAPLE",
    characterCount: 5,
  },
  {
    date: "2024-11-19",
    theme: "Other",
    word: "GARDEN",
    characterCount: 6,
  },
  {
    date: "2024-11-20",
    theme: "Other",
    word: "TROLL",
    characterCount: 5,
  },
  {
    date: "2024-11-21",
    theme: "Name",
    word: "DICKS",
    characterCount: 5,
  },
  {
    date: "2024-11-22",
    theme: "Other",
    word: "FERRY",
    characterCount: 5,
  },
  {
    date: "2024-11-23",
    theme: "Other",
    word: "GORGE",
    characterCount: 5,
  },
  {
    date: "2024-11-24",
    theme: "Name",
    word: "TOPPOT",
    characterCount: 6,
  },
  {
    date: "2024-11-25",
    theme: "Name",
    word: "IVARS",
    characterCount: 5,
  },
  {
    date: "2024-11-26",
    theme: "Name",
    word: "DENNY",
    characterCount: 5,
  },
  {
    date: "2024-11-27",
    theme: "Name",
    word: "PUGET",
    characterCount: 5,
  },
  {
    date: "2024-11-28",
    theme: "Animal",
    word: "ORCAS",
    characterCount: 5,
  },
  {
    date: "2024-11-29",
    theme: "Other",
    word: "TRAIL",
    characterCount: 5,
  },
  {
    date: "2024-11-30",
    theme: "Name",
    word: "UNION",
    characterCount: 5,
  },
  {
    date: "2024-12-01",
    theme: "Name",
    word: "SMITH",
    characterCount: 5,
  },
  {
    date: "2024-12-02",
    theme: "Other",
    word: "CEDAR",
    characterCount: 5,
  },
  {
    date: "2024-12-03",
    theme: "Name",
    word: "SONICS",
    characterCount: 6,
  },
  {
    date: "2024-12-04",
    theme: "Feature",
    word: "RIVER",
    characterCount: 5,
  },
  {
    date: "2024-12-05",
    theme: "Feature",
    word: "HARBOR",
    characterCount: 6,
  },
  {
    date: "2024-12-06",
    theme: "Feature",
    word: "MOUNT",
    characterCount: 5,
  },
  {
    date: "2024-12-07",
    theme: "Other",
    word: "MURAL",
    characterCount: 5,
  },
  {
    date: "2024-12-08",
    theme: "Name",
    word: "SAFECO",
    characterCount: 6,
  },
  {
    date: "2024-12-09",
    theme: "Feature",
    word: "BEACH",
    characterCount: 5,
  },
  {
    date: "2024-12-10",
    theme: "Other",
    word: "WAVES",
    characterCount: 5,
  },
  {
    date: "2024-12-11",
    theme: "Feature",
    word: "SHORE",
    characterCount: 5,
  },
  {
    date: "2024-12-12",
    theme: "Animal",
    word: "EAGLE",
    characterCount: 5,
  },
  {
    date: "2024-12-13",
    theme: "Feature",
    word: "TRAIL",
    characterCount: 5,
  },
  {
    date: "2024-12-14",
    theme: "Feature",
    word: "VISTA",
    characterCount: 5,
  },
  {
    date: "2024-12-15",
    theme: "Feature",
    word: "BLUFF",
    characterCount: 5,
  },
  {
    date: "2024-12-16",
    theme: "Feature",
    word: "ISLAND",
    characterCount: 6,
  },
  {
    date: "2024-12-17",
    theme: "Name",
    word: "STONE",
    characterCount: 5,
  },
  {
    date: "2024-12-18",
    theme: "Name",
    word: "BEACON",
    characterCount: 6,
  },
];

export const getWordForDate = (date) => {
  if (!date || !SEATTLE_WORDS || !Array.isArray(SEATTLE_WORDS)) {
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

  return SEATTLE_WORDS.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!SEATTLE_WORDS || !Array.isArray(SEATTLE_WORDS)) {
    return null;
  }

  // Get current date in PT
  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  // Create dates in PT timezone and filter out future dates
  const sortedEntries = SEATTLE_WORDS.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};
