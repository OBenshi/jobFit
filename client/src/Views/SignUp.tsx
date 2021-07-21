import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import background from '../img/background.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 360,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
      background: "#002884",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
  })
);

interface FormData {
  username: string;
  password: string;
  email: string;
}

const LogIn: React.FC = () => {
  const classes = useStyles();
  const [sign, setSign] = useState <FormData>({
    password: "",
    email: "",
    username:"",
  })
const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSign({ ...sign, [e.target.name]: e.target.value });
 
  const backgroundStyles = {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
};
  return (
    <>
      <div style={backgroundStyles}>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign Up to your SWAT" />
          <CardContent>
            <div>
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                onChange={handleChange}
                              />
                               <TextField
                fullWidth
                id="username"
                type="username"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="large" color="primary">
              Sign Up
            </Button>
          </CardActions>
        </Card>
        </form>
        </div>
    </>
  );
};

export default LogIn;
