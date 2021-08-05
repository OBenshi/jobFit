import React, { useContext, useEffect, useState } from "react";
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
import { useStyles, backgroundStyles } from "../style/useStyles";
import { ObjectId } from "mongoose";
import { datingTextNs, commentsNs } from "../../../server/src/@types";
interface userProfile {
  _id: ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  password: string;
  rank: number;
  avatar?: string;
  loggedIn: boolean;
  datingTexts: Array<datingTextNs.datingText>;
  comments: Array<commentsNs.comment>;
}

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  useEffect(() => {
    console.info(user);
  }, [user]);
  return (
    <div style={backgroundStyles}>
      (
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
          // onSubmit={handleCLick}
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
                  // onChange={handleChange}
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
                  // onChange={handleChange}
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
                  // onChange={handleChange}
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
                  // onChange={handleChange}
                />
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  name="password"
                  // onChange={handleChange}
                />
                <label htmlFor="img">
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
                </Button>
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
      )
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
