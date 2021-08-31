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
import { useStyles, webColors } from '../style/useStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import comment from 'material-ui/svg-icons/communication/comment';
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
    <Grid container spacing={2}>
      {comments.map((comment: Comment) => {
        const randomColor =
          webColors[Math.floor(Math.random() * webColors.length)];
        return (
          <Grid
            item
            key={`${comment.owner._id},${comment.onText},${comment.postDate}`}
            xs={12}>
            <Card className={classes.commentCardRoot}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label='avatar'
                    style={{ backgroundColor: randomColor }}>
                    {comment.owner?.username[0].toUpperCase()}
                  </Avatar>
                }
                // action={
                //   <IconButton aria-label='settings'>
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                // title='Shrimp and Chorizo Paella'
                subheader={`${new Date(comment.postDate).toDateString()}`}
              />
              <CardContent>
                <Grid container>
                  <Grid item>
                    {' '}
                    <Typography color='textSecondary'>
                      {comment.text}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CommentBox;
