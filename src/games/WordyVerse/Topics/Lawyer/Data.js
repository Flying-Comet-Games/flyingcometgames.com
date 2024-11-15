export const WORDS = [
  {
    date: "2024-11-30",
    theme: "A group bound by agreement or contract",
    word: "COVEN",
    characterCount: 5,
  },
  {
    date: "2024-11-29",
    theme: "One who acts on behalf of another",
    word: "AGENT",
    characterCount: 5,
  },
  {
    date: "2024-11-28",
    theme: "Not criminal law",
    word: "CIVIL",
    characterCount: 5,
  },
  {
    date: "2024-11-27",
    theme: "To protect against loss or damage",
    word: "INDEMN",
    characterCount: 6,
  },
  {
    date: "2024-11-26",
    theme: "To keep count or record",
    word: "TALLY",
    characterCount: 5,
  },
  {
    date: "2024-11-25",
    theme: "Protection or refuge status",
    word: "ASYLUM",
    characterCount: 6,
  },
  {
    date: "2024-11-24",
    theme: "A demand for something owed",
    word: "CLAIM",
    characterCount: 5,
  },
  {
    date: "2024-11-23",
    theme: "Person represented by a lawyer",
    word: "CLIENT",
    characterCount: 6,
  },
  {
    date: "2024-11-22",
    theme: "Violation of contract terms",
    word: "BREACH",
    characterCount: 6,
  },
  {
    date: "2024-11-21",
    theme: "Expiration of time period",
    word: "LAPSE",
    characterCount: 5,
  },
  {
    date: "2024-11-20",
    theme: "To make formal court statements",
    word: "PLEAD",
    characterCount: 5,
  },
  {
    date: "2024-11-19",
    theme: "Current legal position",
    word: "STATUS",
    characterCount: 6,
  },
  {
    date: "2024-11-18",
    theme: "Calendar of court cases",
    word: "DOCKET",
    characterCount: 6,
  },
  {
    date: "2024-11-17",
    theme: "Fiduciary relationship",
    word: "TRUST",
    characterCount: 5,
  },
  {
    date: "2024-11-16",
    theme: "Civil wrongs in law",
    word: "TORTS",
    characterCount: 5,
  },
  {
    date: "2024-11-15",
    theme: "Against principles of justice",
    word: "UNFAIR",
    characterCount: 6,
  },
  {
    date: "2024-11-14",
    theme: "Written legal argument",
    word: "BRIEF",
    characterCount: 5,
  },
  {
    date: "2024-11-13",
    theme: "To take into custody",
    word: "ARREST",
    characterCount: 6,
  },
  {
    date: "2024-11-12",
    theme: "Federal IP office abbreviation",
    word: "USPTO",
    characterCount: 5,
  },
  {
    date: "2024-11-11",
    theme: "Court's formal command",
    word: "ORDER",
    characterCount: 5,
  },
  {
    date: "2024-11-10",
    theme: "Free from obligation",
    word: "EXEMPT",
    characterCount: 6,
  },
  {
    date: "2024-11-09",
    theme: "Group lawsuit category",
    word: "CLASS",
    characterCount: 5,
  },
  {
    date: "2024-11-08",
    theme: "Dispute resolution outside court",
    word: "ARBIT",
    characterCount: 5,
  },
  {
    date: "2024-11-07",
    theme: "Formal legal judgment",
    word: "DECREE",
    characterCount: 6,
  },
  {
    date: "2024-11-06",
    theme: "Sworn written statement",
    word: "AFFID",
    characterCount: 5,
  },
  {
    date: "2024-11-05",
    theme: "Speedy legal process",
    word: "QUICK",
    characterCount: 5,
  },
  {
    date: "2024-11-04",
    theme: "Legal demand or right",
    word: "CLAIM",
    characterCount: 5,
  },
  {
    date: "2024-11-03",
    theme: "To take effect or benefit",
    word: "INURE",
    characterCount: 5,
  },
  {
    date: "2024-11-02",
    theme: "Legal remedy or assistance",
    word: "RELIEF",
    characterCount: 6,
  },
  {
    date: "2024-11-01",
    theme: "Property or valuable item",
    word: "ASSET",
    characterCount: 5,
  },
  {
    date: "2024-10-31",
    theme: "Property after death",
    word: "ESTATE",
    characterCount: 6,
  },
  {
    date: "2024-10-30",
    theme: "Intentional deception",
    word: "FRAUD",
    characterCount: 5,
  },
  {
    date: "2024-10-29",
    theme: "To legally bestow or give",
    word: "GRANT",
    characterCount: 5,
  },
  {
    date: "2024-10-28",
    theme: "Official document witness",
    word: "NOTARY",
    characterCount: 6,
  },
  {
    date: "2024-10-27",
    theme: "Open to all citizens",
    word: "PUBLIC",
    characterCount: 6,
  },
  {
    date: "2024-10-26",
    theme: "First impression in Latin",
    word: "PRIMA",
    characterCount: 5,
  },
  {
    date: "2024-10-25",
    theme: "Legal entitlement",
    word: "RIGHT",
    characterCount: 5,
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
