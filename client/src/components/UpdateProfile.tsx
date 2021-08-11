import React, {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/client";
import { useStyles } from "../style/useStyles";
import { UPDATE_USER } from "../GraphQL/Mutations";

const UpdateProfile: React.FC = (props) => {
  const classes = useStyles();

  const { user, setUser } = useContext(AuthContext);

  const [updateUserProfileUser, { error }] = useMutation(UPDATE_USER);

  const passwordRef = useRef<HTMLInputElement>(null);

  const [firstNameErr, setFirstNameErr] = useState<string | null>(null);
  const [lastNameErr, setLastNameErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);
  const [passwordConfirmErr, setPasswordConfirmErr] = useState<string | null>(
    null
  );
  const [usernameErr, setUsernameErr] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(
    !firstNameErr &&
      !lastNameErr &&
      !emailErr &&
      !passwordErr &&
      !passwordConfirmErr &&
      !usernameErr
      ? false
      : true
  );
  const [update, setUpdate] = useState<userNs.updateProfile | null>(null);

  const emailRegEx: RegExp =
    /^(([^<>()\[\]\\.,;:\s\W@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update && setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUsernameErr(null);
    try {
      const updatedUser = await updateUserProfileUser({
        variables: {
          updateUserProfileUser: update,
        },
      });
      setUser(updatedUser.data.updateUserProfile);
      setSuccessMsg("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      if (err.message.indexOf("username")) {
        setUsernameErr(err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    user &&
      setUpdate({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      });
  }, [user]);

  return (
    <>
      {user !== null && (
        <form
          className={classes.container}
          noValidate
          autoComplete="off"
          onSubmit={handleUpdate}
        >
          <Card className={classes.card}>
            <CardHeader className={classes.header} title="your info" />
            <CardContent>
              <div>
                {successMsg && <Alert severity="success">{successMsg}</Alert>}
                {firstNameErr && <Alert severity="error">{firstNameErr}</Alert>}
                <TextField
                  fullWidth
                  id="firstName"
                  type="firstName"
                  label="First Name"
                  placeholder={`${user?.firstName}`}
                  defaultValue={`${user?.firstName}`}
                  margin="normal"
                  name="firstName"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value.length < 2) {
                      setFirstNameErr(
                        "first name must be at least 2 characters long"
                      );
                    } else {
                      setFirstNameErr(null);
                      handleChange(event);
                    }
                  }}
                />
                {lastNameErr && <Alert severity="error">{lastNameErr}</Alert>}
                <TextField
                  fullWidth
                  id="lastName"
                  type="lastName"
                  label="Last Name"
                  placeholder={`${user?.lastName}`}
                  defaultValue={`${user?.lastName}`}
                  margin="normal"
                  name="lastName"
                  onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    if (eve.target.value.length < 2) {
                      setLastNameErr(
                        "Last name must be at least 2 characters long"
                      );
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
                  placeholder={`${user?.username}`}
                  defaultValue={`${user?.username}`}
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
                  defaultValue={user?.email}
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
                  name="passwordConfirm"
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
                {passwordConfirmErr && (
                  <Alert severity="error">{passwordConfirmErr}</Alert>
                )}
                <TextField
                  fullWidth
                  id="passwordConfirm"
                  type="password"
                  label="Confirm Password"
                  placeholder="Password"
                  margin="normal"
                  name="password"
                  onChange={(eve: ChangeEvent<HTMLInputElement>) => {
                    console.log(`object`, passwordRef.current?.value);
                    if (
                      !passwordRef ||
                      eve.target.value !==
                        passwordRef?.current?.value.toString()
                    ) {
                      setPasswordConfirmErr("Passwords do not match");
                    } else {
                      setPasswordConfirmErr(null);
                    }
                  }}
                />
              </div>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  color="secondary"
                  disabled={loading}
                >
                  <Typography color="inherit">Update</Typography>
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </form>
      )}
    </>
  );
};

export default UpdateProfile;