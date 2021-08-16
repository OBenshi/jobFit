import React from "react";
import bg from "../img/bg2.jpg";
import AddText from "../components/AddText";
import { Typography, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      margin: 20,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  })
);

const AddDatingText: React.FC = () => {
  const backgroundStyles = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };
  const classes = useStyles();
  return (
    <div style={backgroundStyles}>
      <Grid container alignItems="center">
        <Typography
          className={classes.title}
          component="h5"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Add Dating Texts ✏️
        </Typography>
        <Grid item>
          <AddText />
        </Grid>

        <footer className={classes.footer}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            ❤️‍🔥 SWAT 2021 All rights reserved ©
          </Typography>
        </footer>
      </Grid>
    </div>
  );
};

export default AddDatingText;
