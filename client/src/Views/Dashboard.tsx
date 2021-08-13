import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Typography, AppBar, Tab, Tabs, Box } from "@material-ui/core";
import { backgroundStyles } from "../style/useStyles";
import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import UpdateProfile from "../components/UpdateProfile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      margin: 20
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  })
);
const Dashboard = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  useEffect(() => {}, [user]);
  return (
    <>
    <div style={backgroundStyles}>
      {user?.username && (
        <Typography
          className={classes.title}
          component="h4"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <Box fontWeight="fontWeightBold" fontFamily="Arial" bgcolor="white">
          👤 The &nbsp;
          {user?.username &&
            user?.username[0].toUpperCase() + user.username.slice(1)}
          &nbsp; Zone 👥
          </Box>
        </Typography>
      )}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
      >
        <Tab
          label="your texts"
          id="userTextTab"
          aria-controls={`your-texts-tabpanel`}
        />{" "}
        <Tab
          label="mange profile"
          id="manageProfileTab"
          aria-controls="manage profile tab"
        />
      </Tabs>
      <div
        role="tabpanel"
        hidden={tabValue !== 0}
        id={`your-texts-tabpanel`}
        aria-labelledby={`your-texts-tab`}
      >
        {tabValue === 0 && (
          <Box p={3}>
            <Typography>your texts 📝</Typography>
          </Box>
        )}
      </div>
      <div
        role="tabpanel"
        hidden={tabValue !== 1}
        id={`manage-your-profile-tabpanel`}
        aria-labelledby={`manage-profile-tab`}
      >
        {tabValue === 1 && <UpdateProfile />}
      </div>
    </div>
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      ❤️‍🔥 SWAT 2021 All rights reserved ©
      </Typography>
    </footer>
    </>
  );
};

export default Dashboard;
