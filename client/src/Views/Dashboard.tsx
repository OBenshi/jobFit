import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Typography, AppBar, Tab, Tabs, Box } from "@material-ui/core";
import { useStyles, backgroundStyles } from "../style/useStyles";
import UpdateProfile from "../components/UpdateProfile";

const Dashboard = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  useEffect(() => {}, [user]);
  return (
    <div style={backgroundStyles}>
      {user?.username && (
        <Typography
          component="h4"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          The &nbsp;
          {user?.username &&
            user?.username[0].toUpperCase() + user.username.slice(1)}
          &nbsp; Zone
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
            <Typography>your texts</Typography>
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
  );
};

export default Dashboard;
