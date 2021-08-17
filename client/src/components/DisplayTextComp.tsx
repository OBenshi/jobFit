import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../GraphQL/Mutations";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { ObjectId } from "mongodb";
import { DATING_TEXT } from "../GraphQL/Queries";


const useStyles = makeStyles((theme) => ({
  small: {
    maxWidth: 320,
    minHeight: 50,
    backgroundColor: "#fffde7",
    border: "1px",
    borderRadius: "15%",
    marginLeft: "30px",
  },
  grey: {
    color: "red",
  },
  marginIcon: {
    marginLeft: "30px",
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
    padding: theme.spacing(2),
  },
  biggest: {
    backgroundColor: "#e0e0e0",
  },
  textField: {
    width: "320px",
    backgroundColor: "#e0e0e0",
  },
}));

interface IAddComment {
  text: string;
  onText:  ObjectId | null 
}

const DisplayTextComp: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { error, loading, data } = useQuery(DATING_TEXT);
  const [addComment] = useMutation(ADD_COMMENT, {refetchQueries:[{query: DATING_TEXT}]});
  const [comment, setComment] = useState<IAddComment>({
    text: "",
    onText: null
  });
  const handleChange = (e: ChangeEvent<any>) =>
    setComment({ ...comment, [e.target.name]: e.target.value });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment({
      variables: {
        addCommentComment: {
          text: comment.text,
          onText: props.allText._id
        },
      },
    })
    if (error) {
      console.log(error);
    } else {
      console.log("success");
    }
  };

  console.log(comment);
  console.log(props);
  console.log(data)

  return (
    <div>
      <Box className={classes.big}>
        <Box display="flex" ml={1}>
          <FavoriteIcon style={{ padding: "4px" }} />
          <Box display="flex">
            <Box ml={2}>
              <Typography variant="h5" gutterBottom>
                {props.allText.owner.username}
              </Typography>
            </Box>
          </Box>
          <Box ml={5}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              className={classes.grey}
            >
              {props.allText.postDate.substring(0, 10)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" gutterBottom className={classes.dating}>
          {props.allText.text}
        </Typography>
      </Box>
      {/* 2nd  */}
      {data !== undefined &&
        props.allText.comments.map((comment: any) => {
          return (
            <Box className={classes.small}>
              <Box display="flex">
                <StarRateIcon />
                <Box display="flex">
                  <Box ml={4}>
                    <Typography variant="h5" gutterBottom>
                       {comment.owner.username}
                    </Typography>
                  </Box>
                </Box>
                <Box ml={5}>
                  <Typography
                    variant="caption"
                    display="block"
                    className={classes.grey}
                  >
                    {comment.postDate.substring(0, 10)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2">{comment.text}</Typography>
            </Box>
          );
        })}
      <Box>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            label="comment"
            id="standard-size-small"
            size="small"
            rows={1}
            name="text"
            value={comment.text}
            variant="outlined"
            onChange={handleChange}
          />
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "#FFD700", color: "#FFFFFF" }}
            type="submit"
          >
            post
          </Button>
        </form>
      </Box>
    </div>
  );
};
export default DisplayTextComp;

///TODO here once we got mutation to add a comment, need to check again the fetch and uncomment the events
