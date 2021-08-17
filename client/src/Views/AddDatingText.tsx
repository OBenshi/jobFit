import React from "react";
import bg from "../img/backImg.png";
import AddText from "../components/AddText";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import backGround from "../img/head.jpeg";
import { AutoComplete } from "material-ui";
import { CenterFocusStrong } from "@material-ui/icons";
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 10,
      backgroundImage: `url(${backGround})`,
      backgroundPosition: "center",
      width: "100vw",
      height: "150px",
      paddingTop: 70,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  })
);

const AddDatingText: React.FC = () => {
  const backgroundStyles = {
    flexGrow: 1,
    backgroundImage: `url(${backGround})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundRepeat: "repeat",
    width: "100vw",
    height: "100vh",
    alignContent: "baseline",
  };
  const classes = useStyles();
  return (
    <Grid
      container
      style={backgroundStyles}
      alignItems="flex-start"
      justifyContent="center"
      // spacing={9}
    >
      <Grid item xs={12}>
        <Typography
          // className={classes.title}
          component="h5"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Add Dating Texts ✏️
        </Typography>{" "}
      </Grid>
      <Grid item xs={10}>
        <AddText />
      </Grid>
    </Grid>
  );
};

export default AddDatingText;
