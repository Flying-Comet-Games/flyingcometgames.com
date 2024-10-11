import Queue from 'queue-fifo';

const GRID_ROWS = 8;
const GRID_COLS = 6;
const MAX_ATTEMPTS = 3000;
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

  // Directions array to ensure all possible movements
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

  // Function to check if a word crosses another word
  const doesPathCross = (grid, path) => {
    for (let { r, c } of path) {
      if (grid[r][c] !== null) {
        return true;  // A cross detected
      }
    }
    return false;  // No cross detected
  };

  const placeWordBFS = (grid, word, failedPlacements, wordPaths) => {
    const queue = new Queue();
    const visited = new Set();

    shuffleArray(directions);
    console.log(`Attempting to place word: ${word}`);

    if (!hasSufficientSpace(grid, word.length)) {
      console.log(`Not enough space to place word: ${word}`);
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
        // Check if the path crosses any other word
        if (!doesPathCross(grid, path)) {
          // If no crossing, place the word
          path.forEach(({ r, c }, index) => {
            grid[r][c] = word[index];
          });
          wordPaths.push({ word, path });
          console.log(`Successfully placed word: ${word}`);
          return true;
        } else {
          console.log(`Word path crosses another: ${word}`);
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

    console.log(`Failed to place word: ${word}`);
    return false;
  };

  const backtrack = (grid, wordPaths) => {
    const lastPlacement = wordPaths.pop();
    if (lastPlacement) {
      console.log(`Backtracking on word: ${lastPlacement.word}`);
      lastPlacement.path.forEach(({ r, c }) => {
        grid[r][c] = null;
      });
    }
    return lastPlacement;
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

    return success ? grid : null;
  };

  const startTime = Date.now();
  let attempts = 0;

  while (Date.now() - startTime < TIME_LIMIT && attempts < MAX_ATTEMPTS) {
    attempts++;
    console.log(`Grid generation attempt: ${attempts}`);
    const grid = generateGrid();
    if (grid) {
      console.log(`Grid successfully generated on attempt ${attempts}`);
      return grid;
    }
  }

  console.error('Failed to generate grid within time/attempt limit');
  throw new Error('Failed to generate grid within time/attempt limit');
};

export default GridGenerator;