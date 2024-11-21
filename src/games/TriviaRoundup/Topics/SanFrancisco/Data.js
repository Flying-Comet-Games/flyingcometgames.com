export const SF_QUESTIONS = [
    {
      date: '2024-11-20',
      questions: [
        {
          question: "What iconic bridge is San Francisco famous for?",
          options: [
            "Golden Gate Bridge",
            "Bay Bridge",
            "Brooklyn Bridge",
            "London Bridge"
          ],
          correctAnswer: "Golden Gate Bridge",
          category: "Landmarks",
          difficulty: 1
        },
        {
          question: "Which famous prison is located in San Francisco Bay?",
          options: [
            "Alcatraz",
            "Sing Sing",
            "San Quentin",
            "Folsom"
          ],
          correctAnswer: "Alcatraz",
          category: "Landmarks",
          difficulty: 2
        },
        {
          question: "What mode of transportation is considered a symbol of San Francisco?",
          options: [
            "Cable Car",
            "Subway",
            "Horse Carriage",
            "Monorail"
          ],
          correctAnswer: "Cable Car",
          category: "Transportation",
          difficulty: 3
        },
        {
          question: "Which famous street in SF is known for its eight hairpin turns?",
          options: [
            "Lombard Street",
            "Market Street",
            "Castro Street",
            "Mission Street"
          ],
          correctAnswer: "Lombard Street",
          category: "Geography",
          difficulty: 4
        },
        {
          question: "What neighborhood is known as SF's oldest Chinatown?",
          options: [
            "Grant Avenue",
            "North Beach",
            "Mission District",
            "Hayes Valley"
          ],
          correctAnswer: "Grant Avenue",
          category: "Culture",
          difficulty: 5
        },
        {
          question: "In what year did the devastating San Francisco earthquake occur?",
          options: [
            "1906",
            "1889",
            "1915",
            "1923"
          ],
          correctAnswer: "1906",
          category: "History",
          difficulty: 6
        },
        {
          question: "Which SF neighborhood was the center of the 1960s counterculture movement?",
          options: [
            "Haight-Ashbury",
            "Pacific Heights",
            "Russian Hill",
            "Nob Hill"
          ],
          correctAnswer: "Haight-Ashbury",
          category: "History",
          difficulty: 7
        },
        {
          question: "What was the name of the indigenous people who first inhabited the SF peninsula?",
          options: [
            "Ohlone",
            "Miwok",
            "Pomo",
            "Yokuts"
          ],
          correctAnswer: "Ohlone",
          category: "History",
          difficulty: 8
        },
        {
          question: "Which architect designed the distinctive Transamerica Pyramid?",
          options: [
            "William Pereira",
            "Frank Lloyd Wright",
            "I.M. Pei",
            "Frank Gehry"
          ],
          correctAnswer: "William Pereira",
          category: "Architecture",
          difficulty: 9
        },
        {
          question: "What was the original name of San Francisco during Spanish colonization?",
          options: [
            "Yerba Buena",
            "San Pedro",
            "Mission Dolores",
            "Puerto Dorado"
          ],
          correctAnswer: "Yerba Buena",
          category: "History",
          difficulty: 10
        }
      ]
    }
  ];
  
  export const getQuestionsForDate = (date) => {
    if (!date || !SF_QUESTIONS) {
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
  
    const dayData = SF_QUESTIONS.find((entry) => entry.date === dateString);
    return dayData ? dayData.questions : null;
  };
  
  export const findLatestAvailableDate = () => {
    if (!SF_QUESTIONS) {
      return null;
    }
  
    // Get current date in PT
    const currentPTDate = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    );
    currentPTDate.setHours(0, 0, 0, 0);
  
    // Create dates in PT timezone and filter out future dates
    const sortedEntries = SF_QUESTIONS
      .map((entry) => ({
        date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
        original: entry,
      }))
      .filter((entry) => entry.date <= currentPTDate) // Filter out future dates
      .sort((a, b) => b.date - a.date);
  
    return sortedEntries[0]?.original;
  };