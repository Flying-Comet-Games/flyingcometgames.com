import { createTheme } from '@mui/material/styles';

const wordyVerseTheme = createTheme({
  palette: {
    primary: {
      main: '#b8c26c', // Accent color
    },
    secondary: {
      main: '#e0dfd9', // Secondary button background
    },
    background: {
      default: '#e0dfd9', // Default background color
      paper: '#FBFAF5',
    },
    text: {
      primary: '#000000', // Default text color
      secondary: '#000000',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0dfd9', // Matches default background color
          color: '#000000', // Default text color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000', // Default button background color
          color: '#ffffff', // Default button text color
          '&:hover': {
            backgroundColor: '#b8c26c', // Accent color on hover
          },
        },
        containedSecondary: {
          backgroundColor: '#ffffff', // Secondary button background
          color: '#000000', // Secondary button text color
          '&:hover': {
            backgroundColor: '#b8c26c', // Accent color on hover for secondary
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000', // Default text color
        },
      },
    },
  },
});

export default wordyVerseTheme;
