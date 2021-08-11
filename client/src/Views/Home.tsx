import React from "react";
import img from "../img/home.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(0),
    backgroundColor: theme.palette.info.dark,
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const backgroundImg = {
    backgroundImage: `url(${img})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "300px",
    marginTop: "12px",
  };
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <div style={backgroundImg} />
        <main>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
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
                >
                  SWAT
                </Box>
                <Box
                  fontStyle="oblique"
                  fontWeight="fontWeightLight"
                  fontFamily="Monospace"
                >
                  analyser
                </Box>
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                <Box
                  fontSize={100}
                  letterSpacing={10}
                >
                👤💯🖋<br></br>➡🔜<br></br> 🫂❤️‍🔥
                </Box>
              </Typography>
            </Container>
          </div>
        </main>
      </React.Fragment>
    </>
  );
};

export default Home;
