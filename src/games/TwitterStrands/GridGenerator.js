import Queue from 'queue-fifo';

const GRID_ROWS = 8;
const GRID_COLS = 6;
const MAX_ATTEMPTS = 10000;
const TIME_LIMIT = 15000; // 15 seconds

const GridGenerator = ({ themeWords }) => {
  const validateInput = () => {
    if (!themeWords || !Array.isArray(themeWords) || themeWords.length === 0) {
      throw new Error('Invalid input: themeWords must be a non-empty array of strings');
    }
    const totalLetters = themeWords.join('').length;
    if (totalLetters !== GRID_ROWS * GRID_COLS) {
      throw new Error(`Invalid input: total letters must be ${GRID_ROWS * GRID_COLS}, but got ${totalLetters}`);
    }
  };

  const createGrid = () => Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(null));

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const directions = [
    [0, 1], [1, 0], [1, 1], [-1, 1],
    [0, -1], [-1, 0], [-1, -1], [1, -1]
  ];

  const isValidPlacement = (grid, row, col) => {
    return row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS && grid[row][col] === null;
  };

  const hasSufficientSpace = (grid, wordLength) => {
    const freeCells = grid.reduce((acc, row) => acc + row.filter(cell => cell === null).length, 0);
    return freeCells >= wordLength;
  };
  const doesPathCross = (grid, path, usedCells) => {
    for (let { r, c } of path) {
      if (grid[r][c] !== null || usedCells.has(`${r},${c}`)) {
        return true; // Path intersects or touches another word
      }
      // Check adjacent cells to prevent touching paths
      for (const [dx, dy] of directions) {
        const adjRow = r + dx;
        const adjCol = c + dy;
        if (adjRow >= 0 && adjRow < GRID_ROWS && adjCol >= 0 && adjCol < GRID_COLS) {
          if (usedCells.has(`${adjRow},${adjCol}`)) {
            return true; // Path touches another path
          }
        }
      }
    }
    return false; // No crossing or touching
  };

  const placeWordBFS = (grid, word, failedPlacements, wordPaths, usedCells) => {
    const queue = new Queue();
    const visited = new Set(); // Initialize visited as a Set

    // Ensure usedCells is initialized properly before use
    if (!usedCells) {
      usedCells = new Set();
    }

    shuffleArray(directions);

    if (!hasSufficientSpace(grid, word.length)) {
      return false;
    }

    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (grid[row][col] === null && !failedPlacements.has(`${row},${col}`)) {
          queue.enqueue({ row, col, path: [], used: new Set() });
        }
      }
    }

    while (!queue.isEmpty()) {
      const { row, col, path, used } = queue.dequeue();
      const key = `${row},${col},${path.length}`;

      if (visited.has(key)) continue;
      visited.add(key);

      if (path.length === word.length) {
        if (!doesPathCross(grid, path, usedCells)) {
          path.forEach(({ r, c }, index) => {
            grid[r][c] = word[index];
            usedCells.add(`${r},${c}`); // Ensure usedCells is properly tracked
          });
          wordPaths.push({ word, path });
          return true;
        }
      }

      shuffleArray(directions);
      for (const [dx, dy] of directions) {
        const nextRow = row + dx;
        const nextCol = col + dy;
        const cellKey = `${nextRow},${nextCol}`;

        if (isValidPlacement(grid, nextRow, nextCol) && !used.has(cellKey)) {
          const newPath = [...path, { r: nextRow, c: nextCol }];
          const newUsed = new Set(used);
          newUsed.add(cellKey);
          queue.enqueue({ row: nextRow, col: nextCol, path: newPath, used: newUsed });
        }
      }
    }

    return false;
  };

  const backtrack = (grid, wordPaths) => {
    const lastPlacement = wordPaths.pop();
    if (lastPlacement) {
      lastPlacement.path.forEach(({ r, c }) => {
        grid[r][c] = null;
      });
    }
    return lastPlacement;
  };

  // Solvability check function
  const isGridSolvable = (grid, themeWords) => {
    // Implement your checking logic here
    // This could involve redoing BFS or DFS to make sure every word can be found
    return true; // Placeholder: you can implement the logic to actually validate solvability
  };

  const generateGrid = () => {
    validateInput();

    const sortedWords = [...themeWords].sort((a, b) => b.length - a.length);
    const grid = createGrid();
    const wordPaths = [];
    const failedPlacements = new Set();
    let success = true;

    for (const word of sortedWords) {
      const wordPlaced = placeWordBFS(grid, word, failedPlacements, wordPaths);
      if (!wordPlaced) {
        success = false;
        backtrack(grid, wordPaths);
        break;
      }
    }

    return success && isGridSolvable(grid, themeWords) ? grid : null;
  };

  const startTime = Date.now();
  let attempts = 0;

  while (Date.now() - startTime < TIME_LIMIT && attempts < MAX_ATTEMPTS) {
    attempts++;
    const grid = generateGrid();
    if (grid) {
      return grid;
    }
  }

  throw new Error('Failed to generate grid within time/attempt limit');
};

export default GridGenerator;