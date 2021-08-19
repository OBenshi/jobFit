import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
} from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../GraphQL/Mutations";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import background from "../img/bground.jpeg";
import { AuthContext } from "../context/AuthContext";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";

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
      background: "#FF7600",
    },
    card: {
      marginTop: theme.spacing(10),
    },
    button: {
      justifyContent: "center",
    },
  })
);

interface FormData {
  password: string;
  email: string;
}

const LogIn: React.FC = () => {
  const emailRegEx: RegExp =
    /^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const history = useHistory();
  const [logIn, { error }] = useMutation(LOGIN_USER);
  const classes = useStyles();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const [input, setInput] = useState<FormData>({
    password: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleCLick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      alert("Enter email and password!");
    } else {
      console.log(input.email);
      logIn({
        variables: {
          logInEmail: input.email,
          logInPassword: input.password,
        },
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.logIn.token);
          console.log(data);
          setUser(data.logIn);
          setIsAuthenticated(true);
          console.log(data.logIn);
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
      if (error) {
        console.log(error);
      } else {
        console.log("user logged in");
      }
    }
  };

  const backgroundStyles = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    width: "100vw",
    height: "100vh",
  };
  return (
    <>
      <div style={backgroundStyles}>
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={handleCLick}
        >
          <Card className={classes.card}>
            <CardHeader
              className={classes.header}
              title="Log in"
            />
            <CardContent>
              <div>
                 {emailError && <Alert severity="error">{emailError}</Alert>}
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  name="email"
                 onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                  if (!emailRegEx.test(eve.target.value)) {
                    setEmailError("Please enter a valid email address.");
                  } else {
                    setEmailError(null);
                    handleChange(eve);
                  }
                }} 
                 
                />
                {passwordError && <Alert severity="error">{setPasswordError}</Alert>}
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  name="password"
                   onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                  if (eve.target.value.length < 8) {
                    setPasswordError(
                      "Enter correct password"
                    );
                  } else {
                    setPasswordError(null);
                    handleChange(eve);
                  }
                }} 
                />
              </div>
            </CardContent>
            <CardActions className={classes.button}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </>
  );
};

export default LogIn;
