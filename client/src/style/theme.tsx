import {
  createTheme,
  makeStyles,
  createStyles,
  Theme as AugmentedTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import "@fontsource/special-elite"; // Defaults to weight 400.

import bg from "../img/backImg.png";
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
      fontFamily:
        '"Special Elite","Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Monospace","Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  // overrides: {
  //   MuiCssBaseline: {
  //     "@global": {
  //       body: {
  //         backgroundImage: `url(${bg})`,
  //         height: "100vh",
  //       },
  //     },
  //   },
  // },
});
