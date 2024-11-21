// utils/date.js - Core date manipulation functions

/**
 * Converts a date to PT/Los Angeles timezone and returns it as a Date object
 * with time components zeroed out for date comparison
 */
export const getPTDate = (date = new Date()) => {
  const ptDateString = date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const ptDate = new Date(ptDateString);
  ptDate.setHours(0, 0, 0, 0);
  return ptDate;
};

/**
 * Formats a date as YYYY-MM-DD in PT timezone
 */
export const formatPTDateString = (date) => {
  const ptDate = getPTDate(date);
  console.log("formatPTDateString");
  console.log(ptDate);
  return (
    ptDate.getFullYear() +
    "-" +
    String(ptDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(ptDate.getDate()).padStart(2, "0")
  );
};

/**
 * Generic function to get data for a specific date from a dataset
 */
export const getDataForDate = (date, dataset) => {
  console.log("getDataForDate");
  console.log(date);
  console.log(dataset);
  if (!date || !dataset || !Array.isArray(dataset)) {
    return null;
  }

  console.log(date);
  const dateString = formatPTDateString(date);
  console.log(dateString);
  return dataset.find((entry) => entry.date === dateString);
};

/**
 * Generic function to find the latest available date's data
 */
export const findLatestAvailableData = (dataset) => {
  if (!dataset || !Array.isArray(dataset)) {
    return null;
  }

  const currentPTDate = getPTDate();

  const sortedEntries = dataset
    .map((entry) => ({
      date: new Date(entry.date + "T00:00:00-08:00"), // Force PT timezone
      original: entry,
    }))
    .filter((entry) => entry.date <= currentPTDate)
    .sort((a, b) => b.date - a.date);

  return sortedEntries[0]?.original;
};