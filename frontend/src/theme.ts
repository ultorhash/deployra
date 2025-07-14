import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#333333'
    },
    background: {
      default: '#f5f5f5'
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#DDDDDD'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial'
  }
});
