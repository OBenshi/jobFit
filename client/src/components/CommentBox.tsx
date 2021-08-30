import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
} from '@material-ui/core';
import { useStyles } from '../style/useStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
interface Props {
  comments: [Comment];
}
const CommentBox: React.FC<Props> = (props) => {
  const { comments } = props;
  const classes = useStyles();
  useEffect(() => {
    console.log('comment props', comments.length);
  }, []);
  return (
    <Grid container>
      {comments.map((comment: Comment) => {
        return (
          <Grid
            item
            key={`${comment.owner._id},${comment.onText},${comment.postDate}`}
            xs={12}>
            <Card className={classes.cardRoot}>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.cardAvatar}>
                    {comment.owner?.username[0].toUpperCase()}
                  </Avatar>
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                // title='Shrimp and Chorizo Paella'
                subheader={`${new Date(comment.postDate).toDateString()}`}
              />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {comment.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CommentBox;
