// Data.js
export const FRIENDS_WORDS = [
    {
      date: '2024-11-23',
      theme: 'Name',
      word: 'HUGSY',
      characterCount: 5
    },
    {
      date: '2024-11-22',
      theme: 'Iconic',
      word: 'WENUS',
      characterCount: 5
    },
    {
      date: '2024-11-21',
      theme: 'Iconic',
      word: 'SCONES',
      characterCount: 6
    },
    {
      date: '2024-11-20',
      theme: 'Name',
      word: 'TULIP',
      characterCount: 5
    },
    {
      date: '2024-11-19',
      theme: 'Iconic',
      word: 'THEONE',
      characterCount: 6
    },
    {
      date: '2024-11-18',
      theme: 'Iconic',
      word: 'SMELLY',
      characterCount: 6
    },
    {
      date: '2024-11-17',
      theme: 'Name',
      word: 'MONICA',
      characterCount: 6
    },
    {
      date: '2024-11-16',
      theme: 'Iconic',
      word: 'PIVOT',
      characterCount: 5
    },
    {
      date: '2024-11-15',
      theme: 'Name',
      word: 'PHOEBE',
      characterCount: 6
    },
    {
      date: '2024-11-14',
      theme: 'NYC Life',
      word: 'TAXIS',
      characterCount: 5
    },
    {
      date: '2024-11-13',
      theme: 'Name',
      word: 'ROSITA',
      characterCount: 6
    },
    {
      date: '2024-11-12',
      theme: 'Food',
      word: 'TURKEY',
      characterCount: 6
    },
    {
      date: '2024-11-11',
      theme: 'Iconic',
      word: 'LOVEIT',
      characterCount: 6
    },
    {
      date: '2024-11-10',
      theme: 'Name',
      word: 'MARCEL',
      characterCount: 6
    },
    {
      date: '2024-11-09',
      theme: 'Iconic',
      word: 'TRIVIA',
      characterCount: 6
    },
    {
      date: '2024-11-08',
      theme: 'Iconic',
      word: 'COUCH',
      characterCount: 5
    },
    {
      date: '2024-11-07',
      theme: 'Name',
      word: 'JANICE',
      characterCount: 6
    },
    {
      date: '2024-11-06',
      theme: 'NYC Life',
      word: 'STATUE',
      characterCount: 6
    },
    {
      date: '2024-11-05',
      theme: 'Iconic',
      word: 'TWINS',
      characterCount: 5
    },
    {
      date: '2024-11-04',
      theme: 'Name',
      word: 'RACHEL',
      characterCount: 6
    },
    {
      date: '2024-11-03',
      theme: 'Name',
      word: 'MARCEL',
      characterCount: 6
    },
    {
      date: '2024-11-02',
      theme: 'Iconic',
      word: 'VEGAS',
      characterCount: 5
    },
    {
      date: '2024-11-01',
      theme: 'Name',
      word: 'EMILY',
      characterCount: 5
    }
  ];
  
  export const getWordForDate = (date) => {
    if (!date || !FRIENDS_WORDS || !Array.isArray(FRIENDS_WORDS)) {
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
  
    return FRIENDS_WORDS.find((entry) => entry.date === dateString);
  };
  
  export const findLatestAvailableDate = () => {
    if (!FRIENDS_WORDS || !Array.isArray(FRIENDS_WORDS)) {
      return null;
    }
  
    // Get current date in PT
    const currentPTDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
    currentPTDate.setHours(0, 0, 0, 0);
  
    // Create dates in PT timezone and filter out future dates
    const sortedEntries = FRIENDS_WORDS.map((entry) => ({
      date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
      original: entry,
    }))
      .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
      .sort((a, b) => b.date - a.date);
  
    return sortedEntries[0]?.original;
  };