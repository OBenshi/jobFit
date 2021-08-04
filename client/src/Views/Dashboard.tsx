import React, { useContext, useEffect } from "react";
import bg from "../img/bg2.jpg";
import { AuthContext } from "../context/AuthContext";
import Typography from "@material-ui/core/Typography";

interface Props {}

const backgroundStyles = {
  backgroundImage: `url(${bg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
};

const Dashboard = (props: Props) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user !== null) {
      console.log(`user`, user.username);
    }
  }, []);
  return (
    <div style={backgroundStyles}>
      {user && user !== null && (
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Manage your Profile
        </Typography>
      )}
    </div>
  );
};

export default Dashboard;
