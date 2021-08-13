import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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
export const backgroundStyles = {
  backgroundImage: `url(${bg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
};
