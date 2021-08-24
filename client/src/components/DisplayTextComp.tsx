import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
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

const useStyles2 = makeStyles((theme) => ({
  small: {
    maxWidth: 320,
    minHeight: 50,
    backgroundColor: '#fffde7',
    border: '1px',
    borderRadius: '15%',
    marginLeft: '30px',
  },
  grey: {
    color: 'red',
  },
  marginIcon: {
    marginLeft: '30px',
  },
  big: {
    margin: theme.spacing(1),
    maxWidth: 340,
    minHeight: 120,
    border: '2px',
    borderRadius: '7%',
    borderColor: 'red',
    backgroundColor: '#e0e0e0',
  },
  dating: {
    backgroundColor: '#fffdef',
    // padding: theme.spacing(2),
  },
  biggest: {
    backgroundColor: '#e0e0e0',
  },
  textField: {
    width: '100%',
    backgroundColor: '#e0e0e0',
  },
}));

interface IAddComment {
  text: string;
  onText: ObjectId | null;
}

const DisplayTextComp: React.FC<DTProps> = (props) => {
  const { allText: aText } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
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
  const handleExpandClick = () => {
    setExpanded(!expanded);
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
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.cardExpand, {
            [classes.cardExpandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    /* <Grid
      container
      direction='column'
      id={`${aText._id}-${aText.owner?._id}-${aText.owner?.username}`}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Typography variant='h6' gutterBottom>
              {aText.owner?.username}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='caption'
              display='block'
              gutterBottom
              className={classes.grey}>
              {aText.postDate.substring(0, 10)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.dating} spacing={4}>
          <Grid item xs={12}>
            <Typography variant='body1' gutterBottom>
              {aText.text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {' '}
            {datingTextData !== undefined && (
              <Grid item xs={12}>
                <Grid container id={`${aText._id}-${aText.owner?._id}-rob`}>
                  <Grid item>
                    <TextareaAutosize
                      placeholder='Comment'
                      // fullWidth
                      // className={classes.textField}
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
                  <Grid item xs={4}>
                    <Button
                      size='medium'
                      variant='contained'
                      style={{ backgroundColor: '#FFD700', color: '#FFFFFF' }}
                      type='button'
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => handleCommentSubmit(e)}>
                      comment
                    </Button>{' '}
                  </Grid>{' '}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {datingTextData !== undefined && <CommentBox comments={aText.comments} />}
                      </Grid>*/
  );
};
export default DisplayTextComp;
