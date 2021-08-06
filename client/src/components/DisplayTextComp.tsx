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
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
  //console.log(props.allText.owner.username);
  console.log(props.allText.postDate);
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="caption" display="block" style={{ textAlign: "left" }} >Owner {/* {props.allText.owner.username} */}</Typography>
          <Typography gutterBottom variant="h6">{props.allText.text}</Typography>
          <Typography gutterBottom variant="caption" display="block" style={{textAlign:"left"}}>{props.allText.postDate}</Typography>
         {data !== undefined && props.allText.comments.map((comment: any) => {
           return <div style={{ backgroundColor: "#FFFF00", border: "2px solid red" }}>
             <Typography variant="caption" display="block" gutterBottom style={{textAlign:"left"}}>owner</Typography>
             <Typography variant="body2">{comment.text}</Typography><div>
            <Typography variant="caption" display="block" gutterBottom style={{textAlign:"right"}}>date </Typography>
           </div></div>
         })}
          <hr></hr>
        </CardContent>
        <CardActions>
          <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{display: "flex", alignItems:"center"}}>
          <TextareaAutosize
            aria-label="minimum height"
              minRows={6} placeholder="your comment"
              name="text"
              value={comment.text}
              onChange={handleChange} /><hr></hr>
            <Button size="small" variant="contained" style={{ backgroundColor: "#FFD700", color: '#FFFFFF' }} type="submit">Add a comment</Button>
            </form>
      </CardActions>
      </Card>
  )
}
export default DisplayTextComp;

///TODO here once we got mutation to add a comment, need to check again the fetch and uncomment the events