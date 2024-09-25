import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import ColorMatcher from './games/ColorMatcher';
import DigitShift from './games/DigitShift';
import WordWizard from './games/WordWizard';
import Home from './components/Home';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Game Portal
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/color-matcher" element={<ColorMatcher />} />
            <Route path="/digit-shift" element={<DigitShift />} />
            <Route path="/word-wizard" element={<WordWizard />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;