import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
import { useQuery, gql } from '@apollo/client'
import { DATING_TEXT } from '../GraphQL/Queries';
import { useMutation } from "@apollo/client";
import {ADD_COMMENT} from '../GraphQL/Mutations'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  small: {
    maxWidth: 320,
    minHeight: 50,
    backgroundColor: "#fffde7",
    border: "1px",
    borderRadius: "15%",
    marginLeft:"30px"
  },
  grey: {
    color: "red",
  },
  marginIcon: {
    marginLeft: '30px',
  },
  big: {
    margin: theme.spacing(1),
    maxWidth: 340,
    minHeight: 120,
    border: "2px",
    borderRadius: "7%",
    borderColor: "red",
    backgroundColor: "#e0e0e0",
  },
  dating: {
    backgroundColor: "#fffde7",
    padding:theme.spacing(2)
  },
  biggest: {
    backgroundColor: "#e0e0e0"
  },
   textField: {
     width: '320px',
     backgroundColor: "#e0e0e0",
  }
   
}));

interface IAddComment {
   //owner: string,
    text: string,
   //score: string,
   // onText: string
}


const DisplayTextComp: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { error, loading, data } = useQuery(DATING_TEXT);
  const [addComment] = useMutation(ADD_COMMENT);
  const [comment, setComment] = useState<IAddComment>({
    //owner: "",
    text: "",
    //score: "",
    //onText: ""
  });
  const handleChange =  (e: ChangeEvent<any>) =>
  setComment({ ...comment, [e.target.name]: e.target.value }
    ); 
 const handleSubmit =  (e: FormEvent<HTMLFormElement>)=> {
   e.preventDefault();
        addComment({
          variables: {
            "addCommentComment": {
             //"owner": comment.owner,
             "text": comment.text,
             //"score": comment.score,
             //"onText": comment.onText
          }
            }
          }
        )
        if (error) {
          console.log(error)
        } else {
          console.log("success")
   }
      }  
  console.log(data);
  console.log(props.allText.postDate);
  return (
  <div>
    <Box className={classes.big}>
        <Box display="flex"ml={1} >
        <FavoriteIcon style={{padding:"4px"}}/>
            <Box display="flex">
              <Box ml={2}>
              <Typography variant="h5" gutterBottom >
                username
              </Typography>
            </Box>
          </Box>
        <Box ml={5}>
          <Typography variant="caption" display="block" gutterBottom className={classes.grey}>{props.allText.postDate}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" gutterBottom className={classes.dating}>{props.allText.text}</Typography>
    </Box>
    {/* 2nd  */}
    {data !== undefined && props.allText.comments.map((comment: any) => {
      return (
        <Box className={classes.small}>
          <Box display="flex" >
          <StarRateIcon/>
            <Box display="flex">
              <Box ml={4}>
              <Typography variant="h5" gutterBottom>
                owner {comment.owner}
              </Typography>
            </Box>
          </Box>
        <Box ml={5}>
          <Typography variant="caption" display="block" className={classes.grey}>{comment.postDate}</Typography>
        </Box>
        </Box>
        <Typography variant="body2">{comment.text}</Typography>
        </Box>
      )
    })}
      <Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
 {/*          <TextareaAutosize
            aria-label="minimum height"
              minRows={1} placeholder="your comment"
              name="text"
              value={comment.text}
              onChange={handleChange} /> */}
          <TextField
            className={classes.textField}
            label="comment"
            id="standard-size-small"
            defaultValue="comment"
            size="small"
            rows={1}
            name="text"
            value={comment.text}
            variant="outlined"
            onChange={handleChange} 
      />
            <Button size="small" variant="contained" style={{ backgroundColor: "#FFD700", color: '#FFFFFF'}} type="submit">post</Button>
            </form>
     </Box>
  </div >
  )
}
export default DisplayTextComp;

///TODO here once we got mutation to add a comment, need to check again the fetch and uncomment the events