import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect
} from "react";
import background from '../img/background.jpg';
import { useQuery, gql } from '@apollo/client'
import { DATING_TEXT } from '../GraphQL/Queries';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
        maxWidth: 275,
        minHeight:100
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
    
}

const DisplayText: React.FC = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  
    const { error, loading, data } = useQuery(DATING_TEXT)
    
  console.log(data);
 //console.log(data.allTexts);
  
  useEffect(() => {
      if (data) {
      console.log(data.allTexts[0].comments)
      //setTexts(data.allTexts)
        } 
    }, [data]); 

     const backgroundStyles = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat',
        //opacity: 0.8,
        width: '100vw',
        height: '100vh'
};
    return (
    <div style={backgroundStyles}>
     {loading && <p>loading</p>}
      {error !== undefined && <p>{error.message}</p>}
      {data !== undefined && data.allTexts.map((allText: any) => {
            return <Card className={classes.root}>
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            <Typography variant="h5" component="h2">{allText.postDate}</Typography> 
            </Typography>
            <Typography variant="h5" component="h2"> {allText.text} </Typography>
                <Typography variant="h5" component="h2"></Typography>
              {allText.comments.map((comment: any) => {
                return <Typography variant="h5" component="h2">{comment.text}</Typography>
              })} 
        </CardContent>
        <CardActions>
        <Button size="small">Add a comment</Button>
        </CardActions>
        </Card>
              })} 
        </div> 
  )
}
export default DisplayText;