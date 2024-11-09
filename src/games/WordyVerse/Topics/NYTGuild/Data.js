export const WORDS = [
    {
      date: '2024-11-23',
      theme: '',
      word: 'POLICY',
      characterCount: 6
    },
    {
      date: '2024-11-22',
      theme: '',
      word: 'BOYCOTT',
      characterCount: 7
    },
    {
      date: '2024-11-21',
      theme: '',
      word: 'WAGES',
      characterCount: 5
    },
    {
      date: '2024-11-20',
      theme: '',
      word: 'TERMS',
      characterCount: 5
    },
    {
      date: '2024-11-19',
      theme: '',
      word: 'FUNDS',
      characterCount: 5
    },
    {
      date: '2024-11-18',
      theme: 'An individual who is part of a labor union is a member of that union, ex: "they are a member of the Times Guild"',
      word: 'MEMBER',
      characterCount: 6
    },
    {
      date: '2024-11-17',
      theme: 'A group of workers who join together improve their employment conditions. The NY Times Guild and NY Time Tech Guild are unions',
      word: 'UNION',
      characterCount: 5
    },
    {
      date: '2024-11-16',
      theme: 'What employees give the employer in exchange for wages.',
      word: 'LABOR',
      characterCount: 5
    },
    {
      date: '2024-11-15',
      theme: 'Short for "picketing" an act where people congregate outside a workplace to form a picket line in form of protest',
      word: 'PICKET',
      characterCount: 6
    },
    {
      date: '2024-11-14',
      theme: 'Pay equity is one of the main issues the Times Guild is fighting for.',
      word: 'EQUITY',
      characterCount: 6
    },
    {
      date: '2024-11-13',
      theme: 'Employees have stronger negotiation power with unions',
      word: 'STRONG',
      characterCount: 6
    },
    {
      date: '2024-11-12',
      theme: 'The NYTimes Tech Guild has been bargaining for better working conditions for over two years',
      word: 'BARGAIN',
      characterCount: 7
    },
    {
      date: '2024-11-11',
      theme: 'The name of a "union rat" used as a symbol to call out employers who employe nonunion workers',
      word: 'SCABBY',
      characterCount: 6
    },
    {
      date: '2024-11-10',
      theme: 'Visit the NY Time Guild to find out why workers are striking against unfair labor practices.',
      word: 'UNFAIR',
      characterCount: 6
    },
    {
      date: '2024-11-09',
      theme: 'The name of the NYTimes union is the "Times Guild" which was started in 1940',
      word: 'GUILD',
      characterCount: 5
    },
    {
      date: '2024-11-08',
      theme: 'The NYTime Tech Guild strike began on Nov. 4th 2024',
      word: 'STRIKE',
      characterCount: 6
    }
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
