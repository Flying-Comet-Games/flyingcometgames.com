import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  ThemeProvider, 
  createTheme,
  useMediaQuery
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3d805a',
    },
    secondary: {
      main: '#98d9c1',
    },
    background: {
      default: '#f0f5f0',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
});

const GRID_SIZE = 5;
const ELEMENTS = ['🪨', '🌿', '🍁', '🏮'];

const CHALLENGES = [
  {
    name: "Element Equality",
    description: "Place exactly 5 of each element (🪨, 🌿, 🍁, 🏮). No two identical elements can be adjacent (including diagonally).",
    check: (garden) => {
      const counts = { '🪨': 0, '🌿': 0, '🍁': 0, '🏮': 0 };
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const element = garden[i][j];
          if (element === '') return false;
          counts[element]++;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              const ni = i + di, nj = j + dj;
              if (ni >= 0 && ni < GRID_SIZE && nj >= 0 && nj < GRID_SIZE && garden[ni][nj] === element) {
                return false;
              }
            }
          }
        }
      }
      return Object.values(counts).every(count => count === 5);
    }
  },
  {
    name: "Diagonal Divide",
    description: "Create a diagonal line of rocks (🪨) from top-left to bottom-right. Fill one side of the diagonal with plants (🌿) and the other with maple leaves (🍁). Place exactly 3 lanterns (🏮) anywhere on the grid.",
    check: (garden) => {
      let rockDiagonal = true;
      let plantSide = 0;
      let leafSide = 0;
      let lanternCount = 0;

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (i === j && garden[i][j] !== '🪨') rockDiagonal = false;
          if (i < j && garden[i][j] !== '🌿') plantSide++;
          if (i > j && garden[i][j] !== '🍁') leafSide++;
          if (garden[i][j] === '🏮') lanternCount++;
        }
      }

      return rockDiagonal && plantSide === 0 && leafSide === 0 && lanternCount === 3;
    }
  },
  {
    name: "Spiral Sequence",
    description: "Starting from the center, create a clockwise spiral using the sequence: 🏮, 🪨, 🌿, 🍁. Repeat this sequence until the entire grid is filled.",
    check: (garden) => {
      const spiral = [
        [2,2], [2,3], [3,3], [3,2], [3,1], [2,1], [1,1], [1,2], [1,3],
        [1,4], [2,4], [3,4], [4,4], [4,3], [4,2], [4,1], [4,0], [3,0],
        [2,0], [1,0], [0,0], [0,1], [0,2], [0,3], [0,4]
      ];
      const sequence = ['🏮', '🪨', '🌿', '🍁'];
      return spiral.every(([x, y], index) => garden[x][y] === sequence[index % 4]);
    }
  },
  {
    name: "Checkered Challenge",
    description: "Create a checkered pattern using rocks (🪨) and plants (🌿). In the remaining squares, place 5 maple leaves (🍁) and 5 lanterns (🏮) so that no two of the same are adjacent (including diagonally).",
    check: (garden) => {
      let mapleCount = 0;
      let lanternCount = 0;
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if ((i + j) % 2 === 0 && garden[i][j] !== '🪨') return false;
          if ((i + j) % 2 === 1 && garden[i][j] !== '🌿') return false;
          if (garden[i][j] === '🍁') mapleCount++;
          if (garden[i][j] === '🏮') lanternCount++;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              const ni = i + di, nj = j + dj;
              if (ni >= 0 && ni < GRID_SIZE && nj >= 0 && nj < GRID_SIZE) {
                if (garden[i][j] === garden[ni][nj] && (garden[i][j] === '🍁' || garden[i][j] === '🏮')) {
                  return false;
                }
              }
            }
          }
        }
      }
      return mapleCount === 5 && lanternCount === 5;
    }
  },
  {
    name: "Symmetry Master",
    description: "Create a garden that is symmetrical both vertically and horizontally. Use at least one of each element type.",
    check: (garden) => {
      const elementSet = new Set();
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          elementSet.add(garden[i][j]);
          if (garden[i][j] !== garden[4-i][j] || garden[i][j] !== garden[i][4-j]) {
            return false;
          }
        }
      }
      return elementSet.size === 4;
    }
  },
  {
    name: "Fibonacci Garden",
    description: "Create a garden where the number of each element follows the Fibonacci sequence (1, 1, 2, 3, 5). Use 🪨 for 1, 🌿 for 1, 🍁 for 2, 🏮 for 3, and any element for the remaining 5.",
    check: (garden) => {
      const counts = { '🪨': 0, '🌿': 0, '🍁': 0, '🏮': 0 };
      garden.flat().forEach(element => counts[element]++);
      return counts['🪨'] === 1 && counts['🌿'] === 1 && counts['🍁'] === 2 && counts['🏮'] === 3;
    }
  },
  {
    name: "Element Isolation",
    description: "Place exactly 4 of each element. No element should be adjacent to another of its kind (including diagonally).",
    check: (garden) => {
      const counts = { '🪨': 0, '🌿': 0, '🍁': 0, '🏮': 0 };
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          const element = garden[i][j];
          if (element === '') return false;
          counts[element]++;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              const ni = i + di, nj = j + dj;
              if (ni >= 0 && ni < GRID_SIZE && nj >= 0 && nj < GRID_SIZE && garden[ni][nj] === element) {
                return false;
              }
            }
          }
        }
      }
      return Object.values(counts).every(count => count === 4);
    }
  },
  {
    name: "Diamond Pattern",
    description: "Create a diamond shape in the center using rocks (🪨). Fill the corners with plants (🌿). Place maple leaves (🍁) and lanterns (🏮) in the remaining spaces, using at least 3 of each.",
    check: (garden) => {
      const diamond = [[0,2], [1,1], [1,2], [1,3], [2,0], [2,1], [2,2], [2,3], [2,4], [3,1], [3,2], [3,3], [4,2]];
      const corners = [[0,0], [0,4], [4,0], [4,4]];
      let mapleCount = 0, lanternCount = 0;

      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          if (diamond.some(([x, y]) => x === i && y === j) && garden[i][j] !== '🪨') return false;
          if (corners.some(([x, y]) => x === i && y === j) && garden[i][j] !== '🌿') return false;
          if (garden[i][j] === '🍁') mapleCount++;
          if (garden[i][j] === '🏮') lanternCount++;
        }
      }
      return mapleCount >= 3 && lanternCount >= 3;
    }
  },
  {
    name: "Alternating Rows",
    description: "Create a garden where each row alternates between two elements. The first row should use rocks (🪨) and plants (🌿), the second row maple leaves (🍁) and lanterns (🏮), and so on.",
    check: (garden) => {
      const patterns = [
        ['🪨', '🌿'],
        ['🍁', '🏮'],
        ['🪨', '🌿'],
        ['🍁', '🏮'],
        ['🪨', '🌿']
      ];
      return garden.every((row, i) =>
        row.every((cell, j) => patterns[i].includes(cell))
      );
    }
  },
  {
    name: "Prime Number Plaza",
    description: "Place elements so that the count of each type is a prime number. Use at least 3 different elements.",
    check: (garden) => {
      const counts = { '🪨': 0, '🌿': 0, '🍁': 0, '🏮': 0 };
      garden.flat().forEach(element => counts[element]++);
      const isPrime = num => {
        for(let i = 2, s = Math.sqrt(num); i <= s; i++)
          if(num % i === 0) return false;
        return num > 1;
      };
      const primeCount = Object.values(counts).filter(count => isPrime(count)).length;
      const usedElements = Object.values(counts).filter(count => count > 0).length;
      return primeCount === usedElements && usedElements >= 3;
    }
  }
];

