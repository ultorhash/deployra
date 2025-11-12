import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Montserrat", sans-serif'
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        enterDelay: 300,
        enterNextDelay: 300,
        leaveDelay: 0
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
}

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E2C4D',
      contrastText: '#F5F0E6'
    },
    secondary: {
      main: '#0A0A0F',
      contrastText: '#00A86B'
    },
    background: {
      default: '#E1E1DC',
      paper: '#001833'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#BBBBBB'
    }
  },
});
