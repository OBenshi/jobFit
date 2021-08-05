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
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
        maxWidth: 340,
        minHeight: 110,
        marginBottom: 10,
        marginLeft: 10,
        elevation: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IAddText {
   //owner: string,
    text: string,
   //score: string,
   // onText: string
}

const DisplayTextComp: React.FC = (props) => {
  const classes = useStyles();
  const { error, loading, data } = useQuery(DATING_TEXT);
  const [AddCommentMutation] = useMutation(ADD_COMMENT);
  const [comment, setComment] = useState<IAddText>({
    //owner: "",
    text: "",
    //score: "",
    //onText: ""
  });

  console.log(data);
  
    return (
      <div>
     {loading && <p>loading</p>}
      {error !== undefined && <p>{error.message}</p>}
      {data !== undefined && data.allTexts.map((allText: any) => {
        return <Paper className={classes.root}>
            <Typography variant="h6" gutterBottom>{allText.text}</Typography> 
            <Typography variant="caption" display="block" gutterBottom> {allText.postDate} </Typography><hr></hr>
              {allText.comments.map((comment: any) => {
                return <Typography variant="body2" style={{backgroundColor: "#FFD700"}}>{comment.text}</Typography>
              })}
        </Paper>
      })}
        </div> 
  )
}
export default DisplayTextComp;

///TODO here once we got mutation to add a comment, need to check again the fetch and uncomment the events