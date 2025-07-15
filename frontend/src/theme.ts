import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E2C4D',
      contrastText: '#F5F0E6'
    },
    secondary: {
      main: '#0A0A0F',
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
  typography: {
    fontFamily: 'Roboto, Arial'
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
          textTransform: 'none',
          backgroundColor: '#0A0A0F',
          '&.Mui-disabled': {
            backgroundColor: '#0A0A0F',
            color: '#BBBBBB',
            opacity: 0.5
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#BBBBBB',
          '&.Mui-selected': {
            color: '#FFFFFF'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-focused': {
            color: 'white'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2C4D',
          color: 'white',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    }
  }
});
