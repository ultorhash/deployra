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
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        arrow: {
          color: 'rgba(0, 0, 0, 0.8)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        button: {
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
        }),
        input: ({ theme }: { theme: Theme }) => ({
          '::placeholder': {
            color: theme.palette.text.secondary
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
      primary: '#000000',
      secondary: '#333333'
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
    divider: "#777777",
    action: {
      selected: "#DDDDDD",
      active: "#DDDDDD",
      hover: "#EEEEEE",
      disabledBackground: "#DDDDDD"
    }
  }
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    background: {
      default: '#191938',
      paper: '#191938'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC'
    },
    primary: {
      main: '#191938',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#191938',
      contrastText: '#CCCCCC'
    },
    success: {
      main: '#1DB954',
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
    divider: "#3a4f75",
    action: {
      selected: "#07276A",
      active: "#07276A",
      hover: "#0A3894",
      disabledBackground: "#07276A"
    }
  }
});
