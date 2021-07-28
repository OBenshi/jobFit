import React, {
  FC,
  Fragment,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
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
import { useMutation } from "@apollo/client";
import { SIGN_UP_USER } from '../GraphQL/Mutations'

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
      background: "#002884",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(1),
    },
  })
);

interface SignUp {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  birthday: string,
  email: string,
  avatar: string,
}

const LogIn: React.FC = () => {

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const [addUser, { error }] = useMutation(SIGN_UP_USER);
   const [imageSelected, setImageSelected] = useState("");
  const [url, setUrl] = useState("");
  const [sign, setSign] = useState<SignUp>({
    firstName: "",
    lastName: "",
    password: "",
    birthday: new Date().toISOString(),
    email: "",
    username: "",
    avatar: "",
  })

const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
  setSign({ ...sign, [e.target.name]: e.target.value }
    );
  console.log(sign.birthday)
  

 const uploadImage = () => {
    const data = new FormData();
    data.append("file", imageSelected);
    data.append("upload_preset", "swat-app");
   data.append("cloud_name", "dtcs8hj99");
    fetch("	https://api.cloudinary.com/v1_1/dtcs8hj99/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url)
        console.log(data.url)
        setSign({ ...sign, avatar: data.url})
      })
      .catch((error) => {
        console.log(error);
      });
  }; 


  const handleCLick = (e: FormEvent<HTMLFormElement>) => {
   console.log(sign)
    e.preventDefault();
      if (
        !sign.firstName||
        !sign.lastName ||
         !sign.email ||
         !sign.username ||
        !sign.password ||
        !sign.avatar
    ) {
       alert("Enter your details!");
      } else {
        addUser({
          variables: {
            "addUserInput": {
               "firstName": sign.firstName,
               "lastName": sign.lastName, 
               "password": sign.password,
               "birthday": sign.birthday, 
               "email": sign.email,
               "username": sign.username, 
               "avatar": sign.avatar
            }
          }
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
              <div>
                 <TextField
                fullWidth
                id="firstName"
                type="firstName"
                label="First Name"
                placeholder="First Name"
                margin="normal"
                name="firstName"
                onChange={handleChange}
                />
                 <TextField
                fullWidth
                id="lastName"
                type="lastName"
                label="Last Name"
                placeholder="Last Name"
                margin="normal"
                name="lastName"
                onChange={handleChange}
                />
                  <TextField
                fullWidth
                id="username"
                type="username"
                label="Username"
                placeholder="Username"
                margin="normal"
                name="username"
                onChange={handleChange}
                />
                  <DatePicker
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      />
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                name="email"
                onChange={handleChange}
                              />
              <TextField
                fullWidth
                id="password"
                type="password"
                label="Password"
                placeholder="Password"
                margin="normal"
                name="password"
                onChange={handleChange}
                />
                 <label htmlFor="img">
                  <input
                    accept="image/*"
                    type="file"
                    id="imgInp"
                    name="avatar"
                    onChange={(e: ChangeEvent<any>)=> setImageSelected(e.target.files[0])} />
                </label>
                <Button variant="contained" size="large" color="primary" onClick={() => uploadImage()}>
              Upload img
            </Button>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="large" color="primary" type="submit">
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
