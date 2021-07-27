import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client'
import { DATING_TEXT } from '../GraphQL/Queries';
import { useMutation } from "@apollo/client";
import {ADD_COMMENT} from '../GraphQL/Mutations'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({
  root: {
        maxWidth: 275,
        minHeight: 190,
        marginBottom: 10,
        marginLeft: 60
  },
  pos: {
    marginBottom: 12,
  },
});

interface IAddText {
   owner: string,
    text: string,
    score: string,
    postDate: string
}

const DisplayTextComp: React.FC = (props) => {
  const classes = useStyles();
  const { error, loading, data } = useQuery(DATING_TEXT);
  //const [aComment] = useMutation(ADD_COMMENT);
  const [comment, setComment] = useState<IAddText>({
    owner: "",
    text: "",
    score: "",
    postDate: ""
  });

  console.log(data);
  
  /* const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
  setComment({ ...comment, [e.target.name]: e.target.value }
    ); */
  /* const handleCLick =  (e: ) => {
    e.preventDefault();
        aComment({
          variables: {
          "owner": comment.owner,
           "text": comment.text,
          "score": comment.score,
          "postDate": comment.postDate
            }
          }
        )
        if (error) {
          console.log(error)
        } else {
          console.log("user logged in")
        }
      } */
  
    return (
    <div>
     {loading && <p>loading</p>}
      {error !== undefined && <p>{error.message}</p>}
      {data !== undefined && data.allTexts.map((allText: any) => {
        return <Paper className={classes.root}>
            <Typography variant="h6" gutterBottom>{allText.text}</Typography> 
            <Typography variant="caption" display="block" gutterBottom> {allText.postDate} </Typography>
              {allText.comments.map((comment: any) => {
                return <Typography variant="body2">{comment.text}</Typography>
              })}
          <div>
         <TextareaAutosize aria-label="minimum height" minRows={2} placeholder="your comment" name="text" />
        <Button size="small" variant="contained" color="primary">Add a comment</Button></div>
        </Paper>
              })} 
        </div> 
  )
}
export default DisplayTextComp;

///TODO here once we got mutation to add a comment, need to check again the fetch and uncomment the events