import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
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

const AddComment: React.FC = (props) => {
  const classes = useStyles();
  const [AddCommentMutation, error] = useMutation(ADD_COMMENT);
  const [comment, setComment] = useState<IAddText>({
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
        AddCommentMutation({
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
    console.log(comment);
      }  
  
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{display: "flex",
            flexDirection: 'column', justifyContent: "space-between"
          }}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={2} placeholder="your comment"
              name="text"
              value={comment.text}
              onChange={handleChange} />
            <Button size="small" variant="contained" style={{ backgroundColor: "#FFD700", color: '#FFFFFF' }} type="submit">Add a comment</Button>
          </form>
        </div> 
  )
}
export default AddComment;

