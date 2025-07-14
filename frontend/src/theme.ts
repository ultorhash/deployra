import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5A5A5A',
      contrastText: '#F5F0E6'
    },
    secondary: {
      main: '#A39E93'
    },
    background: {
      default: '#E1E1DC',
      paper: '#D8D5D0'
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#676767'
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
    }
  }
});
