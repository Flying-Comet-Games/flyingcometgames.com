import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#cca59f',
    },
    secondary: {
      main: '#ebe2d1',
    },
    background: {
      default: '#f4f0df',
      paper: '#FBFAF5',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ebe2d1',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&:hover': {
            backgroundColor: '#cca59f',
          },
        },
        contained: {
          backgroundColor: '#cca59f',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#ebe2d1',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
});

export default theme;