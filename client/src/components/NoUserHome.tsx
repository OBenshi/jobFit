import { Button, Link, Grid, Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import img from '../img/home.jpg';
import { useStyles } from '../style/useStyles';

interface ArrowProps {
  to: string;
}

const Arrow3: React.FC<ArrowProps> = (props) => {
  return (
    <HashLink to={`#${props.to}`}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignContent='center'
        alignItems='center'>
        <KeyboardArrowDownIcon fontSize='small' />
        <KeyboardArrowDownIcon fontSize='medium' />
        <KeyboardArrowDownIcon fontSize='large' />
      </Grid>
    </HashLink>
  );
};

const NoUserHome: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      alignContent='center'
      alignItems='center'
      justifyContent='center'>
      {/* <div style={backgroundImg} /> */}
      <Grid item xs={12}>
        <img
          src={img}
          style={{ width: '100%', height: '100%', paddingTop: '2rem' }}
          alt='chicken'></img>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction='column'
          className={classes.heroContent}
          justifyContent='center'>
          <Grid container direction='column' xs={12}>
            <Typography
              component='h1'
              variant='h1'
              align='center'
              color='textPrimary'>
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
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={() => history.push('/signup')}>
              JOIN SWAT
            </Button>
          </Grid>
          <Typography className={classes.textCont}>
            Already have an account?{' '}
            <Link component={RouterLink} to='/login' color='secondary'>
              Login!
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {' '}
        <Arrow3 to={'desc1'} />
      </Grid>
      <Grid item xs={12} className={classes.cardImg} id='desc1'>
        <Grid
          container
          direction='column'
          className={classes.homeItem}
          justifyContent='center'
          alignItems='center'
          alignContent='space-around'>
          <Grid item xs={12} className={classes.textCont}>
            <Typography variant='h6' className={classes.title}>
              Writing the perfect text for your online dating profile could be
              difficult
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>
              <Typography variant='h5' color='secondary' component='span'>
                SWAT
              </Typography>{' '}
              is here to help
            </Typography>
          </Grid>
        </Grid>
      </Grid>{' '}
      <Grid item xs={12}>
        <Arrow3 to={'desc2'} />
      </Grid>
      <Grid item xs={12} className={classes.cardImg} id='desc2'>
        <Typography variant='h5' className={classes.textCont}>
          with SWAT you can receive an AI powered analysis of your dating
          profile text , as well as <br /> anonymous feedback from other users.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoUserHome;
