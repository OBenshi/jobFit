import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../GraphQL/Mutations';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  CardActions,
  IconButton,
  Collapse,
} from '@material-ui/core';
import clsx from 'clsx';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import { ObjectId } from 'mongodb';
import { DATING_TEXT } from '../GraphQL/Queries';
import CommentBox from './CommentBox';
import { useStyles } from '../style/useStyles';
import AddCommentTwoToneIcon from '@material-ui/icons/AddCommentTwoTone';

interface IAddComment {
  text: string;
  onText: ObjectId | null;
}

const DisplayTextComp: React.FC<DTProps> = (props) => {
  const { allText: aText } = props;
  const classes = useStyles();
  const [expandedComment, setExpandedComment] = React.useState(false);

  const [expandedAddComment, setExpandedAddComment] = React.useState(false);
  const { error, loading, data: datingTextData } = useQuery(DATING_TEXT);
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: DATING_TEXT }],
  });
  const [comment, setComment] = useState<IAddComment>({
    text: '',
    onText: null,
  });

  const handleChange = (e: ChangeEvent<any>) =>
    setComment({ ...comment, [e.target.name]: e.target.value });

  const handleExpandClick = (num: number) => {
    if (num === 2) {
      setExpandedComment(!expandedComment);
    } else if (num === 1) {
      setExpandedAddComment(!expandedAddComment);
    }
  };

  const handleCommentSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    addComment({
      variables: {
        addCommentComment: {
          text: comment.text,
          onText: aText._id,
        },
      },
    });
    if (error) {
      console.log(error);
    } else {
      console.log('success');
      setComment({ text: '', onText: null });
    }
  };

  useEffect(() => {
    // console.log(comment);
    // console.log('props', props);
  }, []);

  return (
    <Card className={classes.cardRoot}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.cardAvatar}>
            {aText.owner?.username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        // title='Shrimp and Chorizo Paella'
        subheader={`${new Date(aText.postDate).toDateString()}`}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {aText.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton
          // aria-label='comment'
          // className={clsx(classes.cardExpand, {
          //   [classes.cardExpandOpen]: expandedComment,
          // })}
          onClick={() => handleExpandClick(1)}
          aria-expanded={expandedAddComment}
          aria-label='add comment'>
          <AddCommentTwoToneIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.cardExpand, {
            [classes.cardExpandOpen]: expandedComment,
          })}
          onClick={() => handleExpandClick(2)}
          aria-expanded={expandedComment}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>{' '}
      <Collapse in={expandedAddComment} timeout='auto' unmountOnExit>
        <CardContent>
          <Grid container direction='column' justifyContent='center'>
            <Grid item xs={12}>
              <TextareaAutosize
                placeholder='Comment'
                // fullWidth
                style={{ width: '100%' }}
                // label='comment'
                id={`${aText._id}-post-comment`}
                // size='small'
                rows={2}
                name='text'
                value={comment.text}
                // variant='outlined'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                size='medium'
                fullWidth
                variant='contained'
                color='primary'
                // style={{ backgroundColor: '#FFD700', color: '#FFFFFF' }}
                type='button'
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleCommentSubmit(e)
                }>
                comment
              </Button>{' '}
            </Grid>{' '}
          </Grid>
        </CardContent>
      </Collapse>
      <Collapse in={expandedComment} timeout='auto' unmountOnExit>
        <CardContent>
          <CommentBox comments={aText.comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default DisplayTextComp;
