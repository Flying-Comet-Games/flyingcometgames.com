import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F93854',
    },
    secondary: {
      main: '#F4F1E0',
    },
    background: {
      default: '#F4F1E0',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#F93854',
      secondary: '#000000',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F4F1E0',
          color: '#F93854',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#F93854',
          '&:hover': {
            backgroundColor: 'rgba(249, 56, 84, 0.08)',
          },
        },
        contained: {
          backgroundColor: '#F93854',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#D62E46',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#F93854',
        },
      },
    },
  },
});

export default theme;