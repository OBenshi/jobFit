import React from "react";
import bg from "../img/bg2.jpg";
import AddText from "../components/AddText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      margin: 20
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
    <>
    <div style={backgroundStyles}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        <Box
          fontWeight="fontWeightBold"
          fontSize={92}
          letterSpacing={14}
          fontFamily="Monospace"
          color="#FFD700"
        >
          SWAT
        </Box>
      </Typography>
      <Typography
          className={classes.title}
          component="h5"
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
      >
        <Box fontWeight="fontWeightBold" fontFamily="Arial" bgcolor="white">
           Add Dating Texts ✏️
        </Box>
      </Typography>
      
      <AddText />
    </div>
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      ❤️‍🔥 SWAT 2021 All rights reserved ©
      </Typography>
    </footer>
    </>
  );
};

export default AddDatingText;
