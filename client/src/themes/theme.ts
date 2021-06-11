import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Poppins", "sans-serif"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#F04040' },
    secondary: { main: '#A9A9A9' },
    info: { main: '#64b5f6' },
  },
  shape: {
    borderRadius: 5,
  },
});
