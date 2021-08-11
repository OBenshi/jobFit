import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import background from '../img/background.jpg';
import { useMutation } from "@apollo/client";
import { SIGN_UP_USER } from '../GraphQL/Mutations'
import Alert from "@material-ui/lab/Alert";
import { DatePicker } from "@material-ui/pickers";

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
      background: "#FFD700",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(1),
    },
  })
);

const SignUp: React.FC = () => {

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const passwordRef = useRef<HTMLInputElement>(null);
   const emailRegEx: RegExp =
    /^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const classes = useStyles();
  const [firstNameErr, setFirstNameErr] = useState<string | null>(null);
  const [lastNameErr, setLastNameErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);
  const [passwordConfirmErr, setPasswordConfirmErr] = useState<string | null>(
    null
  );
  const [usernameErr, setUsernameErr] = useState<string | null>(null);
  const [addUser, { error }] = useMutation(SIGN_UP_USER);
  const [sign, setSign] = useState<SignUp>({
    firstName: "",
    lastName: "",
    birthday: new Date().toISOString(),
    email: "",
    password:"",
    username: ""
  })

const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSign({ ...sign, [e.target.name]: e.target.value }
    );
  
  const handleCLick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(sign)
    if (
         !sign.firstName||
         !sign.lastName||
         !sign.email||
         !sign.username ||
         !sign.password
        ) {
       alert("Enter your details!");
      } else {
        addUser({
          variables: {
            "addUserUser": {
               "firstName": sign.firstName,
               "lastName": sign.lastName, 
               "password": sign.password,
               "birthday": sign.birthday, 
               "email": sign.email,
               "username": sign.username, 
            }
          }
        }).then(({ data }) => {
                localStorage.setItem('token', data.addUser.token);
        })
        if (error) {
          console.log(error)
        } else {
          console.log("user signed up")
        }
      }
  }
 
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
      <form className={classes.container} noValidate autoComplete="off" onSubmit={handleCLick}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign Up to your SWAT" />
          <CardContent>
        <DatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
                />
                 {firstNameErr && <Alert severity="error">{firstNameErr}</Alert>}
                 <TextField
                fullWidth
                id="firstName"
                type="firstName"
                label="First Name"
                placeholder="First Name"
                margin="normal"
                name="firstName"
                 onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    if (eve.target.value.length < 2) {
                      setFirstNameErr(
                        "first name must be at least 2 characters long"
                      );
                    } else {
                      setFirstNameErr(null);
                      handleChange(eve);
                    }
                  }} 
                />
                {lastNameErr && <Alert severity="error">{lastNameErr}</Alert>}
                 <TextField
                  fullWidth
                  id="lastName"
                  type="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  margin="normal"
                 name="lastName"
                   onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    if (eve.target.value.length < 2) {
                      setLastNameErr(
                        "Last name must be at least 2 characters long");
                    } else {
                      setLastNameErr(null);
                      handleChange(eve);
                    }
                  }} 
                />
                 {usernameErr && <Alert severity="error">{usernameErr}</Alert>}
                  <TextField
                fullWidth
                id="username"
                type="username"
                label="Username"
                placeholder="Username"
                margin="normal"
                name="username"
                 onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    if (eve.target.value.length < 3) {
                      setUsernameErr(
                        "Username must be at least 3 characters long"
                      );
                    } else {
                      setUsernameErr(null);
                      handleChange(eve);
                    }
                  }} 
                />
                {emailErr && <Alert severity="error">{emailErr}</Alert>}
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
                      setEmailErr("Please enter a valid email address.");
                    } else {
                      setEmailErr(null);
                      handleChange(eve);
                    }
                  }} 
                />
                {passwordErr && <Alert severity="error">{passwordErr}</Alert>}
               <TextField
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                name="password"
                inputRef={passwordRef}
                onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    if (eve.target.value.length < 8) {
                      setPasswordErr(
                        "Password must be at least 8 characters long."
                      );
                    } else {
                      setPasswordErr(null);
                    }
                  }}
                />  
     {passwordConfirmErr && (<Alert severity="error">{passwordConfirmErr}</Alert>)}
                <TextField
                  fullWidth
                  id="passwordConfirm"
                  type="password"
                  label="Confirm Password"
                  placeholder="Password"
                  margin="normal"
                  name="password"
                  onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    if (
                      !passwordRef ||
                      eve.target.value !==
                        passwordRef?.current?.value.toString()
                    ) {
                      setPasswordConfirmErr("Passwords do not match");
                    } else {
                      setPasswordConfirmErr(null)
                      handleChange(eve);
                    }
                  }}
                />  
          </CardContent>
          <CardActions>
             <Button variant="contained" size="large" type="submit" style={{backgroundColor: "#FFD700", color: '#FFFFFF'}}>
              Sign Up
            </Button>
          </CardActions>
        </Card>
        </form>
        </div>
    </>
  );
};

export default SignUp;
