import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseThemeOptions = {
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
} as const;

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#000000'
    },
    primary: {
      main: '#FFFFFF',
      contrastText: '#000000'
    },
    secondary: {
      main: '#CCCCCC',
      contrastText: '#000000'
    },
    divider: "#000000",
    action: {
      hover: "#DDDDDD"
    }
  }
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
