import React from "react";
import { useHistory } from "react-router-dom";
import img from "../img/home.jpg";
import headImg from "../img/head.jpeg";
import head2Img from "../img/head2.jpeg";
import descImg from "../img/descImg.jpeg";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import CreateIcon from '@material-ui/icons/Create';
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 6),
    backgroundImage: `url(${head2Img})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "300px",
    marginTop: "12px",
  },
  heroButtons: {
    marginTop: theme.spacing(-2),
    padding: theme.spacing(0),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  arrows: {
    marginTop: "35px"
  },
  description: {
    display: 'flex',
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(15),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
    marginTop: "80px"
  },
  image: {
    height: 100,
    fontSize: "large"
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  cardImg: {
    backgroundImage: `url(${descImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "600px",
    marginTop: "0px",
  },
  backItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 5),
    marginTop: "80px",
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
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
            <div className={classes.heroButtons}>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  <Box
                    fontStyle="oblique"
                    fontFamily="Century Gothic"
                  >
                    💕 Welcome to 💕
                  </Box>
                  
                </Typography>
              </div>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <Box
                  fontWeight="fontWeightBold"
                  fontSize={70}
                  letterSpacing={14}
                  fontFamily="Century Gothic"
                  color="#07370C"

                >
                  SWAT
                </Box>
              </Typography>
              <div className={classes.heroButtons}>
                <Typography
                  variant="h4"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  <Box
                    fontStyle="oblique"
                    fontFamily="Century Gothic"
                  >
                    analyser
                  </Box>
                  
                </Typography>
              </div>
            </Container>

          </div>
          
          <div className={classes.arrows}>
          <Box>
            <KeyboardArrowDownIcon fontSize="small" />
          </Box>
          <Box>
            <KeyboardArrowDownIcon fontSize="medium" />
          </Box>
          <Box>
            <KeyboardArrowDownIcon fontSize="large" />
          </Box>
          </div>

          <div className={classes.description}>
            <Container className={classes.container}>
            
              <Grid container spacing={5}>
                <Grid item xs={12} md={4} className={classes.cardImg}>
                  <div className={classes.item}>                    
                    <div>
                      <AccessibilityNewIcon fontSize="large"/>
                    </div>
                    <br></br>
                    <Typography variant="h6" className={classes.title}>
                      You're a lonely single, who just joined Tinder.
                      But not sure about your dating Profile?
                    </Typography>
                    <Typography variant="h5">
                      Don't worry ❣️<br></br> SWAT will help you 💙
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} className={classes.cardImg}>
                  <div className={classes.item}>
                    <div>
                      <SpellcheckIcon fontSize="large"/>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                      How it works?
                    </Typography>
                    <Typography variant="h5">
                      By SWAT
                      <br></br>
                      you can easliy put your profile.
                      <br></br>
                      AI Watson will check the 'Tone' of your text,<br></br>then directly let you know
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4} className={classes.cardImg}>
                  <div className={classes.item}>
                    <div>
                      <CreateIcon fontSize="large"/>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                      Do you need other examples of dating texts?
                    </Typography>
                    <Typography variant="h5">
                      By SWAT
                      <br></br>
                      you can also check others dating profiles
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div className={classes.backItem}>
                    <Box
                      fontSize={90}
                      letterSpacing={10}
                    >
                    👤💯🖋<br></br>➡🔜<br></br> 🫂❤️‍🔥
                    </Box>
                    <Button variant="contained" size="large" color="primary" onClick={()=>history.push('/signup')}>JOIN SWAT</Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
          <footer className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            ❤️‍🔥 SWAT 2021 All rights reserved ©
            </Typography>
          </footer>
        </main>
      </React.Fragment>
    </>
  );
};

export default Home;
