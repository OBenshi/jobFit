import { Grid, Typography, Button, Link } from '@material-ui/core';
import React, { useContext } from 'react';
import { useStyles } from '../style/useStyles';
import {
  Link as RouterLink,
  NavLink,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import img from '../img/home.jpg';
import { AuthContext } from '../context/AuthContext';

interface Props {}

const UserHome: React.FC = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Grid
      container
      direction='column'
      className={classes.heroContent}
      justifyContent='center'>
      <Grid item xs={12}>
        <img
          src={img}
          style={{ width: '100%', height: '100%', paddingTop: '2rem' }}
          alt='chicken'></img>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction='column' className={classes.textCont}>
          <Typography variant='h4' align='center'>
            Welcome to
          </Typography>
          <Typography
            component='h1'
            variant='h1'
            align='center'
            color='secondary'>
            SWAT
          </Typography>
          <div className={classes.heroButtons}>
            <Typography
              variant='h4'
              align='center'
              color='textSecondary'
              paragraph>
              analyser
            </Typography>
          </div>
          <Typography variant='h4' align='center'>
            {user?.username.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default UserHome;
