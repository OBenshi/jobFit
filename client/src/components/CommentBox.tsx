import React, { useContext, useEffect, useState } from 'react';

import { Button, Typography, TextField, Box, Grid } from '@material-ui/core';
interface Props {
  comments: [Comment];
}
const CommentBox: React.FC<Props> = (props) => {
  const { comments } = props;
  useEffect(() => {
    console.log('comment props', comments.length);
  }, []);
  return (
    <Grid container>
      {comments.map((comment: Comment) => {
        return (
          <Box>
            <Box display='flex'>
              {/* <StarRateIcon /> */}
              <Box display='flex'>
                <Box ml={4}>
                  <Typography variant='h5' gutterBottom>
                    {comment.owner.username}
                  </Typography>
                </Box>
              </Box>
              <Box ml={5}>
                <Typography
                  variant='caption'
                  display='block'
                  //   className={classes.grey}
                >
                  {/* {comment.postDate.toString().substring(0, 10)} */}
                </Typography>
              </Box>
            </Box>
            <Typography variant='body2'>{comment.text}</Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default CommentBox;
