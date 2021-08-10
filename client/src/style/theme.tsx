import {
  createTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#FF9D00",
      main: "#FF7600",
      dark: "#FF3C00",
    },
    secondary: {
      light: "#DBBC57",
      main: "#d4af37",
      dark: "#B99727",
    },
    text: {
      //   secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});
