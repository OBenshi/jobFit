import React from 'react';
import bg from '../img/head.jpeg';
import backGround from '../img/head.jpeg';
import DisplayTextComp from '../components/DisplayTextComp';
import { Typography, Box, Grid } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import { DATING_TEXT } from '../GraphQL/Queries';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      backgroundImage: `url(${backGround})`,
      backgroundPosition: 'center',
      width: '100vw',
      height: '150px',
      paddingTop: 70,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  })
);

const DisplayText: React.FC = () => {
  const { error, loading, data } = useQuery(DATING_TEXT);
  const classes = useStyles();

  const backgroundStyles = {
    backgroundImage: `url(${bg})`,
    // width: '100wh',
    // resizeMode: 'repeat',
  };
  return (
    <Grid
      container
      direction='column'
      alignContent='center'
      style={backgroundStyles}
      spacing={2}>
      {loading && <p>loading</p>}
      {error !== undefined && <p>{error.message}</p>}
      {data !== undefined &&
        data.allTexts.map((allText: DatingText, index: number) => {
          return (
            <Grid item xs={11}>
              <DisplayTextComp key={index} allText={allText} />
            </Grid>
          );
        })}
    </Grid>
  );
};
export default DisplayText;
