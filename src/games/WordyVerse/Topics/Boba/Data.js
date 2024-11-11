// Data.js
export const BOBA_WORDS = [
    {
      date: '2024-11-01',
      theme: 'Experience',
      word: 'FRESH',
      characterCount: 5
    },
    {
      date: '2024-11-02',
      theme: 'Topping',
      word: 'MOCHI',
      characterCount: 5
    },
    {
      date: '2024-11-03',
      theme: 'Tea',
      word: 'BREWED',
      characterCount: 6
    },
    {
      date: '2024-11-04',
      theme: 'Experience',
      word: 'BLEND',
      characterCount: 5
    },
    {
      date: '2024-11-05',
      theme: 'Experience',
      word: 'SPOON',
      characterCount: 5
    },
    {
      date: '2024-11-06',
      theme: 'Topping',
      word: 'AZUKI',
      characterCount: 5
    },
    {
      date: '2024-11-07',
      theme: 'Experience',
      word: 'PUREE',
      characterCount: 5
    },
    {
      date: '2024-11-08',
      theme: 'Tea',
      word: 'BLACK',
      characterCount: 5
    },
    {
      date: '2024-11-09',
      theme: 'Tea',
      word: 'OOLONG',
      characterCount: 6
    },
    {
      date: '2024-11-10',
      theme: 'Experience',
      word: 'SILKEN',
      characterCount: 6
    },
    {
      date: '2024-11-11',
      theme: 'Tea',
      word: 'GREEN',
      characterCount: 5
    },
    {
      date: '2024-11-12',
      theme: 'Tea',
      word: 'HERBAL',
      characterCount: 6
    },
    {
      date: '2024-11-13',
      theme: 'Flavor',
      word: 'MANGO',
      characterCount: 5
    },
    {
      date: '2024-11-14',
      theme: 'Experience',
      word: 'STRAW',
      characterCount: 5
    },
    {
      date: '2024-11-15',
      theme: 'Topping',
      word: 'PEARL',
      characterCount: 5
    },
    {
      date: '2024-11-16',
      theme: 'Tea',
      word: 'MATCHA',
      characterCount: 6
    },
    {
      date: '2024-11-17',
      theme: 'Flavor',
      word: 'FRUITY',
      characterCount: 6
    },
    {
      date: '2024-11-18',
      theme: 'Experience',
      word: 'CREAM',
      characterCount: 5
    },
    {
      date: '2024-11-19',
      theme: 'Experience',
      word: 'MILKY',
      characterCount: 5
    },
    {
      date: '2024-11-20',
      theme: 'Topping',
      word: 'CHEESE',
      characterCount: 6
    },
    {
      date: '2024-11-21',
      theme: 'Experience',
      word: 'CUPFUL',
      characterCount: 6
    },
    {
      date: '2024-11-22',
      theme: 'Topping',
      word: 'GRASS',
      characterCount: 5
    },
    {
      date: '2024-11-23',
      theme: 'Tea',
      word: 'FRUIT',
      characterCount: 5
    },
    {
      date: '2024-11-24',
      theme: 'Flavor',
      word: 'SYRUP',
      characterCount: 5
    },
    {
      date: '2024-11-25',
      theme: 'Experience',
      word: 'SWEET',
      characterCount: 5
    },
    {
      date: '2024-11-26',
      theme: 'Tea',
      word: 'ASSAM',
      characterCount: 5
    },
    {
      date: '2024-11-27',
      theme: 'Experience',
      word: 'INFUSE',
      characterCount: 6
    },
    {
      date: '2024-11-28',
      theme: 'Flavor',
      word: 'LYCHEE',
      characterCount: 6
    },
    {
      date: '2024-11-29',
      theme: 'Experience',
      word: 'LATTE',
      characterCount: 5
    },
    {
      date: '2024-11-30',
      theme: 'Topping',
      word: 'MOCHI',
      characterCount: 5
    },
    {
      date: '2024-12-01',
      theme: 'Topping',
      word: 'JELLY',
      characterCount: 5
    },
    {
      date: '2024-12-02',
      theme: 'Experience',
      word: 'SHAKER',
      characterCount: 6
    },
    {
      date: '2024-12-03',
      theme: 'Flavor',
      word: 'HONEY',
      characterCount: 5
    },
    {
      date: '2024-12-04',
      theme: 'Experience',
      word: 'CHEWY',
      characterCount: 5
    },
    {
      date: '2024-12-05',
      theme: 'Topping',
      word: 'FOAMY',
      characterCount: 5
    },
    {
      date: '2024-12-06',
      theme: 'Experience',
      word: 'SLUSH',
      characterCount: 5
    }
  ];
  
  export const getWordForDate = (date) => {
    if (!date || !BOBA_WORDS || !Array.isArray(BOBA_WORDS)) {
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
  
    return BOBA_WORDS.find((entry) => entry.date === dateString);
  };
  
  export const findLatestAvailableDate = () => {
    if (!BOBA_WORDS || !Array.isArray(BOBA_WORDS)) {
      return null;
    }
  
    // Get current date in PT
    const currentPTDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
    currentPTDate.setHours(0, 0, 0, 0);
  
    // Create dates in PT timezone and filter out future dates
    const sortedEntries = BOBA_WORDS.map((entry) => ({
      date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
      original: entry,
    }))
      .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
      .sort((a, b) => b.date - a.date);
  
    return sortedEntries[0]?.original;
  };
