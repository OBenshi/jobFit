import React, {
} from "react";
import img from '../img/home.jpg';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

interface FormData {
}
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
    }
}));



const Home: React.FC = () => {
  const classes = useStyles();
  const backgroundImg = {
        backgroundImage: `url(${img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      height: '300px',
      marginTop: "12px"
};
  return (
      <>
      <React.Fragment>
    <CssBaseline />
    <div style={backgroundImg}/>
      <main>
        <div className={classes.heroContent}>
         <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              SWAT analyser
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Here can be the description of the app
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
    </>
  );
};

export default Home;
