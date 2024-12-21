export const generateRandomGrid = (gridSize) => {
  return Array(gridSize)
    .fill()
    .map(() =>
      Array(gridSize)
        .fill()
        .map(() => Math.floor(Math.random() * 5) + 1)
    );
};

export const resetSelection = (setSelectedTiles, setCurrentSum) => {
  setSelectedTiles([]);
  setCurrentSum(0);
};