const GardenPuzzleGame = () => {
  const [garden, setGarden] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));
  const [selectedElement, setSelectedElement] = useState(ELEMENTS[0]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState('');

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCellClick = (row, col) => {
    const newGarden = [...garden];
    if (newGarden[row][col] === selectedElement) {
      newGarden[row][col] = '';
    } else {
      newGarden[row][col] = selectedElement;
    }
    setGarden(newGarden);
  };

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleClear = () => {
    setGarden(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));
    setChallengeStatus('');
  };

  const setNextChallenge = () => {
    setCurrentChallengeIndex((prevIndex) => (prevIndex + 1) % CHALLENGES.length);
    handleClear();
  };

  const checkSolution = () => {
    if (CHALLENGES[currentChallengeIndex].check(garden)) {
      setChallengeStatus("Congratulations! You've solved the puzzle! 🎉");
    } else {
      setChallengeStatus("Not quite right. Keep trying!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}>
        <Paper elevation={3} sx={{ p: 2, width: '100%', maxWidth: 500 }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontSize: isMobile ? '1.5rem' : '2.125rem' }}>
            Garden Puzzle Game
          </Typography>

          <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
              {CHALLENGES[currentChallengeIndex].name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {CHALLENGES[currentChallengeIndex].description}
            </Typography>
            <Typography variant="body2" color={challengeStatus.includes('Congratulations') ? 'success.main' : 'error.main'}>
              {challengeStatus}
            </Typography>
          </Paper>

          <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
            {ELEMENTS.map((element) => (
              <Grid item key={element}>
                <Button
                  variant={selectedElement === element ? 'contained' : 'outlined'}
                  onClick={() => handleElementSelect(element)}
                  sx={{ minWidth: 0, width: 40, height: 40, p: 0 }}
                >
                  {element}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Box sx={{
            width: '100%',
            pb: '100%',
            position: 'relative',
            mb: 2
          }}>
            <Grid
              container
              spacing={1}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                width: '100%',
                height: '100%',
              }}
            >
              {garden.map((row, i) =>
                row.map((cell, j) => (
                  <Grid item xs={12/5} key={`${i}-${j}`} sx={{
                    height: '20%',
                    padding: '1%' // This creates the gap between cells
                  }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleCellClick(i, j)}
                      sx={{
                        width: '100%',
                        height: '100%',
                        p: 0,
                        fontSize: '1.5rem',
                        bgcolor: 'background.paper',
                        minWidth: 0, // Allows button to shrink below default min-width
                        borderRadius: 1 // Slightly rounded corners
                      }}
                    >
                      {cell}
                    </Button>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>

          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" onClick={handleClear}>Clear</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" onClick={checkSolution}>Check</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" onClick={setNextChallenge}>Next</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default GardenPuzzleGame;