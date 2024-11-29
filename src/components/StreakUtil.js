// Utility functions for managing game streaks
const STREAK_KEY = "wordyverse_streak";
const LAST_PLAY_KEY = "wordyverse_last_play";

export const getStreakFromStorage = () => {
  try {
    return {
      count: parseInt(localStorage.getItem(STREAK_KEY) || "0"),
      lastPlayDate: localStorage.getItem(LAST_PLAY_KEY),
    };
  } catch (e) {
    console.error("Error reading streak from storage:", e);
    return { count: 0, lastPlayDate: null };
  }
};

export const updateStreak = (currentDate) => {
  try {
    const { count, lastPlayDate } = getStreakFromStorage();
    const today = new Date(currentDate).toISOString().split("T")[0];

    // If this is their first play
    if (!lastPlayDate) {
      localStorage.setItem(STREAK_KEY, "1");
      localStorage.setItem(LAST_PLAY_KEY, today);
      return 1;
    }

    const lastPlay = new Date(lastPlayDate);
    const currentPlay = new Date(today);
    const diffDays = Math.floor(
      (currentPlay - lastPlay) / (1000 * 60 * 60 * 24)
    );

    // If played same day, maintain streak without increment
    if (diffDays === 0) {
      return count;
    }

    // If played consecutive day, increment streak
    if (diffDays === 1) {
      const newStreak = count + 1;
      localStorage.setItem(STREAK_KEY, newStreak.toString());
      localStorage.setItem(LAST_PLAY_KEY, today);
      return newStreak;
    }

    // If missed a day, reset streak
    if (diffDays > 1) {
      localStorage.setItem(STREAK_KEY, "1");
      localStorage.setItem(LAST_PLAY_KEY, today);
      return 1;
    }

    return count;
  } catch (e) {
    console.error("Error updating streak:", e);
    return 0;
  }
};
