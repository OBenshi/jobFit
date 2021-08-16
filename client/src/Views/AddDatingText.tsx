import React from "react";
import bg from "../img/backImg.png";
import AddText from "../components/AddText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import backGround from "../img/head.jpeg"
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
      backgroundImage:  `url(${backGround})`,
      backgroundPosition: "center",
      width: "100vw",
      height: "150px",
      paddingTop: 70
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
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          ❤️‍🔥 SWAT 2021 All rights reserved ©
        </Typography>
      </footer>
    </>
  );
};

export default AddDatingText;
