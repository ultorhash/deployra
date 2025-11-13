import { createTheme, Theme } from '@mui/material/styles';

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
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }: { theme: Theme }) => ({
          borderColor: theme.palette.divider
        }),
        root: ({ theme }: { theme: Theme }) => ({
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
            borderWidth: '1px'
          }
        })
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
    success: {
      main: '#4CAF50',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#F44336',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FF9800',
      contrastText: '#000000'
    },
    info: {
      main: '#2196F3',
      contrastText: '#FFFFFF'
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
