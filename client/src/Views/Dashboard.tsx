import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography, AppBar, Tab, Tabs, Box, Grid } from '@material-ui/core';
// import { backgroundStyles } from "../style/useStyles";
import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from '@material-ui/core/styles';
import '@fontsource/special-elite'; // Defaults to weight 400.

import UpdateProfile from '../components/UpdateProfile';
import backGround from '../img/backImg.png';
import head from '../img/head.jpeg';
import DisplayTextComp from '../components/DisplayTextComp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      // backgroundImage: `url(${backGround})`,
      // backgroundPosition: "center",
      // backgroundSize: "cover",
      // backgroundRepeat: "no-repeat",
      // width: "100vw",
      // height: "100vh",
    },
    title: {
      // flexGrow: 1,
      // margin: 20,
      background: 'rgba(255,255,255,0.75)',
      fontFamily: 'Special Elite',
      width: '100vw',
      // height: "150px",
      paddingTop: '1rem',
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    rootSnd: {
      display: 'flex',
      flexDirection: 'row',
      minWidth: 275,
      margin: theme.spacing(1),
    },
    details: {
      display: 'flex',
    },
    content: {
      flex: '1 0 auto',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    dashCont: {
      backgroundImage: `url(${head})`,
      // backgroundPosition: "center",
      // backgroundRepeat: "no-repeat",
      backgroundSize: 'auto',
    },
  })
);
const Dashboard = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState<number>(0);
  console.log(user);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  useEffect(() => {}, [user]);
  return (
    user && (
      <Grid
        container
        id='fjkdhskj'
        justifyContent='center'
        className={classes.dashCont}>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            component='h4'
            variant='h4'
            align='center'
            color='secondary'
            gutterBottom>
            👤 The &nbsp;
            {user.username[0].toUpperCase() + user.username.slice(1)}
            &nbsp; Zone 👥
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Tabs
            className={classes.title}
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor='secondary'
            textColor='secondary'
            centered
            variant='fullWidth'>
            <Tab
              label='your texts'
              id='userTextTab'
              aria-controls={`your-texts-tabpanel`}
            />{' '}
            <Tab
              label='mange profile'
              id='manageProfileTab'
              aria-controls='manage profile tab'
            />
          </Tabs>
        </Grid>
        <div
          role='tabpanel'
          hidden={tabValue !== 0}
          id={`your-texts-tabpanel`}
          aria-labelledby={`your-texts-tab`}>
          {tabValue === 0 &&
            (user?.datingTexts?.length ? (
              <Grid container justifyContent='center'>
                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent='center'
                    alignItems='center'
                    alignContent='center'>
                    {user?.datingTexts.map((datingText) => {
                      console.log(`datingText`, datingText._id);
                      return (
                        <Grid item xs={12}>
                          <DisplayTextComp
                            key={`${datingText._id}-dashboard`}
                            allText={datingText}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <p>no text</p>
            ))}
        </div>
        <div
          role='tabpanel'
          hidden={tabValue !== 1}
          id={`manage-your-profile-tabpanel`}
          aria-labelledby={`manage-profile-tab`}>
          <Grid container justifyContent='center'>
            {' '}
            {tabValue === 1 && <UpdateProfile />}
          </Grid>
        </div>
      </Grid>
    )
  );
};

export default Dashboard;
