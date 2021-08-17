import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
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
