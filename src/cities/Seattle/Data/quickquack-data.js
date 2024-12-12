const SEATTLE_PHRASES = [
  {
    date: "2024-12-12",
    phrase: "SPACE NEEDLE",
    category: "Landmarks",
  },
  {
    date: "2024-12-13",
    phrase: "PIKE PLACE MARKET",
    category: "Attractions",
  },
  {
    date: "2024-12-14",
    phrase: "EMERALD CITY",
    category: "Nicknames",
  },
  {
    date: "2024-12-15",
    phrase: "MOUNT RAINIER",
    category: "Geography",
  },
  {
    date: "2024-12-16",
    phrase: "COFFEE CULTURE",
    category: "Local Life",
  }
];

export const getPhraseForDate = (date) => {
  if (!date || !SEATTLE_PHRASES || !Array.isArray(SEATTLE_PHRASES)) {
    return null;
  }

  const ptDate = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );

  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );

  currentPTDate.setHours(0, 0, 0, 0);
  ptDate.setHours(0, 0, 0, 0);

  if (ptDate > currentPTDate) {
    return null;
  }

  const dateString =
    ptDate.getFullYear() +
    "-" +
    String(ptDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(ptDate.getDate()).padStart(2, "0");

  return SEATTLE_PHRASES.find((entry) => entry.date === dateString);
};

export const findLatestAvailableDate = () => {
  if (!SEATTLE_PHRASES || !Array.isArray(SEATTLE_PHRASES)) {
    return null;
  }

  const currentPTDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  currentPTDate.setHours(0, 0, 0, 0);

  const sortedEntries = SEATTLE_PHRASES.map((entry) => ({
    date: new Date(entry.date + "T00:00:00-08:00"),
    original: entry,
  }))
    .filter((entry) => entry.date <= currentPTDate)
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};

export default SEATTLE_PHRASES;