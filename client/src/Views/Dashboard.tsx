import React, {
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  Grid,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { useStyles, backgroundStyles } from "../style/useStyles";
import { userNs, toolsNs } from "../@types";
import { UPDATE_USER } from "../GraphQL/Mutations";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [updateUserProfileUser, { error }] = useMutation(UPDATE_USER);
  const [passErr, setPassErr] = useState<Array<toolsNs.error>>();
  const [update, setUpdate] = useState<userNs.updateProfile | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update && setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`update`, update);
    const updateErr: Array<toolsNs.error> = [];
    if (update?.password && update?.password !== user?.password) {
      if (update?.password.length < 8) {
        updateErr.push({
          code: 901,
          msg: "Password must be at least 8 characters long",
        });
      }
    }
    if (update?.username && update?.username !== user?.username) {
      update?.username.length < 3 &&
        updateErr.push({
          code: 902,
          msg: "username must be at least 3 characters long",
        });
    }
    if (update?.firstName && update?.firstName !== user?.firstName) {
      update?.firstName.length < 3 &&
        updateErr.push({
          code: 903,
          msg: "first name must be at least 3 characters long",
        });
    }
    // updateUserProfileUser({
    //   variables: {
    //     addUserUser: {
    //       firstName: update.firstName,
    //       lastName: sign.lastName,
    //       password: sign.password,
    //       birthday: sign.birthday,
    //       email: sign.email,
    //       username: sign.username,
    //       avatar: sign.avatar,
    //     },
    //   },
    // }).then(({ data }) => {
    //   localStorage.setItem("token", data.addUser.token);
    // });
    if (error) {
      console.log(error);
    } else {
      console.log("user signed up");
    }
  };

  useEffect(() => {
    console.info(update);
    user &&
      setUpdate({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      });
    console.log(`update`, update);
  }, [user]);

  return (
    <div style={backgroundStyles}>
      <button onClick={() => console.log(update)}>show update</button>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Manage your Profile
      </Typography>
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
                <TextField
                  fullWidth
                  id="firstName"
                  type="firstName"
                  label="First Name"
                  placeholder={`${user?.firstName}`}
                  defaultValue={`${user?.firstName}`}
                  margin="normal"
                  name="firstName"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  id="lastName"
                  type="lastName"
                  label="Last Name"
                  placeholder={`${user?.lastName}`}
                  defaultValue={`${user?.lastName}`}
                  margin="normal"
                  name="lastName"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  id="username"
                  type="username"
                  label="Username"
                  placeholder={`${user?.username}`}
                  defaultValue={`${user?.username}`}
                  margin="normal"
                  name="username"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  // placeholder="123"
                  defaultValue={user?.email}
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
                {/* <label htmlFor="img">
                  <input
                    accept="image/*"
                    type="file"
                    id="imgInp"
                    name="avatar"
                    //   onChange={(e: ChangeEvent<any>) =>
                    // setImageSelected(e.target.files[0])
                    //   }
                  />
                </label>
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "#FFD700", color: "#FFFFFF" }}
                  // onClick={() => uploadImage()}
                >
                  Upload avatar
                </Button> */}
              </div>
            </CardContent>
            <CardActions>
              <Grid container justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{ backgroundColor: "#FFD700", color: "#FFFFFF" }}
                >
                  Update
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </form>
      )}
    </div>
  );
};

export default Dashboard;

//   {/* <Search /> */}
//   {!loading ? (
//     // ((<ScrollToTopOnMount />),
//     menus.length !== 0 ? (
//       <Grid container spacing={1} className={classes.menusContainer}>
//         {menus.map((menu, index) => {
//           return <Menu menu={menu} key={`${index}-${menu.sponsor}`} />;
//         })}
//         {resultPage < totalPages && (
//           <Grid
//             container
//             justify="center"
//             align="center"
//             className={classes.loadMore}
//           >
//             <Grid item xs={12}>
//               <Fab color="secondary" size="large" aria-label="add">
//                 <AddCircleIcon
//                   className={classes.fabiIcon}
//                   onClick={(e) => {
//                     console.log(window.screenX, window.screenY);
//                     e.preventDefault();
//                     setDoNotFetch(false);
//                     setResultPage(resultPage + 1);
//                   }}
//                 />
//               </Fab>
//             </Grid>
//           </Grid>
//         )}
//       </Grid>
//     ) : (
//       <p>no results</p>
//     )
//   ) : (
//     <Loading />
//   )}
