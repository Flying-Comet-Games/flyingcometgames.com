import { getDataForDate, getPTDate } from "../utils/date";

export const TEMPUS_CONTENT = [
  {
    date: "2024-12-09",
    theme: "Pop Culture Mix",
    items: [
      {
        id: "mix-1",
        title: "The Legend of Zelda: Ocarina of Time",
        displayTitle: "The Legend of Zelda: Ocarina of Time",
        trailerTitle: "The Legend of Zelda: Ocarina of Time - Original Commercial",
        year: 1998,
        month: 11, // November
        youtubeId: "_NElFLzgdUs", // Original N64 commercial
        category: "Game",
        difficulty: 1
      },
      {
        id: "mix-2",
        title: "Blade Runner",
        displayTitle: "Blade Runner",
        year: 1982,
        month: 6, // June
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png",
        category: "Movie",
        difficulty: 2
      },
      {
        id: "mix-3",
        title: "Billie Jean",
        displayTitle: "Billie Jean - Michael Jackson",
        trailerTitle: "Billie Jean - Official Music Video",
        year: 1983,
        month: 1, // January
        youtubeId: "Zi_XLOBDo_Y",
        category: "Music",
        isBonus: true,
        difficulty: 3
      },
      {
        id: "mix-4",
        title: "The Godfather",
        displayTitle: "The Godfather",
        year: 1972,
        month: 3, // March
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
        category: "Movie",
        difficulty: 4
      },
      {
        id: "mix-5",
        title: "Grand Theft Auto: Vice City",
        displayTitle: "Grand Theft Auto: Vice City",
        trailerTitle: "Grand Theft Auto: Vice City - Launch Trailer",
        year: 2002,
        month: 10, // October
        youtubeId: "MpmDawqOfqs",
        category: "Game",
        difficulty: 5
      }
    ]
  }
];

// Get items for a specific date
export const getQuestionsForDate = (date) => {
  const dailyData = getDataForDate(date, TEMPUS_CONTENT);
  return {
    theme: dailyData?.theme,
    items: dailyData?.items || null
  };
};

// Get today's items (in PT)
export const getLatestItems = () => {
  return getQuestionsForDate(getPTDate());
};

export default TEMPUS_CONTENT;