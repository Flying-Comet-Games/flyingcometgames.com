export const ACCOUNTING_WORDS = [
    {
      date: '2024-11-01',
      theme: 'Managerial',
      word: 'FISCAL',
      characterCount: 6
    },
    {
      date: '2024-11-02',
      theme: 'Managerial',
      word: 'FOURTH',
      characterCount: 6
    },
    {
      date: '2024-11-02',
      theme: 'Acronym',
      word: 'COGS',
      characterCount: 4
    },
    {
      date: '2024-11-03',
      theme: 'Excel',
      word: 'VLOOKUP',
      characterCount: 7
    },
    {
      date: '2024-11-04',
      theme: 'Accounting 101',
      word: 'BALLOON',
      characterCount: 7
    },
    {
      date: '2024-10-05',
      theme: 'Tax',
      word: 'ACCRUAL',
      characterCount: 7
    },
    {
      date: '2024-10-06',
      theme: 'Investing',
      word: 'CAPTABLE',
      characterCount: 8
    },
    {
      date: '2024-10-07',
      theme: 'Accounting 101',
      word: 'CREDIT',
      characterCount: 6
    },
    {
      date: '2024-10-08',
      theme: 'Managerial',
      word: 'EBITDA',
      characterCount: 6
    },
    {
      date: '2024-10-09',
      theme: 'Accounting 101',
      word: 'OPEX',
      characterCount: 4
    },
    {
      date: '2024-10-10',
      theme: 'Tax',
      word: 'GAAP',
      characterCount: 4
    },
    {
      date: '2024-10-11',
      theme: 'Investing',
      word: 'INVESTOR',
      characterCount: 8
    },
    {
      date: '2024-10-12',
      theme: 'Investing',
      word: 'ANALYST',
      characterCount: 7
    },
    {
      date: '2024-10-13',
      theme: 'Managerial',
      word: 'PROFORMA',
      characterCount: 8
    },
    {
      date: '2024-10-14',
      theme: 'Accounting 101',
      word: 'INTEREST',
      characterCount: 8
    },
    {
      date: '2024-10-15',
      theme: 'Excel',
      word: 'HLOOKUP',
      characterCount: 7
    },
    {
      date: '2024-10-16',
      theme: 'Managerial',
      word: 'MODEL',
      characterCount: 5
    },
    {
      date: '2024-10-17',
      theme: 'Excel',
      word: 'GOALSEEK',
      characterCount: 8
    },
    {
      date: '2024-10-18',
      theme: 'Accounting 101',
      word: 'EQUITY',
      characterCount: 6
    },
    {
      date: '2024-10-19',
      theme: 'Managerial',
      word: 'RECOUP',
      characterCount: 6
    },
    {
      date: '2024-10-20',
      theme: 'Accounting 101',
      word: 'GROSS',
      characterCount: 5
    },
    {
      date: '2024-10-21',
      theme: 'Investing',
      word: 'MARKET',
      characterCount: 6
    },
    {
      date: '2024-10-22',
      theme: 'Accounting 101',
      word: 'MARGIN',
      characterCount: 6
    },
    {
      date: '2024-10-23',
      theme: 'Accounting 101',
      word: 'ASSETS',
      characterCount: 6
    },
    {
      date: '2024-10-24',
      theme: 'Accounting 101',
      word: 'LIABILITY',
      characterCount: 9
    },
    {
      date: '2024-10-25',
      theme: 'Accounting 101',
      word: 'BADDEBT',
      characterCount: 7
    },
    {
      date: '2024-10-26',
      theme: 'Managerial',
      word: 'FCF',
      characterCount: 3
    },
    {
      date: '2024-10-27',
      theme: 'Managerial',
      word: 'CAPITAL',
      characterCount: 7
    },
    {
      date: '2024-10-28',
      theme: 'Investing',
      word: 'EARNINGS',
      characterCount: 8
    },
    {
      date: '2024-10-29',
      theme: 'Excel',
      word: 'SUMIF',
      characterCount: 5
    },
    {
      date: '2024-10-30',
      theme: 'Tax',
      word: 'REFUND',
      characterCount: 6
    },
    {
      date: '2024-10-31',
      theme: 'Accounting 101',
      word: 'VARIABLE',
      characterCount: 8
    }
  ];
  
  export const getWordForDate = (date) => {
    // Convert to PT/Los Angeles timezone
    const ptDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));

    // Format the PT date as YYYY-MM-DD
    const dateString = ptDate.getFullYear() + '-' +
      String(ptDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(ptDate.getDate()).padStart(2, '0');

    return ACCOUNTING_WORDS.find(entry => entry.date === dateString) || ACCOUNTING_WORDS[0];
  };