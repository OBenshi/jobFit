import { Typography } from '@material-ui/core';
import { useStyles } from '../style/useStyles';
import React from 'react';

interface Props {}

const Foot: React.FC = (props: Props) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography
        variant='subtitle1'
        align='center'
        color='textSecondary'
        component='p'>
        SWAT 2021 © All rights reserved
      </Typography>
    </footer>
  );
};

export default Foot;
