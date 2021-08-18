import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
  alpha,
} from "@material-ui/core/styles";
import { purple, amber, yellow } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";

import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";

import bg from "../img/bg2.jpg";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 360,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: theme.palette.secondary.main,
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(5),
    },
    offset: theme.mixins.toolbar,

    appbarRoot: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      fontWeight: 500,
      [theme.breakpoints.up("xs")]: {
        display: "block",
      },
    },
    search: {
      flexGrow: 1,

      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "30%",
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(2),
        width: "30%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  })
);

// export const backgroundStyles = {
//   backgroundImage: `url(${bg})`,
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   width: "100vw",
//   height: "100vh",
// };

export const AmberSwitch = withStyles({
  switchBase: {
    color: amber[300],
    "&$checked": {
      color: amber[500],
    },
    "&$checked + $track": {
      backgroundColor: amber[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);
